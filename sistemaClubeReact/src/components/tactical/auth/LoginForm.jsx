import { AlertCircle, ChevronRight, Shield } from 'lucide-react'
import { motion } from 'motion/react'

export function LoginForm({ error, password, username, onPasswordChange, onSubmit, onUsernameChange }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#E4E3E0] p-4 font-sans">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md border border-[#141414] bg-white p-8 shadow-[8px_8px_0px_0px_rgba(20,20,20,1)]"
        initial={{ opacity: 0, y: 20 }}
      >
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-sm bg-[#141414] p-2">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#141414]">TACTICAL PRO</h1>
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label className="mb-2 block font-serif text-xs font-bold uppercase tracking-wider text-[#141414]/50 italic">
              Usuário
            </label>
            <input
              className="w-full border-b-2 border-[#141414] bg-transparent py-2 transition-colors focus:border-[#F27D26] focus:outline-none"
              onChange={(event) => onUsernameChange(event.target.value)}
              placeholder="tecnico"
              required
              type="text"
              value={username}
            />
          </div>

          <div>
            <label className="mb-2 block font-serif text-xs font-bold uppercase tracking-wider text-[#141414]/50 italic">
              Senha
            </label>
            <input
              className="w-full border-b-2 border-[#141414] bg-transparent py-2 transition-colors focus:border-[#F27D26] focus:outline-none"
              onChange={(event) => onPasswordChange(event.target.value)}
              placeholder="••••••••"
              required
              type="password"
              value={password}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <button
            className="group flex w-full items-center justify-center gap-2 bg-[#141414] py-4 font-bold uppercase tracking-widest text-white transition-all hover:bg-[#F27D26]"
            type="submit"
          >
            Acessar Sistema
            <ChevronRight className="transition-transform group-hover:translate-x-1" size={18} />
          </button>
        </form>

        <p className="mt-8 text-center font-mono text-xs text-[#141414]/40">© 2026 Tactical Pro v1.0.0</p>
      </motion.div>
    </div>
  )
}

