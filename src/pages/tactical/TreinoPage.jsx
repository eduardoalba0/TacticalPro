import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '../../lib/cn.js'
import treinoService from '../../services/treinoService.js'

const createDefaultTrainingForm = () => ({
  date: new Date().toISOString().split('T')[0],
  description: '',
  duration: 60,
  intensity: 'Média',
})

export function PaginaTreinos() {
  const [sessions, setSessions] = useState([])
  const [formData, setFormData] = useState(createDefaultTrainingForm)

  const fetchTraining = async () => {
    try {
      const data = await treinoService.listarTodos()
      setSessions(Array.isArray(data) ? data : [])
    } catch {
      setSessions([])
    }
  }

  useEffect(() => {
    fetchTraining()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    await treinoService.cadastrar(formData)

    setFormData(createDefaultTrainingForm())
    fetchTraining()
    window.alert('Treino registrado!')
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="border border-[#141414] bg-white p-8 shadow-[8px_8px_0px_0px_rgba(20,20,20,1)]">
        <h3 className="mb-8 border-b-2 border-[#141414] pb-4 font-serif text-xl font-bold uppercase italic">Novo Treino</h3>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-[#141414]/50">Data</label>
            <input
              className="w-full border border-[#141414] p-3 focus:outline-none"
              onChange={(event) => setFormData({ ...formData, date: event.target.value })}
              required
              type="date"
              value={formData.date}
            />
          </div>
          <div>
            <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-[#141414]/50">
              Descrição / Foco
            </label>
            <textarea
              className="h-32 w-full resize-none border border-[#141414] p-3 focus:outline-none"
              onChange={(event) => setFormData({ ...formData, description: event.target.value })}
              placeholder="Ex: Treino tático focado em saída de bola..."
              required
              value={formData.description}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-[#141414]/50">
                Duração (min)
              </label>
              <input
                className="w-full border border-[#141414] p-3 focus:outline-none"
                onChange={(event) => setFormData({ ...formData, duration: Number(event.target.value || 0) })}
                type="number"
                value={formData.duration}
              />
            </div>
            <div>
              <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-[#141414]/50">
                Intensidade
              </label>
              <select
                className="w-full border border-[#141414] p-3 focus:outline-none"
                onChange={(event) => setFormData({ ...formData, intensity: event.target.value })}
                value={formData.intensity}
              >
                <option>Baixa</option>
                <option>Média</option>
                <option>Alta</option>
              </select>
            </div>
          </div>
          <button
            className="w-full bg-[#141414] py-4 font-bold uppercase tracking-widest text-white transition-all hover:bg-[#F27D26]"
            type="submit"
          >
            Agendar Treino
          </button>
        </form>
      </div>

      <div className="space-y-4 lg:col-span-2">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-start gap-6 border border-[#141414] bg-white p-6 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)]"
          >
            <div className="min-w-[80px] bg-[#141414] p-4 text-center text-white">
              <p className="font-mono text-xs uppercase opacity-60">{format(new Date(session.date), 'MMM', { locale: ptBR })}</p>
              <p className="font-serif text-2xl font-bold italic">{format(new Date(session.date), 'dd')}</p>
            </div>
            <div className="flex-1">
              <div className="mb-2 flex items-start justify-between gap-3">
                <span
                  className={cn(
                    'border border-[#141414] px-2 py-1 text-[10px] font-bold uppercase tracking-widest',
                    session.intensity === 'Alta'
                      ? 'bg-red-50 text-red-700'
                      : session.intensity === 'Média'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-emerald-50 text-emerald-700',
                  )}
                >
                  Intensidade {session.intensity}
                </span>
                <span className="font-mono text-xs text-[#141414]/40">{session.duration} minutos</span>
              </div>
              <p className="text-lg font-bold">{session.description}</p>
            </div>
          </div>
        ))}

        {sessions.length === 0 && (
          <div className="border border-dashed border-[#141414]/20 p-12 text-center text-[#141414]/40 italic">
            Nenhum treino registrado.
          </div>
        )}
      </div>
    </div>
  )
}

