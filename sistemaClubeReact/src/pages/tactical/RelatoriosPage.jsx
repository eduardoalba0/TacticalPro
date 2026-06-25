import { useEffect, useMemo, useState } from 'react'
import { IndicadorCarregamento } from '../../components/tactical/ui/LoadingSpinner.jsx'
import relatorioService from '../../services/relatorioService.js'

export function PaginaRelatorios() {
  const [report, setReport] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true)

      try {
        const data = await relatorioService.desempenho()
        setReport(Array.isArray(data) ? data : [])
      } catch {
        setReport([])
      } finally {
        setLoading(false)
      }
    }

    fetchReport()
  }, [])

  const reportHighlights = useMemo(() => {
    const topScorer = [...report].sort((left, right) => right.total_goals - left.total_goals)[0]
    const topAssist = [...report].sort((left, right) => right.total_assists - left.total_assists)[0]
    const mostMinutes = [...report].sort((left, right) => right.total_minutes - left.total_minutes)[0]
    const totalGoals = report.reduce((accumulator, current) => accumulator + current.total_goals, 0)
    const totalMatches = report.reduce((accumulator, current) => accumulator + current.matches_played, 0)

    return {
      topScorer,
      topAssist,
      mostMinutes,
      averageGoals: report.length > 0 ? (totalGoals / Math.max(1, totalMatches)).toFixed(2) : '0.00',
    }
  }, [report])

  if (loading) {
    return <IndicadorCarregamento label="Processando dados de desempenho..." />
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="bg-[#141414] p-6 text-white shadow-[4px_4px_0px_0px_rgba(242,125,38,1)]">
          <p className="mb-2 font-mono text-[10px] uppercase opacity-40">Artilheiro</p>
          <p className="font-serif text-xl font-bold italic">{reportHighlights.topScorer?.name || '-'}</p>
          <p className="text-3xl font-bold text-[#F27D26]">{reportHighlights.topScorer?.total_goals || 0} Gols</p>
        </div>
        <div className="border border-[#141414] bg-white p-6 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)]">
          <p className="mb-2 font-mono text-[10px] uppercase text-[#141414]/40">Garçom</p>
          <p className="font-serif text-xl font-bold italic">{reportHighlights.topAssist?.name || '-'}</p>
          <p className="text-3xl font-bold">{reportHighlights.topAssist?.total_assists || 0} Assist.</p>
        </div>
        <div className="border border-[#141414] bg-white p-6 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)]">
          <p className="mb-2 font-mono text-[10px] uppercase text-[#141414]/40">Mais Minutos</p>
          <p className="font-serif text-xl font-bold italic">{reportHighlights.mostMinutes?.name || '-'}</p>
          <p className="text-3xl font-bold">{reportHighlights.mostMinutes?.total_minutes || 0}'</p>
        </div>
        <div className="border border-[#141414] bg-white p-6 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)]">
          <p className="mb-2 font-mono text-[10px] uppercase text-[#141414]/40">Média de Gols/Jogo</p>
          <p className="text-3xl font-bold">{reportHighlights.averageGoals}</p>
        </div>
      </div>

      <div className="overflow-hidden border border-[#141414] bg-white shadow-[8px_8px_0px_0px_rgba(20,20,20,1)]">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#141414] font-serif text-sm text-white italic">
              <th className="border-r border-white/10 p-4">Jogador</th>
              <th className="border-r border-white/10 p-4">Posição</th>
              <th className="border-r border-white/10 p-4 text-center">Jogos</th>
              <th className="border-r border-white/10 p-4 text-center">Gols</th>
              <th className="border-r border-white/10 p-4 text-center">Assists</th>
              <th className="border-r border-white/10 p-4 text-center">Amarelos</th>
              <th className="border-r border-white/10 p-4 text-center">Vermelhos</th>
              <th className="p-4 text-center">Minutos</th>
            </tr>
          </thead>
          <tbody className="font-mono text-xs">
            {report.map((row) => (
              <tr key={row.id} className="border-b border-[#141414]/10 transition-colors hover:bg-[#F27D26]/5">
                <td className="border-r border-[#141414]/10 p-4 font-bold uppercase">{row.name}</td>
                <td className="border-r border-[#141414]/10 p-4">{row.position}</td>
                <td className="border-r border-[#141414]/10 p-4 text-center">{row.matches_played}</td>
                <td className="border-r border-[#141414]/10 p-4 text-center font-bold text-[#F27D26]">{row.total_goals}</td>
                <td className="border-r border-[#141414]/10 p-4 text-center font-bold">{row.total_assists}</td>
                <td className="border-r border-[#141414]/10 p-4 text-center">{row.total_yellow}</td>
                <td className="border-r border-[#141414]/10 p-4 text-center">{row.total_red}</td>
                <td className="p-4 text-center">{row.total_minutes}'</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

