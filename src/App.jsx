import { useEffect, useMemo, useState } from 'react'
import AnimeGrid from './components/AnimeGrid'
import AnimePlayer from './components/AnimePlayer'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [genre, setGenre] = useState('')

  const fetchAnime = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (query) params.append('q', query)
      if (genre) params.append('genre', genre)
      const res = await fetch(`${baseUrl}/api/anime?${params.toString()}`)
      const data = await res.json()
      setItems(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnime()
  }, [])

  const genres = useMemo(() => {
    const g = new Set()
    items.forEach(it => (it.genres || []).forEach(gg => g.add(gg)))
    return ['All', ...Array.from(g)]
  }, [items])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen p-6">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <img src="/flame-icon.svg" alt="logo" className="w-10 h-10" />
            <div>
              <h1 className="text-white text-2xl font-bold">Anime TV (Hindi)</h1>
              <p className="text-blue-200/80 text-sm">Browse and watch Hindi-dubbed anime</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchAnime()}
              placeholder="Search anime..."
              className="flex-1 sm:w-64 px-3 py-2 rounded-lg bg-slate-800/60 border border-blue-500/20 text-white placeholder:text-blue-200/50 focus:outline-none"
            />
            <select
              value={genre}
              onChange={(e) => { const val = e.target.value === 'All' ? '' : e.target.value; setGenre(val); setTimeout(fetchAnime, 0) }}
              className="px-3 py-2 rounded-lg bg-slate-800/60 border border-blue-500/20 text-white focus:outline-none"
            >
              {genres.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <button onClick={fetchAnime} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg">Search</button>
          </div>
        </header>

        {!selected ? (
          <main>
            {loading ? (
              <p className="text-blue-200/80">Loading...</p>
            ) : items.length ? (
              <AnimeGrid items={items} onSelect={setSelected} />
            ) : (
              <div className="text-blue-200/80">
                <p>No anime found. Click the button below to add sample content.</p>
                <button
                  onClick={async () => { await fetch(`${baseUrl}/api/seed`, { method: 'POST' }); fetchAnime(); }}
                  className="mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg"
                >
                  Add Sample Hindi Anime
                </button>
              </div>
            )}
          </main>
        ) : (
          <AnimePlayer anime={selected} onBack={() => setSelected(null)} />
        )}
      </div>
    </div>
  )
}

export default App
