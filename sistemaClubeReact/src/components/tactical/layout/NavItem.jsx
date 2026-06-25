import { cn } from '../../../lib/cn.js'
import { Link } from 'react-router-dom'

export function ItemNavegacao({ active, icon, label, onClick, href }) {
  const classes = cn(
    'group flex w-full items-center gap-3 rounded-sm p-3 transition-all',
    active
      ? 'bg-[#F27D26] text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]'
      : 'text-white/60 hover:bg-white/5 hover:text-white',
  )

  if (href) {
    return (
      <Link className={classes} to={href}>
        <span className={cn('transition-transform', active ? '' : 'group-hover:scale-110')}>{icon}</span>
        <span className="font-medium">{label}</span>
      </Link>
    )
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      type="button"
    >
      <span className={cn('transition-transform', active ? '' : 'group-hover:scale-110')}>{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  )
}

