import api from './api'

const treinoService = {
  listarTodos: async () => {
    const response = await api.get('/api/training')
    return response.data
  },
  cadastrar: async (treino) => {
    const response = await api.post('/api/training', treino)
    return response.data
  },
}

export default treinoService
