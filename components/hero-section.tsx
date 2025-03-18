"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { getPopularMedia, Media } from '@/lib/tmdb'
import { Play, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function HeroSection() {
  const [featuredMedia, setFeaturedMedia] = useState<Media[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const fetchMedia = async () => {
      const { results: movies } = await getPopularMedia('movie')
      const { results: tvShows } = await getPopularMedia('tv')
      const moviesWithType = movies.map(movie => ({ ...movie, media_type: 'movie' }))
      const tvShowsWithType = tvShows.map(tvShow => ({ ...tvShow, media_type: 'tv' }))
      setFeaturedMedia([...moviesWithType, ...tvShowsWithType].slice(0, 5))
    }
    fetchMedia()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredMedia.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [featuredMedia])

  const currentMedia = featuredMedia[currentIndex]

  if (!currentMedia) return null

  return (
    <div className="relative h-[70vh] overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentMedia.id}
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '-100%' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${currentMedia.backdrop_path}`}
            alt={currentMedia.title || currentMedia.name || ""}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-background/0" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-0 left-0 p-8 space-y-4 max-w-2xl"
          >
            <h1 className="text-4xl font-bold">{currentMedia.title || currentMedia.name}</h1>
            <p className="text-lg line-clamp-3">{currentMedia.overview}</p>
            <div className="flex space-x-4">
              <Button onClick={() => router.push(`/${currentMedia.media_type}/${currentMedia.id}`)}>
                <Play className="mr-2 h-4 w-4" /> Play
              </Button>
              <Button variant="outline" onClick={() => router.push(`/${currentMedia.media_type}/${currentMedia.id}`)}>
                <Info className="mr-2 h-4 w-4" /> More Info
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

