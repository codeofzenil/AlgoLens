import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ALGORITHMS, CATEGORIES } from '../data/algorithmMetadata.js'

export default function Library() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = ALGORITHMS.filter((a) => {
    const matchesQuery = a.name.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = activeCategory === 'all' || a.category === activeCategory
    return matchesQuery && matchesCategory
  })

  return (
    <div className="max-w-6xl mx-auto px-5 py-14">
      <div className="mb-8">
        <div className="text-sm text-muted mb-2">Algorithm library</div>
        <h1 className="font-display text-3xl text-paper mb-4">Every algorithm in AlgoLens</h1>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search algorithms..."
          className="w-full max-w-sm bg-ink-800 border border-ink-600 px-4 py-2.5 text-sm text-paper focus-ring focus:border-phosphor-500 outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {['all', ...Object.keys(CATEGORIES)].map((key) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-3 py-1.5 text-sm border transition-colors focus-ring ${
              activeCategory === key
                ? 'border-phosphor-500 text-phosphor-400 bg-phosphor-500/10'
                : 'border-ink-600 text-muted hover:border-ink-500'
            }`}
          >
            {key === 'all' ? 'All' : CATEGORIES[key].label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted text-sm">No algorithms match "{query}".</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((a) => (
            <div key={a.id} className="border border-ink-700 bg-ink-900/60 p-5 flex flex-col">
              <div className="text-xs font-medium text-signal-600 mb-2">
                {CATEGORIES[a.category].label}
              </div>
              <h3 className="font-display text-lg text-paper mb-2">{a.name}</h3>
              <p className="text-sm text-muted leading-relaxed mb-4 flex-1">{a.description}</p>
              <div className="flex items-center justify-between text-xs text-muted mb-4">
                <span>time: <span className="text-paper">{a.complexity.average}</span></span>
                <span>space: <span className="text-paper">{a.complexity.space}</span></span>
              </div>
              <Link
                to={`/playground?algo=${a.id}`}
                className="text-center px-4 py-2 border border-phosphor-500 text-phosphor-500 text-sm hover:bg-phosphor-500 hover:text-ink-950 transition-colors focus-ring"
              >
                Visualize
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
