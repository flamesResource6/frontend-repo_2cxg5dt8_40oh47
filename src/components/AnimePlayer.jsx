import React from 'react'

function AnimePlayer({ anime, onBack }) {
  const firstEpisode = anime.episodes?.[0]
  return (
    <div className="w-full">
      <button onClick={onBack} className="mb-4 text-blue-300 hover:text-white transition-colors">← Back</button>
      <div className="bg-slate-800/60 border border-blue-500/10 rounded-2xl p-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            {firstEpisode?.video_url ? (
              <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={firstEpisode.video_url}
                  title={firstEpisode.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="w-full aspect-video bg-slate-900 rounded-lg flex items-center justify-center text-blue-200/60">
                No video available
              </div>
            )}
            <h2 className="text-white text-2xl font-semibold mt-4">{anime.title}</h2>
            {firstEpisode && (
              <p className="text-blue-200/80">Ep {firstEpisode.number}: {firstEpisode.title}</p>
            )}
          </div>
          <div className="w-full lg:w-80">
            <h3 className="text-white font-semibold mb-2">Episodes</h3>
            <div className="space-y-2 max-h-80 overflow-auto pr-2">
              {anime.episodes?.length ? anime.episodes.map((ep) => (
                <div key={ep.number} className="bg-slate-900/60 rounded-lg p-3 border border-blue-500/10">
                  <p className="text-white text-sm">Episode {ep.number}: {ep.title}</p>
                  {ep.language && (
                    <p className="text-blue-200/60 text-xs">Language: {ep.language}</p>
                  )}
                </div>
              )) : (
                <p className="text-blue-200/60 text-sm">No episodes yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimePlayer
