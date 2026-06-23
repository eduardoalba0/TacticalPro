import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import estatisticaService from '../../services/estatisticaService.js'

const createDefaultStatsForm = () => ({
  goals: 0,
  assists: 0,
  yellow_cards: 0,
  red_cards: 0,
  minutes_played: 90,
  match_date: new Date().toISOString().split('T')[0],
})

export function StatsPage({ players = [] }) {
  const [stats, setStats] = useState([])
  const [selectedPlayer, setSelectedPlayer] = useState('')
  const [formData, setFormData] = useState(createDefaultStatsForm)

  const fetchStats = async () => {
    try {
      const data = await estatisticaService.listarTodas()
      setStats(Array.isArray(data) ? data : [])
    } catch {
      setStats([])
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!selectedPlayer) {
      return
    }

    await estatisticaService.cadastrar({ ...formData, player_id: Number(selectedPlayer) })

    setSelectedPlayer('')
    setFormData(createDefaultStatsForm())
    fetchStats()
    window.alert('Estatística registrada!')
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="border border-[#141414] bg-white p-8 shadow-[8px_8px_0px_0px_rgba(20,20,20,1)]">
        <h3 className="mb-8 border-b-2 border-[#141414] pb-4 font-serif text-xl font-bold uppercase italic">
          Registrar Atuação
        </h3>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-[#141414]/50">
              Jogador
            </label>
            <select
              className="w-full border border-[#141414] p-3 focus:outline-none"
              onChange={(event) => setSelectedPlayer(event.target.value)}
              required
              value={selectedPlayer}
            >
              <option value="">Selecione um atleta</option>
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  #{player.jersey_number} - {player.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-[#141414]/50">Gols</label>
              <input
                className="w-full border border-[#141414] p-3 focus:outline-none"
                onChange={(event) => setFormData({ ...formData, goals: Number(event.target.value || 0) })}
                type="number"
                value={formData.goals}
              />
            </div>
            <div>
              <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-[#141414]/50">
                Assistências
              </label>
              <input
                className="w-full border border-[#141414] p-3 focus:outline-none"
                onChange={(event) => setFormData({ ...formData, assists: Number(event.target.value || 0) })}
                type="number"
                value={formData.assists}
              />
            </div>
            <div>
              <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-[#141414]/50">
                Cartões Amarelos
              </label>
              <input
                className="w-full border border-[#141414] p-3 focus:outline-none"
                max="2"
                onChange={(event) => setFormData({ ...formData, yellow_cards: Number(event.target.value || 0) })}
                type="number"
                value={formData.yellow_cards}
              />
            </div>
            <div>
              <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-[#141414]/50">
                Cartões Vermelhos
              </label>
              <input
                className="w-full border border-[#141414] p-3 focus:outline-none"
                max="1"
                onChange={(event) => setFormData({ ...formData, red_cards: Number(event.target.value || 0) })}
                type="number"
                value={formData.red_cards}
              />
            </div>
            <div className="col-span-2">
              <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-[#141414]/50">
                Minutos Jogados
              </label>
              <input
                className="w-full border border-[#141414] p-3 focus:outline-none"
                onChange={(event) => setFormData({ ...formData, minutes_played: Number(event.target.value || 0) })}
                type="number"
                value={formData.minutes_played}
              />
            </div>
            <div className="col-span-2">
              <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-[#141414]/50">
                Data da Partida
              </label>
              <input
                className="w-full border border-[#141414] p-3 focus:outline-none"
                onChange={(event) => setFormData({ ...formData, match_date: event.target.value })}
                type="date"
                value={formData.match_date}
              />
            </div>
          </div>

          <button
            className="w-full bg-[#141414] py-4 font-bold uppercase tracking-widest text-white transition-all hover:bg-[#F27D26]"
            type="submit"
          >
            Salvar Estatística
          </button>
        </form>
      </div>

      <div className="overflow-hidden border border-[#141414] bg-white shadow-[8px_8px_0px_0px_rgba(20,20,20,1)] lg:col-span-2">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#141414] font-serif text-sm text-white italic">
              <th className="border-r border-white/10 p-4">Data</th>
              <th className="border-r border-white/10 p-4">Jogador</th>
              <th className="border-r border-white/10 p-4 text-center">G</th>
              <th className="border-r border-white/10 p-4 text-center">A</th>
              <th className="border-r border-white/10 p-4 text-center">CA</th>
              <th className="border-r border-white/10 p-4 text-center">CV</th>
              <th className="p-4 text-center">Min</th>
            </tr>
          </thead>
          <tbody className="font-mono text-xs">
            {stats.map((stat) => (
              <tr key={stat.id} className="border-b border-[#141414]/10 transition-colors hover:bg-[#F27D26]/5">
                <td className="border-r border-[#141414]/10 p-4">{format(new Date(stat.match_date), 'dd/MM/yy')}</td>
                <td className="border-r border-[#141414]/10 p-4 font-bold uppercase">{stat.player_name}</td>
                <td className="border-r border-[#141414]/10 p-4 text-center font-bold text-[#F27D26]">{stat.goals}</td>
                <td className="border-r border-[#141414]/10 p-4 text-center">{stat.assists}</td>
                <td className="border-r border-[#141414]/10 p-4 text-center">
                  {stat.yellow_cards > 0 && <span className="inline-block h-4 w-3 border border-yellow-600 bg-yellow-400" />}
                </td>
                <td className="border-r border-[#141414]/10 p-4 text-center">
                  {stat.red_cards > 0 && <span className="inline-block h-4 w-3 border border-red-800 bg-red-600" />}
                </td>
                <td className="p-4 text-center">{stat.minutes_played}'</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

