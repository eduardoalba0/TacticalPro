const jogadorService = {
    listarTodos: async () => {
        const response = await api.get("/jogadores")
        return response.data
    },
    cadastrar: async (jogador) => {
        const response = await api.post("/jogadores", jogador)
        return response.data
    },
    buscarId: async (id) => {
        const response = await api.get(`/jogadores/${id}`)
        return response.data
    },
    atualizar: async (id, jogador) =>{
        const response = await api.put(`/jogadores/${id}`, jogador)
        return response.data
    }
}
export default jogadorService;