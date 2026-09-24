export default function SortVisualizer({ step }) {
  if (!step) return null
  const { array, comparing = [], swapping = [], sorted = [], range } = step
  const max = Math.max(...array, 1)

  const colorFor = (i) => {
    if (swapping.includes(i)) return 'bg-phosphor-500'
    if (comparing.includes(i)) return 'bg-signal-400'
    if (sorted.includes(i)) return 'bg-signal-600/70'
    if (range && i >= range[0] && i <= range[1]) return 'bg-ink-500'
    return 'bg-ink-600'
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex items-end gap-1.5 sm:gap-2 px-2 pb-2">
        {array.map((value, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full min-w-0">
            <span className="text-[10px] sm:text-xs font-mono text-muted mb-1 tabular-nums">{value}</span>
            <div
              className={`w-full transition-all duration-200 ${colorFor(i)}`}
              style={{ height: `${(value / max) * 100}%`, minHeight: 4 }}
            />
            <span className="text-[9px] font-mono text-ink-500 mt-1">{i}</span>
          </div>
        ))}
      </div>
      <Legend />
    </div>
  )
}

function Legend() {
  const items = [
    ['bg-signal-400', 'comparing'],
    ['bg-phosphor-500', 'swapping'],
    ['bg-signal-600/70', 'sorted'],
    ['bg-ink-600', 'unsorted'],
  ]
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 px-2 pt-2 border-t border-ink-700/60">
      {items.map(([cls, label]) => (
        <div key={label} className="flex items-center gap-1.5 text-[10px] font-mono text-muted">
          <span className={`w-2.5 h-2.5 ${cls}`} />
          {label}
        </div>
      ))}
    </div>
  )
}
