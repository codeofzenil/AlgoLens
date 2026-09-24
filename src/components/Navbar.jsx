import { NavLink, Link } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  `px-3 py-1.5 text-sm transition-colors focus-ring ${
    isActive ? 'text-phosphor-500 font-medium' : 'text-muted hover:text-paper'
  }`

export default function Navbar() {
  return (
    <header className="border-b border-ink-700 bg-white sticky top-0 z-20">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3.5">
        <Link to="/" className="font-display font-bold text-lg text-paper">
          AlgoLens
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/algorithms" className={linkClass}>
            Algorithms
          </NavLink>
          <NavLink to="/playground" className={linkClass}>
            Playground
          </NavLink>
          <Link
            to="/playground"
            className="ml-3 px-4 py-1.5 bg-phosphor-500 text-white text-sm font-medium hover:bg-phosphor-600 transition-colors focus-ring"
          >
            Start visualizing
          </Link>
        </nav>
      </div>
    </header>
  )
}
