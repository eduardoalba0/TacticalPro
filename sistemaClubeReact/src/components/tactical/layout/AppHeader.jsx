const viewTitles = {
  dashboard: 'Visão Geral',
  players: 'Gestão de Elenco',
  lineups: 'Centro de Escalação',
  stats: 'Registros de Partida',
  training: 'Plano de Treinamento',
  reports: 'Análise de Desempenho',
}

export function CabecalhoApp({ currentView, emailTecnico }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#141414] bg-white p-6">
      <h2 className="font-serif text-2xl font-bold uppercase italic tracking-tight">
        {viewTitles[currentView]}
      </h2>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#141414]/40">
            Técnico Logado
          </p>
          <p className="text-sm font-bold">{emailTecnico}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center border border-[#141414] bg-[#F27D26] font-bold text-white">
          {emailTecnico.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  )
}

