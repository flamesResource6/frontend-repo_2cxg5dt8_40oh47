import React from 'react'
import AnimeCard from './AnimeCard'

function AnimeGrid({ items, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map(anime => (
        <AnimeCard key={anime._id} anime={anime} onSelect={onSelect} />
      ))}
    </div>
  )
}

export default AnimeGrid
