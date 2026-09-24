import { Link } from 'react-router-dom'
import { CATEGORIES, algorithmsByCategory } from '../data/algorithmMetadata.js'

export default function Home() {
  return (
    <div>
      <section className="border-b border-ink-700">
        <div className="max-w-6xl mx-auto px-5 py-20">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-paper max-w-2xl leading-tight">
            See algorithms think.
          </h1>
          <p className="mt-5 max-w-xl text-muted text-base leading-relaxed">
            AlgoLens visualizes sorting and searching algorithms one step at a
            time, with the pseudocode and time/space complexity shown right
            next to the visualization.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/playground"
              className="px-5 py-2.5 bg-phosphor-500 text-white font-medium hover:bg-phosphor-600 transition-colors focus-ring"
            >
              Open the playground
            </Link>
            <Link
              to="/algorithms"
              className="px-5 py-2.5 border border-ink-600 text-paper hover:border-phosphor-500 hover:text-phosphor-500 transition-colors focus-ring"
            >
              Browse algorithms
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-14">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              title: 'Step by step',
              body: 'Every algorithm is broken down into individual comparisons and swaps — move forward and backward through each one.',
            },
            {
              title: 'Pseudocode that follows along',
              body: 'The pseudocode panel highlights the exact line that\u2019s currently running.',
            },
            {
              title: 'Complexity at a glance',
              body: 'Best, average and worst-case time complexity, plus space complexity, shown alongside the visualization.',
            },
          ].map((f) => (
            <div key={f.title} className="border border-ink-700 bg-white p-5">
              <h3 className="font-display text-base font-semibold text-paper mb-2">{f.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-20">
        <h2 className="font-display text-xl font-semibold text-paper mb-5">Explore algorithms</h2>
        <div className="grid md:grid-cols-2 gap-5 max-w-2xl">
          {Object.entries(CATEGORIES).map(([key, cat]) => {
            const items = algorithmsByCategory(key)
            return (
              <div key={key} className="border border-ink-700 bg-white p-5">
                <div className="text-sm font-semibold text-paper mb-3">{cat.label}</div>
                <ul className="space-y-1.5 mb-3">
                  {items.map((a) => (
                    <li key={a.id}>
                      <Link
                        to={`/playground?algo=${a.id}`}
                        className="text-sm text-muted hover:text-phosphor-500 transition-colors"
                      >
                        {a.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/algorithms"
                  className="text-xs text-phosphor-500 hover:underline"
                >
                  view all {cat.label.toLowerCase()}
                </Link>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
