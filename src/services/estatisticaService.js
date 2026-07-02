import api from './api'
import registroLocalService from './registroLocalService'

const criarJogadorRequestMinimo = (codigoJogador) => ({
  codigo: Number(codigoJogador) || 0,
  nome: '',
  dataNascimento: '',
  numeroCamisa: '',
  pesoKG: 0,
  alturaCM: 0,
  descricao: '',
  disponivel: 'DISPONIVEL',
  pernaDominante: 'Direita',
  posicao: '',
  contrato: null,
  lesoes: [],
})

const criarChaveEstatistica = (estatistica = {}) => {
  if (estatistica?.codigo != null) {
    return `estatistica-${estatistica.codigo}`
  }

  const partes = [
    estatistica?.player_id,
    estatistica?.player_name,
    estatistica?.goals,
    estatistica?.assists,
    estatistica?.minutes_played,
    estatistica?.yellow_cards,
    estatistica?.red_cards,
  ]

  return `estatistica-${partes.map((item) => String(item ?? '')).join('-')}`
}

const obterDataRegistrada = (estatistica = {}) => {
  const metadado = registroLocalService.obterMetadado('estatisticas', criarChaveEstatistica(estatistica))
  return metadado?.match_date || new Date().toISOString().split('T')[0]
}

const mapearEstatisticaRequest = (estatistica = {}) => ({
  gols: Number(estatistica?.goals) || 0,
  assistencias: Number(estatistica?.assists) || 0,
  passes: Number(estatistica?.passes) || 0,
  jogos: Number(estatistica?.jogos) || 1,
  minutosJogados: Number(estatistica?.minutes_played) || 0,
  desarmes: Number(estatistica?.desarmes) || 0,
  cartoesAmarelos: Number(estatistica?.yellow_cards) || 0,
  cartoesVermelhos: Number(estatistica?.red_cards) || 0,
  faltasJogador: Number(estatistica?.faltasJogador) || 0,
  jogador: criarJogadorRequestMinimo(estatistica?.player_id),
})

const mapearEstatisticaResposta = (estatistica = {}, indice = 0) => {
  const jogador = estatistica?.jogador || {}
  const estatisticaNormalizada = {
    codigo: estatistica?.codigo ?? indice,
    player_id: jogador?.codigo ?? null,
    player_name: jogador?.nome || 'Jogador',
    goals: Number(estatistica?.gols) || 0,
    assists: Number(estatistica?.assistencias) || 0,
    yellow_cards: Number(estatistica?.cartoesAmarelos) || 0,
    red_cards: Number(estatistica?.cartoesVermelhos) || 0,
    minutes_played: Number(estatistica?.minutosJogados) || 0,
  }

  return {
    id: estatisticaNormalizada.codigo,
    match_date: obterDataRegistrada(estatisticaNormalizada),
    ...estatisticaNormalizada,
  }
}

const estatisticaService = {
  listarTodas: async () => {
    const response = await api.get('/estatisticas')
    const estatisticas = Array.isArray(response.data) ? response.data : []
    return estatisticas.map((item, indice) => mapearEstatisticaResposta(item, indice))
  },

  cadastrar: async (estatistica) => {
    const payload = mapearEstatisticaRequest(estatistica)
    const response = await api.post('/estatisticas', payload)
    const estatisticaCriada = mapearEstatisticaResposta(response.data)
    const chave = criarChaveEstatistica(estatisticaCriada)

    registroLocalService.salvarMetadado('estatisticas', chave, {
      match_date: estatistica?.match_date || new Date().toISOString().split('T')[0],
    })
    registroLocalService.registrarAtividade({
      descricao: `Estatistica registrada para ${estatisticaCriada.player_name}`,
    })

    return {
      ...estatisticaCriada,
      match_date: estatistica?.match_date || estatisticaCriada.match_date,
    }
  },
}

export default estatisticaService
