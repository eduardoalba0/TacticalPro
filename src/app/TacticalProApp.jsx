import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FormularioLogin } from '../components/tactical/auth/LoginForm.jsx'
import { CabecalhoApp } from '../components/tactical/layout/AppHeader.jsx'
import { BarraLateral } from '../components/tactical/layout/Sidebar.jsx'
import { PaginaDashboard } from '../pages/tactical/MenuPage.jsx'
import { PaginaEscalacoes } from '../pages/tactical/EscalacoesPage.jsx'
import { PaginaJogadores } from '../pages/tactical/JogadoresPage.jsx'
import { PaginaRelatorios } from '../pages/tactical/RelatoriosPage.jsx'
import { PaginaEstatisticas } from '../pages/tactical/EstatisticasPage.jsx'
import { PaginaTreinos } from '../pages/tactical/TreinoPage.jsx'
import jogadorService from '../services/jogadorService.js'
import tecnicoService from '../services/tecnicoService.js'

const componentesPagina = {
  dashboard: PaginaDashboard,
  players: PaginaJogadores,
  lineups: PaginaEscalacoes,
  stats: PaginaEstatisticas,
  training: PaginaTreinos,
  reports: PaginaRelatorios,
}

const rotasPorPagina = {
  '/dashboard': 'dashboard',
  '/jogadores': 'players',
  '/escalacoes': 'lineups',
  '/estatisticas': 'stats',
  '/treinos': 'training',
  '/relatorios': 'reports',
}

export default function AppTaticoPro() {
  const navigate = useNavigate()
  const location = useLocation()
  const [estaLogado, setEstaLogado] = useState(false)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [players, setPlayers] = useState([])
  const [erro, setErro] = useState(null)

  const currentView = rotasPorPagina[location.pathname] || 'dashboard'

  const fetchPlayers = async () => {
    try {
      const data = await jogadorService.listarTodos()
      setPlayers(Array.isArray(data) ? data : [])
      setErro(null)
    } catch (requestError) {
      setPlayers([])
      const mensagemErro =
        requestError?.response?.data?.message ||
        requestError?.response?.data?.mensagem ||
        requestError?.response?.data?.error ||
        'Erro ao carregar jogadores da API.'
      setErro(mensagemErro)
    }
  }

  useEffect(() => {
    if (estaLogado) {
      fetchPlayers()
    }
  }, [estaLogado])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const data = await tecnicoService.login({ email, senha })

      if (data.success) {
        setEstaLogado(true)
        setErro(null)
        navigate(location.pathname === '/' ? '/dashboard' : location.pathname, { replace: true })
      } else {
        setErro(data.message || 'Email ou senha invalidos')
      }
    } catch (requestError) {
      if (requestError?.code === 'ECONNABORTED') {
        setErro('Tempo de resposta do servidor esgotado. Verifique se a API esta online.')
        return
      }

      if (!requestError?.response) {
        setErro('Nao foi possivel conectar ao servidor. Verifique se a API esta rodando e se a porta configurada esta correta.')
        return
      }

      const mensagemErro =
        requestError?.response?.data?.message ||
        requestError?.response?.data?.mensagem ||
        requestError?.response?.data?.error ||
        requestError?.response?.data?.detail ||
        'Erro ao conectar ao servidor'

      setErro(mensagemErro)
    }
  }

  const handleLogout = () => {
    setEstaLogado(false)
    setEmail('')
    setSenha('')
    setPlayers([])
    setErro(null)
    navigate('/dashboard', { replace: true })
  }

  if (!estaLogado) {
    return (
      <FormularioLogin
        erro={erro}
        senha={senha}
        email={email}
        aoAlterarSenha={setSenha}
        aoEnviar={handleLogin}
        aoAlterarEmail={setEmail}
      />
    )
  }

  const PaginaAtual = componentesPagina[currentView]

  return (
    <div className="flex min-h-screen bg-[#E4E3E0] font-sans text-[#141414]">
      <BarraLateral currentView={currentView} onLogout={handleLogout} />

      <main className="flex-1 overflow-auto">
        <CabecalhoApp currentView={currentView} emailTecnico={email} />

        {erro && (
          <div className="mx-auto mt-4 max-w-7xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            {erro}
          </div>
        )}

        <div className="mx-auto max-w-7xl p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              initial={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <PaginaAtual players={players} refreshPlayers={fetchPlayers} />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
