import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ALGORITHMS, CATEGORIES, getAlgorithm } from '../data/algorithmMetadata.js'
import InputPanel from '../components/InputPanel.jsx'
import Controls from '../components/Controls.jsx'
import Pseudocode from '../components/Pseudocode.jsx'
import InfoPanel from '../components/InfoPanel.jsx'
import SortVisualizer from '../components/SortVisualizer.jsx'
import SearchVisualizer from '../components/SearchVisualizer.jsx'
import { useStepPlayer } from '../hooks/useStepPlayer.js'

export default function Playground() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialAlgo = searchParams.get('algo')
  const [category, setCategory] = useState(getAlgorithm(initialAlgo)?.category ?? 'sorting')
  const [algorithmId, setAlgorithmId] = useState(
    initialAlgo && getAlgorithm(initialAlgo) ? initialAlgo : 'bubble-sort',
  )
  const [run, setRun] = useState(null) // { steps, target }

  const algorithm = getAlgorithm(algorithmId)
  const player = useStepPlayer(run?.steps ?? [])
  const isSearch = algorithm.inputKind === 'array-target'

  useEffect(() => setRun(null), [algorithmId])

  const handleCategoryChange = (cat) => {
    const first = ALGORITHMS.find((a) => a.category === cat)
    setCategory(cat)
    setAlgorithmId(first.id)
    setSearchParams({ algo: first.id })
  }

  const handleAlgorithmChange = (id) => {
    setAlgorithmId(id)
    setSearchParams({ algo: id })
  }

  const handleVisualize = (input) => {
    if (isSearch) {
      setRun({ steps: algorithm.run(input.array, input.target), target: input.target })
    } else {
      setRun({ steps: algorithm.run(input.array), target: null })
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <div className="mb-6">
        <div className="text-sm text-muted mb-2">Algorithm playground</div>
        <h1 className="font-display text-3xl text-paper">Configure, then visualize</h1>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        <div className="flex flex-col gap-5">
          <div className="border border-ink-700 bg-white p-5">
            <label className="text-xs text-muted block mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full bg-ink-800 border border-ink-600 px-3 py-2 text-sm text-paper focus-ring focus:border-phosphor-500 outline-none mb-4"
            >
              {Object.entries(CATEGORIES).map(([key, c]) => (
                <option key={key} value={key}>
                  {c.label}
                </option>
              ))}
            </select>

            <label className="text-xs text-muted block mb-2">Algorithm</label>
            <select
              value={algorithmId}
              onChange={(e) => handleAlgorithmChange(e.target.value)}
              className="w-full bg-ink-800 border border-ink-600 px-3 py-2 text-sm text-paper focus-ring focus:border-phosphor-500 outline-none"
            >
              {ALGORITHMS.filter((a) => a.category === category).map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <InputPanel key={algorithmId} algorithm={algorithm} onVisualize={handleVisualize} />

          <div className="border border-ink-700 bg-white p-5">
            <div className="text-xs text-muted mb-3">How it works</div>
            <ol className="space-y-2">
              {algorithm.howItWorks.map((step, i) => (
                <li key={i} className="text-xs text-paper/80 leading-relaxed flex gap-2">
                  <span className="text-phosphor-500 font-mono shrink-0">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {!run ? (
            <EmptyState />
          ) : (
            <>
              <div className="border border-ink-700 bg-white p-5 min-h-[340px]">
                {isSearch ? (
                  <SearchVisualizer step={player.step} target={run.target} />
                ) : (
                  <SortVisualizer step={player.step} />
                )}
              </div>

              <Controls player={player} />

              <div className="grid md:grid-cols-[1fr_260px] gap-5 min-h-[260px]">
                <Pseudocode lines={algorithm.pseudocode} activeLine={player.step?.line} />
                <InfoPanel
                  algorithm={algorithm}
                  index={player.index}
                  total={player.total}
                  message={player.step?.message ?? ''}
                  complete={player.atEnd}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="border border-dashed border-ink-600 bg-ink-900/40 flex-1 min-h-[420px] flex flex-col items-center justify-center text-center px-8">
      <div className="w-12 h-12 border border-ink-600 flex items-center justify-center font-mono text-phosphor-500 mb-4">
        ▶
      </div>
      <p className="text-sm text-muted max-w-xs">
        Configure the input on the left, then click <span className="text-paper">Visualize</span> to
        generate the step-by-step execution.
      </p>
    </div>
  )
}
