import { useEffect, useMemo, useState } from 'react'
import { Edit2, Plus, Search, Trash2 } from 'lucide-react'
import { ModalFormularioJogador } from '../../components/tactical/players/PlayerFormModal.jsx'
import { cn } from '../../lib/cn.js'
import jogadorService from '../../services/jogadorService.js'

const defaultFormData = {
  name: '',
  position: 'Meia',
  age: 20,
  jersey_number: 1,
  physical_status: 'available',
}

export function PaginaJogadores({ players = [], refreshPlayers }) {
  const [showModal, setShowModal] = useState(false)
  const [editingPlayer, setEditingPlayer] = useState(null)
  const [formData, setFormData] = useState(defaultFormData)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!showModal) {
      return
    }

    if (editingPlayer) {
      setFormData({
        name: editingPlayer.name,
        position: editingPlayer.position,
        age: editingPlayer.age,
        jersey_number: editingPlayer.jersey_number,
        physical_status: editingPlayer.physical_status,
      })
      return
    }

    const nextJerseyNumber = players.length > 0 ? Math.max(...players.map((player) => player.jersey_number)) + 1 : 1

    setFormData({
      ...defaultFormData,
      jersey_number: nextJerseyNumber,
    })
  }, [editingPlayer, players, showModal])

  const filteredPlayers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    if (!normalizedSearch) {
      return players
    }

    return players.filter((player) => {
      const searchBase = `${player.name} ${player.position} ${player.jersey_number}`.toLowerCase()
      return searchBase.includes(normalizedSearch)
    })
  }, [players, searchTerm])

  const closeModal = () => {
    setShowModal(false)
    setEditingPlayer(null)
    setError(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)

    try {
      if (editingPlayer) {
        await jogadorService.atualizar(editingPlayer.id, formData)
      } else {
        await jogadorService.cadastrar(formData)
      }

      closeModal()
      refreshPlayers()
    } catch (requestError) {
      setError(requestError?.response?.data?.error || 'Erro ao salvar jogador')
    }
  }

  const handleDelete = async (id) => {
    if (!Number.isFinite(Number(id))) {
      setError('Nao foi possivel excluir: jogador sem codigo no retorno da API.')
      return
    }

    if (!window.confirm('Deseja realmente excluir este jogador?')) {
      return
    }

    try {
      await jogadorService.remover(id)
      refreshPlayers()
    } catch {
      setError('Erro ao excluir jogador')
    }
  }

  return (
    <div className="space-y-6">
      {error && <div className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-72">
          <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-[#141414]/40" size={18} />
          <input
            className="w-full border border-[#141414] bg-white py-2 pr-4 pl-10 focus:outline-none focus:ring-2 focus:ring-[#F27D26]/20"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Buscar jogador..."
            type="text"
            value={searchTerm}
          />
        </div>

        <button
          className="flex items-center gap-2 bg-[#141414] px-6 py-2 font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#F27D26]"
          onClick={() => {
            setEditingPlayer(null)
            setShowModal(true)
          }}
          type="button"
        >
          <Plus size={18} />
          Novo Jogador
        </button>
      </div>

      <div className="overflow-hidden border border-[#141414] bg-white shadow-[8px_8px_0px_0px_rgba(20,20,20,1)]">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#141414] font-serif text-sm text-white italic">
              <th className="border-r border-white/10 p-4">#</th>
              <th className="border-r border-white/10 p-4">Nome</th>
              <th className="border-r border-white/10 p-4">Posição</th>
              <th className="border-r border-white/10 p-4">Idade</th>
              <th className="border-r border-white/10 p-4">Status</th>
              <th className="p-4">Ações</th>
            </tr>
          </thead>
          <tbody className="font-mono text-sm">
            {filteredPlayers.map((player) => (
              <tr
                key={player.chaveTabela || player.id || `${player.name}-${player.jersey_number}`}
                className="border-b border-[#141414]/10 transition-colors hover:bg-[#F27D26]/5"
              >
                <td className="border-r border-[#141414]/10 p-4 font-bold">{player.jersey_number}</td>
                <td className="border-r border-[#141414]/10 p-4 font-bold uppercase">{player.name}</td>
                <td className="border-r border-[#141414]/10 p-4">{player.position}</td>
                <td className="border-r border-[#141414]/10 p-4">{player.age} anos</td>
                <td className="border-r border-[#141414]/10 p-4">
                  <span
                    className={cn(
                      'px-2 py-1 text-[10px] font-bold uppercase tracking-tighter',
                      player.physical_status === 'available'
                        ? 'bg-emerald-100 text-emerald-700'
                        : player.physical_status === 'injured'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-amber-100 text-amber-700',
                    )}
                  >
                    {player.physical_status === 'available'
                      ? 'Disponível'
                      : player.physical_status === 'injured'
                        ? 'Lesionado'
                        : 'Em Recuperação'}
                  </span>
                </td>
                <td className="flex gap-2 p-4">
                  <button
                    className="border border-[#141414]/10 p-2 transition-colors hover:bg-[#141414] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={!Number.isFinite(Number(player.id))}
                    onClick={() => {
                      setEditingPlayer(player)
                      setShowModal(true)
                    }}
                    type="button"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="border border-[#141414]/10 p-2 transition-colors hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={!Number.isFinite(Number(player.id))}
                    onClick={() => handleDelete(player.id)}
                    type="button"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredPlayers.length === 0 && (
              <tr>
                <td className="p-12 text-center text-[#141414]/40 italic" colSpan={6}>
                  {players.length === 0
                    ? 'Nenhum jogador cadastrado. Comece adicionando seu primeiro atleta.'
                    : 'Nenhum jogador encontrado para a busca informada.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ModalFormularioJogador
          editingPlayer={editingPlayer}
          error={error}
          formData={formData}
          onClose={closeModal}
          onSubmit={handleSubmit}
          setFormData={setFormData}
        />
      )}
    </div>
  )
}
