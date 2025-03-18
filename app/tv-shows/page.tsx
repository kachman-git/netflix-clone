"use client"

import { useState } from 'react'
import { MediaGrid } from '@/components/media-grid'
import { GenreFilter } from '@/components/genre-filter'

export default function TVShowsPage() {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold">TV Shows</h1>
      <GenreFilter mediaType="tv" onGenreSelect={setSelectedGenre} />
      {selectedGenre ? (
        <section>
          <h2 className="text-2xl font-bold mb-6">TV Shows by Genre</h2>
          <MediaGrid type="genre" mediaType="tv" genreId={selectedGenre} />
        </section>
      ) : (
        <>
          <section>
            <h2 className="text-2xl font-bold mb-6">Trending TV Shows</h2>
            <MediaGrid type="trending" mediaType="tv" />
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-6">Popular TV Shows</h2>
            <MediaGrid type="popular" mediaType="tv" />
          </section>
        </>
      )}
    </div>
  )
}

