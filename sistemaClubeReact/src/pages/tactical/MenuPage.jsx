import { useMemo } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { AlertCircle, CheckCircle2, ClipboardList, Shield, Users } from 'lucide-react'
import { CartaoEstatistica } from '../../components/tactical/ui/StatCard.jsx'
import registroLocalService from '../../services/registroLocalService.js'

export function PaginaDashboard({ players = [] }) {
  const injuredCount = players.filter((player) => player.physical_status === 'injured').length
  const availableCount = players.filter((player) => player.physical_status === 'available').length

  const atividadesRecentes = useMemo(() => {
    const atividades = registroLocalService.listarAtividades()

    if (atividades.length > 0) {
      return atividades.slice(0, 5)
    }

    return [
      {
        dataIso: new Date().toISOString(),
        descricao: 'As proximas atividades do elenco aparecerao aqui conforme voce usar o sistema.',
      },
    ]
  }, [])

  const formatarMomento = (dataIso) => {
    const data = new Date(dataIso)
    if (Number.isNaN(data.getTime())) {
      return 'Agora'
    }

    return formatDistanceToNow(data, {
      addSuffix: true,
      locale: ptBR,
    })
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <CartaoEstatistica color="bg-white" icon={<Users />} label="Total de Jogadores" value={players.length} />
      <CartaoEstatistica
        color="bg-emerald-50"
        icon={<CheckCircle2 />}
        label="Disponíveis"
        corTexto="text-emerald-700"
        value={availableCount}
      />
      <CartaoEstatistica
        color="bg-red-50"
        icon={<AlertCircle />}
        label="No Departamento Médico"
        corTexto="text-red-700"
        value={injuredCount}
      />

      <div className="border border-[#141414] bg-white p-6 shadow-[8px_8px_0px_0px_rgba(20,20,20,1)] md:col-span-2">
        <h3 className="mb-6 flex items-center gap-2 text-lg font-bold">
          <ClipboardList size={20} />
          Últimas Atividades
        </h3>
        <div className="space-y-4 font-mono text-sm">
          {atividadesRecentes.map((item, index) => (
            <div key={`${item.dataIso}-${index}`} className="flex items-start gap-4 border-b border-[#141414]/10 p-3 last:border-0">
              <span className="whitespace-nowrap text-[#141414]/40">{formatarMomento(item.dataIso)}</span>
              <span className="font-bold">{item.descricao}</span>
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
