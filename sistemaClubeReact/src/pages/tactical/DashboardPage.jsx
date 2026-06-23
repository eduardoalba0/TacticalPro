import { AlertCircle, CheckCircle2, ClipboardList, Shield, Users } from 'lucide-react'
import { StatCard } from '../../components/tactical/ui/StatCard.jsx'

export function DashboardPage({ players = [] }) {
  const injuredCount = players.filter((player) => player.physical_status === 'injured').length
  const availableCount = players.filter((player) => player.physical_status === 'available').length

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <StatCard color="bg-white" icon={<Users />} label="Total de Jogadores" value={players.length} />
      <StatCard
        color="bg-emerald-50"
        icon={<CheckCircle2 />}
        label="Disponíveis"
        textColor="text-emerald-700"
        value={availableCount}
      />
      <StatCard
        color="bg-red-50"
        icon={<AlertCircle />}
        label="No Departamento Médico"
        textColor="text-red-700"
        value={injuredCount}
      />

      <div className="border border-[#141414] bg-white p-6 shadow-[8px_8px_0px_0px_rgba(20,20,20,1)] md:col-span-2">
        <h3 className="mb-6 flex items-center gap-2 text-lg font-bold">
          <ClipboardList size={20} />
          Últimas Atividades
        </h3>
        <div className="space-y-4 font-mono text-sm">
          {[
            { date: 'Hoje, 14:30', action: 'Sessão de treino tático registrada' },
            { date: 'Ontem, 18:00', action: 'Escalação para o clássico definida' },
            { date: '08 Mar, 10:00', action: 'Novo jogador cadastrado: Marcos Silva' },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-4 border-b border-[#141414]/10 p-3 last:border-0">
              <span className="whitespace-nowrap text-[#141414]/40">{item.date}</span>
              <span className="font-bold">{item.action}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#141414] p-6 text-white shadow-[8px_8px_0px_0px_rgba(242,125,38,1)]">
        <h3 className="mb-6 flex items-center gap-2 text-lg font-bold">
          <Shield className="text-[#F27D26]" size={20} />
          Próximo Jogo
        </h3>
        <div className="space-y-4 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-white/40">Campeonato Nacional</p>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                <Shield size={32} />
              </div>
              <p className="text-sm font-bold">MEU TIME</p>
            </div>
            <div className="font-serif text-2xl font-bold italic">VS</div>
            <div className="flex-1">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                <Shield className="text-red-500" size={32} />
              </div>
              <p className="text-sm font-bold">RIVAL FC</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-4">
            <p className="font-mono text-xs">Domingo, 16:00 • Estádio Municipal</p>
          </div>
        </div>
      </div>
    </div>
  )
}

