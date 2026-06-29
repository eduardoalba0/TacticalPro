import { cn } from '../../../lib/cn.js'

export function CartaoEstatistica({ color, icon, label, corTexto = 'text-[#141414]', value }) {
  return (
    <div className={cn('border border-[#141414] p-6 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)]', color)}>
      <div className="mb-4 flex items-start justify-between">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#141414]/40">{label}</span>
        <div className={cn('p-2', corTexto)}>{icon}</div>
      </div>
      <p className={cn('text-4xl font-bold tracking-tighter', corTexto)}>{value}</p>
    </div>
  )
}

