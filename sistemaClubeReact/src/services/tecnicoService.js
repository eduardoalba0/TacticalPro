import api from './api'

const tecnicoService = {
  login: async ({ username, password }) => {
    const response = await api.post('/api/login', { username, password })
    return response.data
  },
}

export default tecnicoService
