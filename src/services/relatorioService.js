import estatisticaService from './estatisticaService'
import jogadorService from './jogadorService'

const paraNumero = (valor) => {
  const numero = Number(valor)
  return Number.isFinite(numero) ? numero : 0
}

const relatorioService = {
  desempenho: async () => {
    const [estatisticas, jogadores] = await Promise.all([
      estatisticaService.listarTodas().catch(() => []),
      jogadorService.listarTodos().catch(() => []),
    ])

    const listaEstatisticas = Array.isArray(estatisticas) ? estatisticas : []
    const listaJogadores = Array.isArray(jogadores) ? jogadores : []

    const acumulado = new Map(
      listaJogadores
        .filter((jogador) => typeof jogador?.name === 'string' && jogador.name.trim())
        .map((jogador) => {
          const nome = jogador.name.trim()
          const chave = nome.toLowerCase()
          return [
            chave,
            {
              id: jogador?.id ?? chave,
              name: nome,
              position: jogador?.position || '-',
              matches_played: 0,
              total_goals: 0,
              total_assists: 0,
              total_yellow: 0,
              total_red: 0,
              total_minutes: 0,
            },
          ]
        }),
    )

    for (const registro of listaEstatisticas) {
      const nome = typeof registro?.player_name === 'string' ? registro.player_name.trim() : ''
      if (!nome) {
        continue
      }

      const chave = nome.toLowerCase()
      const existente =
        acumulado.get(chave) || {
          id: registro?.player_id || chave,
          name: nome,
          position: '-',
          matches_played: 0,
          total_goals: 0,
          total_assists: 0,
          total_yellow: 0,
          total_red: 0,
          total_minutes: 0,
        }

      existente.matches_played += 1
      existente.total_goals += paraNumero(registro?.goals)
      existente.total_assists += paraNumero(registro?.assists)
      existente.total_yellow += paraNumero(registro?.yellow_cards)
      existente.total_red += paraNumero(registro?.red_cards)
      existente.total_minutes += paraNumero(registro?.minutes_played)

      acumulado.set(chave, existente)
    }

    return Array.from(acumulado.values()).sort((a, b) => {
      if (b.total_goals !== a.total_goals) {
        return b.total_goals - a.total_goals
      }
      return b.total_assists - a.total_assists
    })
  },
}

export default relatorioService
