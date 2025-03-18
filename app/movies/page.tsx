"use client"

import { useState } from 'react'
import { MediaGrid } from '@/components/media-grid'
import { GenreFilter } from '@/components/genre-filter'

export default function MoviesPage() {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold">Movies</h1>
      <GenreFilter mediaType="movie" onGenreSelect={setSelectedGenre} />
      {selectedGenre ? (
        <section>
          <h2 className="text-2xl font-bold mb-6">Movies by Genre</h2>
          <MediaGrid type="genre" mediaType="movie" genreId={selectedGenre} />
        </section>
      ) : (
        <>
          <section>
            <h2 className="text-2xl font-bold mb-6">Trending Movies</h2>
            <MediaGrid type="trending" mediaType="movie" />
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-6">Popular Movies</h2>
            <MediaGrid type="popular" mediaType="movie" />
          </section>
        </>
      )}
    </div>
  )
}

