import api from './api'
import registroLocalService from './registroLocalService'

const criarChaveTreino = (treino = {}, indice = 0) => `treino-${treino?.codigo ?? treino?.id ?? indice}`

const obterDataTreino = (treino = {}, indice = 0) => {
  const metadado = registroLocalService.obterMetadado('treinos', criarChaveTreino(treino, indice))
  return metadado?.date || new Date().toISOString().split('T')[0]
}

const mapearTreinoRequest = (treino = {}) => ({
  focoTatico: treino?.description || 'Treino geral',
  intensidade: treino?.intensity || 'Media',
  clima: treino?.clima || 'Indefinido',
  descricao: treino?.description || 'Sessao de treino',
})

const mapearTreinoResposta = (treino = {}, indice = 0) => ({
  id: treino?.codigo ?? indice,
  date: obterDataTreino(treino, indice),
  description: treino?.descricao || treino?.focoTatico || 'Treino',
  duration: 60,
  intensity: treino?.intensidade || 'Media',
})

const treinoService = {
  listarTodos: async () => {
    const response = await api.get('/treinos')
    const treinos = Array.isArray(response.data) ? response.data : []
    return treinos.map((item, indice) => mapearTreinoResposta(item, indice))
  },

  cadastrar: async (treino) => {
    const payload = mapearTreinoRequest(treino)
    const response = await api.post('/treinos', payload)
    const treinoCriado = mapearTreinoResposta(response.data)

    registroLocalService.salvarMetadado('treinos', criarChaveTreino({ codigo: treinoCriado.id }), {
      date: treino?.date || new Date().toISOString().split('T')[0],
    })
    registroLocalService.registrarAtividade({
      descricao: `Treino registrado: ${treinoCriado.description}`,
    })

    return {
      ...treinoCriado,
      date: treino?.date || treinoCriado.date,
    }
  },
}

export default treinoService
