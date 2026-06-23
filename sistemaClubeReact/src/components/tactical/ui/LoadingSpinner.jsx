export function LoadingSpinner({ label = 'Carregando...' }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-20">
      <div className="h-12 w-12 animate-spin border-4 border-[#141414] border-t-[#F27D26]" />
      <p className="animate-pulse font-mono text-sm">{label}</p>
    </div>
  )
}

