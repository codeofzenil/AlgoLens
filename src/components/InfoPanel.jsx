function Stat({ label, value }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-ink-700/60 last:border-0">
      <span className="text-xs text-muted">{label}</span>
      <span className="text-sm font-mono text-signal-600">{value}</span>
    </div>
  )
}

export default function InfoPanel({ algorithm, index, total, message, complete }) {
  return (
    <div className="border border-ink-700 bg-white p-4 flex flex-col gap-4 h-full">
      <div>
        <div className="text-xs text-muted mb-1">Algorithm</div>
        <div className="font-display text-lg font-semibold text-paper">{algorithm.name}</div>
      </div>

      <div>
        <div className="text-xs text-muted mb-1">Time complexity</div>
        <Stat label="best" value={algorithm.complexity.best} />
        <Stat label="average" value={algorithm.complexity.average} />
        <Stat label="worst" value={algorithm.complexity.worst} />
      </div>

      <div>
        <div className="text-xs text-muted mb-1">Space complexity</div>
        <Stat label="auxiliary" value={algorithm.complexity.space} />
      </div>

      <div>
        <div className="text-xs text-muted mb-1">Current step</div>
        <div className="text-sm font-mono text-phosphor-500 tabular-nums">
          {total > 0 ? index + 1 : 0} / {total}
        </div>
      </div>

      <div className="flex-1">
        <div className="text-xs text-muted mb-1">Operation</div>
        <p className="text-sm text-paper/90 leading-relaxed">{message}</p>
      </div>

      {complete && (
        <div className="border border-signal-500/40 bg-signal-500/10 text-signal-600 text-sm px-3 py-2">
          Algorithm complete
        </div>
      )}
    </div>
  )
}
