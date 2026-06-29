import api from './api'
import registroLocalService from './registroLocalService'

const mapaStatusParaDisponivel = {
  available: 'DISPONIVEL',
  injured: 'INDISPONIVEL',
  recovering: 'EM_RECUPERACAO',
}

const normalizarDataNascimento = (idade) => {
  const idadeNumero = Number(idade)
  if (!Number.isFinite(idadeNumero) || idadeNumero <= 0) {
    return ''
  }

  const ano = new Date().getFullYear() - idadeNumero
  return `${ano}-01-01`
}

const mapearJogadorResposta = (jogador = {}, indice = 0) => {
  const codigo = jogador?.codigo ?? jogador?.id ?? null
  const numeroCamisa = Number(jogador?.numeroCamisa)
  const dataNascimento = jogador?.dataNascimento || ''
  const anoNascimento = Number(String(dataNascimento).slice(0, 4))

  return {
    id: Number.isFinite(Number(codigo)) ? Number(codigo) : null,
    chaveTabela: Number.isFinite(Number(codigo)) ? `j-${codigo}` : `j-${indice}-${jogador?.nome || 'sem-nome'}`,
    name: jogador?.nome || '',
    position: jogador?.posicao || 'Meia',
    jersey_number: Number.isFinite(numeroCamisa) ? numeroCamisa : 0,
    age: Number.isFinite(anoNascimento) ? Math.max(0, new Date().getFullYear() - anoNascimento) : 0,
    physical_status: jogador?.disponivel === 'DISPONIVEL' ? 'available' : jogador?.disponivel === 'EM_RECUPERACAO' ? 'recovering' : 'injured',
    _raw: jogador,
  }
}

const mapearJogadorRequest = (jogador = {}) => ({
  codigo: Number(jogador?.id) || 0,
  nome: jogador?.name || '',
  dataNascimento: normalizarDataNascimento(jogador?.age),
  numeroCamisa: String(jogador?.jersey_number ?? ''),
  pesoKG: 0,
  alturaCM: 0,
  descricao: '',
  disponivel: mapaStatusParaDisponivel[jogador?.physical_status] || 'DISPONIVEL',
  pernaDominante: 'Direita',
  posicao: jogador?.position || 'Meia',
  contrato: null,
  lesoes: [],
})

const montarFormDataAtualizacao = (payload) => {
  const dadosJson = JSON.stringify(payload)
  const formData = new FormData()
  formData.append('dados', new Blob([dadosJson], { type: 'application/json' }))
  return formData
}

const jogadorService = {
  listarTodos: async () => {
    const response = await api.get('/api/jogadores')
    const jogadores = Array.isArray(response.data) ? response.data : []
    return jogadores.map((item, indice) => mapearJogadorResposta(item, indice))
  },

  cadastrar: async (jogador) => {
    const payload = mapearJogadorRequest(jogador)
    const response = await api.post('/api/jogadores', payload)
    const jogadorCriado = mapearJogadorResposta(response.data)
    registroLocalService.registrarAtividade({
      descricao: `Novo jogador cadastrado: ${jogadorCriado.name || 'Atleta sem nome'}`,
    })
    return jogadorCriado
  },

  atualizar: async (id, jogador) => {
    if (!Number.isFinite(Number(id))) {
      throw new Error('Codigo do jogador invalido para atualizacao')
    }

    const payload = mapearJogadorRequest({ ...jogador, id })
    const formData = montarFormDataAtualizacao(payload)
    const response = await api.put(`/api/jogadores/${id}`, formData)
    const jogadorAtualizado = mapearJogadorResposta(response.data)
    registroLocalService.registrarAtividade({
      descricao: `Jogador atualizado: ${jogadorAtualizado.name || 'Atleta sem nome'}`,
    })
    return jogadorAtualizado
  },

  remover: async (id) => {
    if (!Number.isFinite(Number(id))) {
      throw new Error('Codigo do jogador invalido para exclusao')
    }

    await api.delete(`/api/jogadores/${id}`)
    registroLocalService.registrarAtividade({
      descricao: `Jogador removido do elenco (codigo ${id})`,
    })
    return true
  },
}

export default jogadorService
