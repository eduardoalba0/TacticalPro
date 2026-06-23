import api from './api'

const estatisticaService = {
  listarTodas: async () => {
    const response = await api.get('/api/stats')
    return response.data
  },
  cadastrar: async (estatistica) => {
    const response = await api.post('/api/stats', estatistica)
    return response.data
  },
}

export default estatisticaService
