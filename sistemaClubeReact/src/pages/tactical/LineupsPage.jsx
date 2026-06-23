import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '../../lib/cn.js'
import escalacaoService from '../../services/escalacaoService.js'

export function LineupsPage({ players = [] }) {
  const [lineups, setLineups] = useState([])
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [lineupName, setLineupName] = useState('')
  const [error, setError] = useState(null)

  const fetchLineups = async () => {
    try {
      const data = await escalacaoService.listarTodas()
      setLineups(Array.isArray(data) ? data : [])
    } catch {
      setLineups([])
    }
  }

  useEffect(() => {
    fetchLineups()
  }, [])

  const togglePlayer = (id) => {
    const player = players.find((item) => item.id === id)

    if (player?.physical_status === 'injured') {
      setError('Jogadores lesionados não podem ser escalados.')
      return
    }

    setError(null)
    setSelectedPlayers((currentSelection) => {
      if (currentSelection.includes(id)) {
        return currentSelection.filter((playerId) => playerId !== id)
      }

      if (currentSelection.length >= 11) {
        setError('A escalação deve conter exatamente 11 titulares.')
        return currentSelection
      }

      return [...currentSelection, id]
    })
  }

  const saveLineup = async () => {
    if (selectedPlayers.length !== 11) {
      setError('Selecione exatamente 11 jogadores.')
      return
    }

    if (!lineupName.trim()) {
      setError('Dê um nome para a escalação.')
      return
    }

    try {
      await escalacaoService.cadastrar({
        name: lineupName,
        date: new Date().toISOString(),
        player_ids: selectedPlayers,
      })
    } catch (requestError) {
      setError(requestError?.response?.data?.error || 'Erro ao salvar escalação')
      return
    }

    setLineupName('')
    setSelectedPlayers([])
    setError(null)
    fetchLineups()
    window.alert('Escalação salva com sucesso!')
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <div className="border border-[#141414] bg-white p-6 shadow-[8px_8px_0px_0px_rgba(20,20,20,1)]">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold uppercase italic">Selecione os 11 Titulares</h3>
            <span
              className={cn(
                'border border-[#141414] px-3 py-1 font-mono text-sm font-bold',
                selectedPlayers.length === 11 ? 'bg-emerald-500 text-white' : 'bg-white',
              )}
            >
              {selectedPlayers.length} / 11
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {players.map((player) => (
              <button
                key={player.id}
                className={cn(
                  'group relative border p-4 text-left transition-all',
                  selectedPlayers.includes(player.id)
                    ? 'border-[#141414] bg-[#141414] text-white shadow-[4px_4px_0px_0px_rgba(242,125,38,1)]'
                    : 'border-[#141414]/10 bg-white hover:border-[#141414]',
                  player.physical_status === 'injured' && 'cursor-not-allowed bg-red-50 opacity-40',
                )}
                disabled={player.physical_status === 'injured'}
                onClick={() => togglePlayer(player.id)}
                type="button"
              >
                <div className="mb-2 flex items-start justify-between">
                  <span className="font-serif text-2xl font-bold italic opacity-20 transition-opacity group-hover:opacity-100">
                    #{player.jersey_number}
                  </span>
                  {selectedPlayers.includes(player.id) && <CheckCircle2 className="text-[#F27D26]" size={16} />}
                </div>
                <p className="truncate text-xs font-bold uppercase">{player.name}</p>
                <p className="font-mono text-[10px] opacity-60">{player.position}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-[#141414] p-6 text-white shadow-[8px_8px_0px_0px_rgba(242,125,38,1)]">
          <h3 className="mb-6 border-b border-white/10 pb-4 font-serif text-lg font-bold uppercase italic">
            Salvar Escalação
          </h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-white/40">
                Nome da Partida/Escalação
              </label>
              <input
                className="w-full border border-white/20 bg-white/5 p-3 text-white focus:border-[#F27D26] focus:outline-none"
                onChange={(event) => setLineupName(event.target.value)}
                placeholder="Ex: Final Copa do Brasil"
                type="text"
                value={lineupName}
              />
            </div>

            {error && <div className="border border-red-800 bg-red-900/50 p-3 text-xs font-bold text-red-200">{error}</div>}

            <button
              className="w-full bg-[#F27D26] py-4 font-bold uppercase tracking-widest text-white transition-all hover:bg-[#ff8c3a] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
              onClick={saveLineup}
              type="button"
            >
              Confirmar Escalação
            </button>
          </div>
        </div>

        <div className="border border-[#141414] bg-white p-6 shadow-[8px_8px_0px_0px_rgba(20,20,20,1)]">
          <h3 className="mb-6 border-b border-[#141414]/10 pb-4 font-serif text-lg font-bold uppercase italic">Histórico</h3>
          <div className="max-h-[400px] space-y-4 overflow-auto pr-2">
            {lineups.map((lineup) => (
              <div
                key={lineup.id}
                className="group cursor-pointer border border-[#141414]/10 p-4 transition-all hover:border-[#141414]"
              >
                <div className="mb-2 flex items-start justify-between gap-3">
                  <p className="text-sm font-bold uppercase transition-colors group-hover:text-[#F27D26]">{lineup.name}</p>
                  <span className="font-mono text-[10px] text-[#141414]/40">
                    {format(new Date(lineup.date), 'dd/MM/yy', { locale: ptBR })}
                  </span>
                </div>
                <p className="font-mono text-[10px] text-[#141414]/60">{lineup.player_ids.length} jogadores escalados</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

