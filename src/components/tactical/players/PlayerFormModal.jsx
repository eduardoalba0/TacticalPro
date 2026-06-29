import { motion } from 'motion/react'

export function ModalFormularioJogador({ editingPlayer, error, formData, onClose, onSubmit, setFormData }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#141414]/80 p-4 backdrop-blur-sm">
      <motion.div
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-lg border border-[#141414] bg-white p-8 shadow-[12px_12px_0px_0px_rgba(242,125,38,1)]"
        initial={{ scale: 0.9, opacity: 0 }}
      >
        <h3 className="mb-8 border-b-2 border-[#141414] pb-4 font-serif text-xl font-bold uppercase italic">
          {editingPlayer ? 'Editar Atleta' : 'Novo Cadastro'}
        </h3>

        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-[#141414]/50">
                Nome Completo
              </label>
              <input
                className="w-full border border-[#141414] p-3 focus:outline-none focus:ring-2 focus:ring-[#F27D26]/20"
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                required
                type="text"
                value={formData.name}
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-[#141414]/50">
                Posição
              </label>
              <select
                className="w-full border border-[#141414] p-3 focus:outline-none"
                onChange={(event) => setFormData({ ...formData, position: event.target.value })}
                value={formData.position}
              >
                <option>Goleiro</option>
                <option>Zagueiro</option>
                <option>Lateral</option>
                <option>Meia</option>
                <option>Atacante</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-[#141414]/50">
                Nº Camisa
              </label>
              <input
                className="w-full border border-[#141414] p-3 focus:outline-none"
                min="1"
                onChange={(event) => setFormData({ ...formData, jersey_number: Number(event.target.value || 0) })}
                required
                type="number"
                value={formData.jersey_number}
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-[#141414]/50">
                Idade
              </label>
              <input
                className="w-full border border-[#141414] p-3 focus:outline-none"
                min="1"
                onChange={(event) => setFormData({ ...formData, age: Number(event.target.value || 0) })}
                required
                type="number"
                value={formData.age}
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-[#141414]/50">
                Status Físico
              </label>
              <select
                className="w-full border border-[#141414] p-3 focus:outline-none"
                onChange={(event) => setFormData({ ...formData, physical_status: event.target.value })}
                value={formData.physical_status}
              >
                <option value="available">Disponível</option>
                <option value="injured">Lesionado</option>
                <option value="recovering">Recuperação</option>
              </select>
            </div>
          </div>

          {error && <div className="border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-600">{error}</div>}

          <div className="flex gap-4 pt-4">
            <button
              className="flex-1 border border-[#141414] py-3 font-bold uppercase tracking-widest transition-colors hover:bg-[#141414]/5"
              onClick={onClose}
              type="button"
            >
              Cancelar
            </button>
            <button
              className="flex-1 bg-[#141414] py-3 font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#F27D26]"
              type="submit"
            >
              Salvar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

