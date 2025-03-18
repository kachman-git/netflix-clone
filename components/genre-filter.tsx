"use client"

import { useState, useEffect } from "react"
import { getGenres, Genre } from "@/lib/tmdb"
import { Button } from "@/components/ui/button"

interface GenreFilterProps {
  mediaType: 'movie' | 'tv'
  onGenreSelect: (genreId: number | null) => void
}

export function GenreFilter({ mediaType, onGenreSelect }: GenreFilterProps) {
  const [genres, setGenres] = useState<Genre[]>([])
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)

  useEffect(() => {
    getGenres(mediaType).then(setGenres)
  }, [mediaType])

  const handleGenreClick = (genreId: number) => {
    const newSelectedGenre = selectedGenre === genreId ? null : genreId
    setSelectedGenre(newSelectedGenre)
    onGenreSelect(newSelectedGenre)
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {genres.map((genre) => (
        <Button
          key={genre.id}
          variant={selectedGenre === genre.id ? "default" : "outline"}
          onClick={() => handleGenreClick(genre.id)}
        >
          {genre.name}
        </Button>
      ))}
    </div>
  )
}

