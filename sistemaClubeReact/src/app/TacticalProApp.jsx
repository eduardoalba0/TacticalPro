import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { LoginForm } from '../components/tactical/auth/LoginForm.jsx'
import { AppHeader } from '../components/tactical/layout/AppHeader.jsx'
import { Sidebar } from '../components/tactical/layout/Sidebar.jsx'
import { DashboardPage } from '../pages/tactical/DashboardPage.jsx'
import { LineupsPage } from '../pages/tactical/LineupsPage.jsx'
import { PlayersPage } from '../pages/tactical/PlayersPage.jsx'
import { ReportsPage } from '../pages/tactical/ReportsPage.jsx'
import { StatsPage } from '../pages/tactical/StatsPage.jsx'
import { TrainingPage } from '../pages/tactical/TrainingPage.jsx'
import jogadorService from '../services/jogadorService.js'
import tecnicoService from '../services/tecnicoService.js'

const pageComponents = {
  dashboard: DashboardPage,
  players: PlayersPage,
  lineups: LineupsPage,
  stats: StatsPage,
  training: TrainingPage,
  reports: ReportsPage,
}

export default function TacticalProApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [currentView, setCurrentView] = useState('dashboard')
  const [players, setPlayers] = useState([])
  const [error, setError] = useState(null)

  const fetchPlayers = async () => {
    try {
      const data = await jogadorService.listarTodos()
      setPlayers(Array.isArray(data) ? data : [])
    } catch {
      setPlayers([])
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchPlayers()
    }
  }, [isLoggedIn])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const data = await tecnicoService.login({ username, password })

      if (data.success) {
        setIsLoggedIn(true)
        setError(null)
      } else {
        setError(data.message || 'Usuário ou senha inválidos')
      }
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Erro ao conectar ao servidor')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
    setCurrentView('dashboard')
    setPlayers([])
    setError(null)
  }

  if (!isLoggedIn) {
    return (
      <LoginForm
        error={error}
        password={password}
        username={username}
        onPasswordChange={setPassword}
        onSubmit={handleLogin}
        onUsernameChange={setUsername}
      />
    )
  }

  const CurrentPage = pageComponents[currentView]

  return (
    <div className="flex min-h-screen bg-[#E4E3E0] font-sans text-[#141414]">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} onLogout={handleLogout} />

      <main className="flex-1 overflow-auto">
        <AppHeader currentView={currentView} username={username} />

        <div className="mx-auto max-w-7xl p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              initial={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <CurrentPage players={players} refreshPlayers={fetchPlayers} />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

