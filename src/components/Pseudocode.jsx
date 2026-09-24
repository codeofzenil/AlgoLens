export default function Pseudocode({ lines, activeLine }) {
  return (
    <div className="border border-ink-700 bg-white h-full flex flex-col">
      <div className="px-4 py-2 border-b border-ink-700 text-xs font-mono text-muted tracking-wide">
        pseudocode.txt
      </div>
      <pre className="p-4 font-mono text-sm leading-7 overflow-auto flex-1">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`px-2 -mx-2 whitespace-pre ${
              i === activeLine
                ? 'bg-phosphor-500/15 text-phosphor-700 border-l-2 border-phosphor-500'
                : 'text-muted border-l-2 border-transparent'
            }`}
          >
            {line}
          </div>
        ))}
      </pre>
    </div>
  )
}
