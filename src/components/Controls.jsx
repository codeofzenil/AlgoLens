export default function Controls({ player }) {
  const { index, total, isPlaying, play, pause, next, prev, restart, speed, setSpeed, atEnd } = player

  const btn =
    'w-10 h-10 flex items-center justify-center border border-ink-600 bg-ink-800 text-paper hover:border-phosphor-500 hover:text-phosphor-500 transition-colors focus-ring disabled:opacity-30 disabled:hover:border-ink-600 disabled:hover:text-paper'

  return (
    <div className="border border-ink-700 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button className={btn} onClick={restart} aria-label="Restart" title="Restart">
            ↺
          </button>
          <button className={btn} onClick={prev} disabled={index === 0} aria-label="Previous step" title="Previous step">
            ◀
          </button>
          {isPlaying ? (
            <button
              className={`${btn} !border-phosphor-500 !text-phosphor-500`}
              onClick={pause}
              aria-label="Pause"
              title="Pause"
            >
              ❚❚
            </button>
          ) : (
            <button className={btn} onClick={play} aria-label="Play" title="Play">
              ▶
            </button>
          )}
          <button className={btn} onClick={next} disabled={atEnd} aria-label="Next step" title="Next step">
            ▶|
          </button>
        </div>

        <div className="flex items-center gap-3 flex-1 max-w-[220px]">
          <span className="text-xs text-muted shrink-0">Speed</span>
          <input
            type="range"
            min="1"
            max="5"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full accent-phosphor-500"
            aria-label="Playback speed"
          />
        </div>

        <div className="font-mono text-sm text-muted shrink-0 tabular-nums">
          {total > 0 ? index + 1 : 0} / {total}
        </div>
      </div>

      <div className="mt-3 h-1 bg-ink-700 w-full">
        <div
          className="h-1 bg-phosphor-500 transition-all"
          style={{ width: total > 1 ? `${(index / (total - 1)) * 100}%` : '0%' }}
        />
      </div>
    </div>
  )
}
