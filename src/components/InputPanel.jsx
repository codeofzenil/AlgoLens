import { useState } from 'react'

const label = 'text-xs text-muted'
const fieldWrap = 'flex flex-col gap-1.5'
const textInput =
  'bg-ink-800 border border-ink-600 px-3 py-2 text-sm text-paper focus-ring focus:border-phosphor-500 outline-none'

function randomArray(n) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 90) + 5)
}

export default function InputPanel({ algorithm, onVisualize }) {
  const isSearch = algorithm.inputKind === 'array-target'
  const [mode, setMode] = useState('random')
  const [count, setCount] = useState(10)
  const [customArray, setCustomArray] = useState('8, 3, 6, 2, 9, 1')
  const [target, setTarget] = useState(9)
  const [error, setError] = useState('')

  const parseArray = () => {
    const parts = customArray
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map(Number)
    if (parts.length === 0 || parts.some(Number.isNaN)) {
      setError('Enter a comma-separated list of numbers, e.g. 8, 3, 6, 2')
      return null
    }
    if (parts.length > 40) {
      setError('Keep it to 40 elements or fewer for a readable visualization.')
      return null
    }
    setError('')
    return parts
  }

  const handleSubmit = () => {
    const arr = mode === 'random' ? randomArray(count) : parseArray()
    if (!arr) return
    onVisualize(isSearch ? { array: arr, target: Number(target) } : { array: arr })
  }

  return (
    <div className="border border-ink-700 bg-white p-5 flex flex-col gap-5">
      <div className="flex gap-2">
        {['random', 'custom'].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 px-3 py-2 text-sm border transition-colors focus-ring ${
              mode === m
                ? 'border-phosphor-500 text-phosphor-600 bg-phosphor-500/10'
                : 'border-ink-600 text-muted hover:border-ink-500'
            }`}
          >
            {m === 'random' ? 'Random array' : 'Custom array'}
          </button>
        ))}
      </div>

      {mode === 'random' ? (
        <div className={fieldWrap}>
          <label className={label}>elements: {count}</label>
          <input
            type="range"
            min="5"
            max="30"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="accent-phosphor-500"
          />
        </div>
      ) : (
        <div className={fieldWrap}>
          <label className={label}>array (comma-separated)</label>
          <input
            className={textInput}
            value={customArray}
            onChange={(e) => setCustomArray(e.target.value)}
            placeholder="8, 3, 6, 2, 9, 1"
          />
          {algorithm.requiresSorted && (
            <p className="text-[11px] text-muted">
              Binary search requires a sorted array — it will be sorted automatically.
            </p>
          )}
        </div>
      )}

      {isSearch && (
        <div className={fieldWrap}>
          <label className={label}>target value</label>
          <input
            type="number"
            className={textInput}
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        </div>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button
        onClick={handleSubmit}
        className="mt-1 bg-phosphor-500 text-white font-medium text-sm py-2.5 hover:bg-phosphor-600 transition-colors focus-ring"
      >
        Visualize
      </button>
    </div>
  )
}
