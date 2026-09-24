export default function SearchVisualizer({ step, target }) {
  if (!step) return null
  const { array, current, found, low, high, mid } = step

  const cellClass = (i) => {
    if (found === i) return 'bg-phosphor-500 border-phosphor-500 text-ink-950'
    if (mid === i) return 'bg-signal-400 border-signal-400 text-ink-950'
    if (current === i) return 'bg-signal-500/30 border-signal-400 text-paper'
    if (low !== undefined && high !== undefined && low !== null && high !== null && (i < low || i > high))
      return 'bg-ink-900 border-ink-700 text-ink-500 opacity-40'
    return 'bg-ink-800 border-ink-600 text-paper'
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 px-2">
      <div className="text-xs font-mono text-muted">
        target = <span className="text-phosphor-400">{target}</span>
        {found === -1 && <span className="ml-3 text-red-400">not found</span>}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {array.map((value, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="flex gap-1 h-4">
              {low === i && <Pointer label="lo" color="text-signal-600" />}
              {mid === i && <Pointer label="mid" color="text-phosphor-400" />}
              {high === i && <Pointer label="hi" color="text-signal-600" />}
              {current === i && low === undefined && <Pointer label="i" color="text-signal-600" />}
            </div>
            <div
              className={`w-12 h-12 border flex items-center justify-center font-mono text-sm transition-colors ${cellClass(
                i,
              )}`}
            >
              {value}
            </div>
            <span className="text-[9px] font-mono text-ink-500">{i}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Pointer({ label, color }) {
  return <span className={`text-[10px] font-mono ${color}`}>{label}</span>
}
