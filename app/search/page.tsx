import { MediaGrid } from '@/components/media-grid'
import { searchMedia } from '@/lib/tmdb'
import { Suspense } from 'react'
import { MediaCard } from '@/components/media-card'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q
  const movies = await searchMedia(query, 'movie')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Search results for: {query}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.results.map((media) => (
          <MediaCard key={media.id} media={media} />
        ))}
      </div>
      {movies.results.length === 0 && (
        <p className="text-center text-muted-foreground">
          No movies found for &quot;{query}&quot;
        </p>
      )}
    </div>
  )
}

