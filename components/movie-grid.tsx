"use client"

import { useState, useEffect } from "react"
import { MovieCard } from "./movie-card"
import { getTrendingMovies, getPopularMovies, getMoviesByGenre } from "@/lib/tmdb"
import type { Movie } from "@/lib/tmdb"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"

interface MovieGridProps {
  type: "trending" | "popular" | "genre"
  genreId?: number
}

export function MovieGrid({ type, genreId }: MovieGridProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const { ref, inView } = useInView()

  const loadMovies = async () => {
    let newMovies: Movie[] = []
    switch (type) {
      case "trending":
        newMovies = (await getTrendingMovies()).results
        break
      case "popular":
        newMovies = (await getPopularMovies()).results
        break
      case "genre":
        if (genreId) {
          newMovies = (await getMoviesByGenre(genreId, page)).results
        }
        break
    }
    setMovies((prevMovies) => {
      const uniqueMovies = newMovies.filter(
        (newMovie) => !prevMovies.some((prevMovie) => prevMovie.id === newMovie.id)
      )
      if (uniqueMovies.length === 0) setHasMore(false)
      return [...prevMovies, ...uniqueMovies]
    })
    setPage((prevPage) => prevPage + 1)
  }

  useEffect(() => {
    setMovies([])
    setPage(1)
    setHasMore(true)
    loadMovies()
  }, [type, genreId])

  useEffect(() => {
    if (inView && hasMore) {
      loadMovies()
    }
  }, [inView])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie, index) => (
          <MovieCard key={`${movie.id}-${index}`} movie={movie} />
        ))}
      </div>
      {hasMore && (
        <div ref={ref} className="flex justify-center">
          <Button onClick={loadMovies}>Load More</Button>
        </div>
      )}
    </div>
  )
}

