import {
  BarChart3,
  ClipboardList,
  Dumbbell,
  LayoutDashboard,
  LogOut,
  Shield,
  Users,
} from 'lucide-react'
import { ItemNavegacao } from './NavItem.jsx'

const navItems = [
  { key: 'dashboard', rota: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { key: 'players', rota: '/jogadores', label: 'Jogadores', icon: <Users size={20} /> },
  { key: 'lineups', rota: '/escalacoes', label: 'Escalações', icon: <ClipboardList size={20} /> },
  { key: 'stats', rota: '/estatisticas', label: 'Estatísticas', icon: <BarChart3 size={20} /> },
  { key: 'training', rota: '/treinos', label: 'Treinos', icon: <Dumbbell size={20} /> },
  { key: 'reports', rota: '/relatorios', label: 'Relatórios', icon: <BarChart3 size={20} /> },
]

export function BarraLateral({ currentView, onLogout }) {
  return (
    <aside className="flex w-64 flex-col border-r border-[#141414] bg-[#141414] text-white">
      <div className="border-b border-white/10 p-6">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-[#F27D26]" />
          <span className="text-xl font-bold tracking-tighter">TACTICAL PRO</span>
        </div>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => (
          <ItemNavegacao
            key={item.key}
            active={currentView === item.key}
            href={item.rota}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <button
          className="flex w-full items-center gap-3 rounded-sm p-3 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          onClick={onLogout}
          type="button"
        >
          <LogOut size={20} />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </aside>
  )
}

