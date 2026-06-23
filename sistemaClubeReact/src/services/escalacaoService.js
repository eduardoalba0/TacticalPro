import api from './api'

const escalacaoService = {
  listarTodas: async () => {
    const response = await api.get('/api/lineups')
    return response.data
  },
  cadastrar: async (escalacao) => {
    const response = await api.post('/api/lineups', escalacao)
    return response.data
  },
}

export default escalacaoService

