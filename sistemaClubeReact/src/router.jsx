import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppTaticoPro from './app/TacticalProApp.jsx'

const redirecionarParaDashboard = <Navigate replace to="/dashboard" />

const router = createBrowserRouter([
  {
	path: '/',
	element: redirecionarParaDashboard,
  },
  {
	path: '/dashboard',
	element: <AppTaticoPro />,
  },
  {
	path: '/jogadores',
	element: <AppTaticoPro />,
  },
  {
	path: '/escalacoes',
	element: <AppTaticoPro />,
  },
  {
	path: '/estatisticas',
	element: <AppTaticoPro />,
  },
  {
	path: '/treinos',
	element: <AppTaticoPro />,
  },
  {
	path: '/relatorios',
	element: <AppTaticoPro />,
  },
  {
	path: '*',
	element: redirecionarParaDashboard,
  },
])

export default router

