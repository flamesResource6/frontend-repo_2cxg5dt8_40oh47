import React from 'react'

function AnimeCard({ anime, onSelect }) {
  return (
    <button onClick={() => onSelect(anime)} className="group text-left bg-slate-800/60 hover:bg-slate-800 border border-blue-500/10 hover:border-blue-500/30 rounded-2xl overflow-hidden transition-colors">
      {anime.cover_image && (
        <div className="relative w-full aspect-[3/4] overflow-hidden">
          <img src={anime.cover_image} alt={anime.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white font-semibold text-lg leading-tight line-clamp-2">{anime.title}</h3>
            {anime.genres?.length > 0 && (
              <p className="text-blue-200/80 text-xs mt-1">{anime.genres.join(' • ')}</p>
            )}
          </div>
        </div>
      )}
      {!anime.cover_image && (
        <div className="p-4">
          <h3 className="text-white font-semibold text-lg">{anime.title}</h3>
          {anime.description && <p className="text-blue-200/80 text-sm mt-1 line-clamp-3">{anime.description}</p>}
        </div>
      )}
    </button>
  )
}

export default AnimeCard
