const CHAVE_ATIVIDADES = 'tacticalpro.atividades'
const CHAVE_METADADOS = 'tacticalpro.metadados'
const LIMITE_ATIVIDADES = 10

const podeUsarStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

const lerJson = (chave, fallback) => {
  if (!podeUsarStorage()) {
    return fallback
  }

  try {
    const valor = window.localStorage.getItem(chave)
    return valor ? JSON.parse(valor) : fallback
  } catch {
    return fallback
  }
}

const salvarJson = (chave, valor) => {
  if (!podeUsarStorage()) {
    return
  }

  window.localStorage.setItem(chave, JSON.stringify(valor))
}

const normalizarChave = (valor) => String(valor ?? '').trim()

const registroLocalService = {
  listarAtividades: () => {
    const atividades = lerJson(CHAVE_ATIVIDADES, [])
    return Array.isArray(atividades) ? atividades : []
  },

  registrarAtividade: ({ descricao, dataIso = new Date().toISOString() }) => {
    if (!descricao) {
      return
    }

    const atividades = registroLocalService.listarAtividades()
    const proximasAtividades = [{ descricao, dataIso }, ...atividades].slice(0, LIMITE_ATIVIDADES)
    salvarJson(CHAVE_ATIVIDADES, proximasAtividades)
  },

  salvarMetadado: (categoria, chave, dados) => {
    if (!categoria || !chave) {
      return
    }

    const metadados = lerJson(CHAVE_METADADOS, {})
    const categoriaAtual = metadados[categoria] && typeof metadados[categoria] === 'object' ? metadados[categoria] : {}

    metadados[categoria] = {
      ...categoriaAtual,
      [normalizarChave(chave)]: dados,
    }

    salvarJson(CHAVE_METADADOS, metadados)
  },

  obterMetadado: (categoria, chave) => {
    if (!categoria || !chave) {
      return null
    }

    const metadados = lerJson(CHAVE_METADADOS, {})
    const categoriaAtual = metadados[categoria]
    if (!categoriaAtual || typeof categoriaAtual !== 'object') {
      return null
    }

    return categoriaAtual[normalizarChave(chave)] || null
  },
}

export default registroLocalService

