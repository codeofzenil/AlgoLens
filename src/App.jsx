import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Library from './pages/Library.jsx'
import Playground from './pages/Playground.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-body">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/algorithms" element={<Library />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <footer className="border-t border-ink-700 py-6">
        <div className="max-w-6xl mx-auto px-5 text-xs font-mono text-muted flex items-center justify-between">
          <span>AlgoLens — Web Technologies minor project</span>
          <span>V1.0</span>
        </div>
      </footer>
    </div>
  )
}
