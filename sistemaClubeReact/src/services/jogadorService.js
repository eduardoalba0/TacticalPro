import api from './api'

const jogadorService = {
  listarTodos: async () => {
    const response = await api.get('/api/players')
    return response.data
  },
  cadastrar: async (jogador) => {
    const response = await api.post('/api/players', jogador)
    return response.data
  },
  buscarId: async (id) => {
    const response = await api.get(`/api/players/${id}`)
    return response.data
  },
  atualizar: async (id, jogador) => {
    const response = await api.put(`/api/players/${id}`, jogador)
    return response.data
  },
  remover: async (id) => {
    const response = await api.delete(`/api/players/${id}`)
    return response.data
  },
}

export default jogadorService;