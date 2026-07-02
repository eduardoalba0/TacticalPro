import api from './api'

const tecnicoService = {
  login: async ({ email, senha }) => {
    try {
      const response = await api.post('/auth/login', { email, senha })
      const resposta = response.data || {}

      return {
        success: Boolean(resposta.autenticado),
        message: resposta.mensagem || '',
        tecnico: {
          codigo: resposta.codigoTecnico,
          nome: resposta.nome,
          email: resposta.email,
        },
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        return {
          success: false,
          message: error?.response?.data?.message || 'Email ou senha invalidos',
        }
      }

      throw error
    }
  },
}

export default tecnicoService
