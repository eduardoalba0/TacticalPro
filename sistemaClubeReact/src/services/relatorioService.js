import api from './api'

const relatorioService = {
  desempenho: async () => {
    const response = await api.get('/api/reports/performance')
    return response.data
  },
}

export default relatorioService

