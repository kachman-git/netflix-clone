"use client"

import { useState } from 'react'
import { HeroSection } from '@/components/hero-section'
import { MediaGrid } from '@/components/media-grid'
import { GenreFilter } from '@/components/genre-filter'

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)

  return (
    <div className="space-y-12">
      <HeroSection />
      <GenreFilter mediaType="movie" onGenreSelect={setSelectedGenre} />
      {selectedGenre ? (
        <section>
          <h2 className="text-2xl font-bold mb-6">Movies by Genre</h2>
          <MediaGrid type="genre" mediaType="movie" genreId={selectedGenre} />
        </section>
      ) : (
        <>
          <section>
            <h2 className="text-2xl font-bold mb-6">Trending This Week</h2>
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

