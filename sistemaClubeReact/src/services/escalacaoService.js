import api from './api'
import registroLocalService from './registroLocalService'

const criarChaveEscalacao = (escalacao = {}, indice = 0) => `escalacao-${escalacao?.codigo ?? escalacao?.id ?? indice}`

const obterDataEscalacao = (escalacao = {}, indice = 0) => {
  const metadado = registroLocalService.obterMetadado('escalacoes', criarChaveEscalacao(escalacao, indice))
  return metadado?.date || new Date().toISOString()
}

const mapearEscalacaoResposta = (escalacao = {}, indice = 0) => ({
  id: escalacao?.codigo ?? null,
  name: escalacao?.esquemaTatico || 'Escalacao',
  date: obterDataEscalacao(escalacao, indice),
  player_ids: [],
  instructions: escalacao?.instrucoes || escalacao?.istrucoes || '',
  partidaCodigo: escalacao?.partidaCodigo ?? null,
})

const mapearEscalacaoRequest = (escalacao = {}) => ({
  esquemaTatico: escalacao?.name || 'Escalacao sem nome',
  instrucoes:
    escalacao?.instructions ||
    (Array.isArray(escalacao?.player_ids) && escalacao.player_ids.length > 0
      ? `Jogadores selecionados: ${escalacao.player_ids.join(', ')}`
      : 'Sem instrucoes adicionais.'),
  partidaCodigo: null,
})

const escalacaoService = {
  listarTodas: async () => {
    const response = await api.get('/api/escalacoes')
    const escalacoes = Array.isArray(response.data) ? response.data : []
    return escalacoes.map((item, indice) => mapearEscalacaoResposta(item, indice))
  },

  cadastrar: async (escalacao) => {
    const payload = mapearEscalacaoRequest(escalacao)
    const response = await api.post('/api/escalacoes', payload)
    const escalacaoCriada = mapearEscalacaoResposta(response.data)

    registroLocalService.salvarMetadado('escalacoes', criarChaveEscalacao({ codigo: escalacaoCriada.id }), {
      date: escalacao?.date || new Date().toISOString(),
    })
    registroLocalService.registrarAtividade({
      descricao: `Escalacao salva: ${escalacaoCriada.name}`,
    })

    return {
      ...escalacaoCriada,
      date: escalacao?.date || escalacaoCriada.date,
    }
  },
}

export default escalacaoService
