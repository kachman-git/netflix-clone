const TMDB_API_KEY = process.env.TMDB_API_KEY
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

export type Media = {
  id: number
  title?: string
  name?: string
  poster_path: string
  backdrop_path: string
  overview: string
  release_date?: string
  first_air_date?: string
  vote_average: number
  media_type: 'movie' | 'tv'
}

export type MediaResponse = {
  results: Media[]
  page: number
  total_pages: number
  total_results: number
}

export type Genre = {
  id: number
  name: string
}

export async function getTrendingMedia(mediaType: 'movie' | 'tv'): Promise<MediaResponse> {
  const res = await fetch(
    `${TMDB_BASE_URL}/trending/${mediaType}/week?api_key=${TMDB_API_KEY}`
  )
  
  if (!res.ok) {
    throw new Error(`Failed to fetch trending ${mediaType}`)
  }

  return res.json()
}

export async function getPopularMedia(mediaType: 'movie' | 'tv'): Promise<MediaResponse> {
  const res = await fetch(
    `${TMDB_BASE_URL}/${mediaType}/popular?api_key=${TMDB_API_KEY}`
  )
  
  if (!res.ok) {
    throw new Error(`Failed to fetch popular ${mediaType}`)
  }

  return res.json()
}

export async function getMediaDetails(id: string, mediaType: 'movie' | 'tv'): Promise<Media> {
  const res = await fetch(
    `${TMDB_BASE_URL}/${mediaType}/${id}?api_key=${TMDB_API_KEY}`
  )
  
  if (!res.ok) {
    throw new Error(`Failed to fetch ${mediaType} details`)
  }

  return res.json()
}

export async function searchMedia(query: string, mediaType: 'movie' | 'tv'): Promise<MediaResponse> {
  const res = await fetch(
    `${TMDB_BASE_URL}/search/${mediaType}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
  )
  
  if (!res.ok) {
    throw new Error(`Failed to search ${mediaType}`)
  }

  return res.json()
}

export async function getGenres(mediaType: 'movie' | 'tv'): Promise<Genre[]> {
  const res = await fetch(
    `${TMDB_BASE_URL}/genre/${mediaType}/list?api_key=${TMDB_API_KEY}`
  )
  
  if (!res.ok) {
    throw new Error(`Failed to fetch ${mediaType} genres`)
  }

  const data = await res.json()
  return data.genres
}

export async function getMediaByGenre(genreId: number, mediaType: 'movie' | 'tv', page: number = 1): Promise<MediaResponse> {
  const res = await fetch(
    `${TMDB_BASE_URL}/discover/${mediaType}?api_key=${TMDB_API_KEY}&with_genres=${genreId}&page=${page}`
  )
  
  if (!res.ok) {
    throw new Error(`Failed to fetch ${mediaType} by genre`)
  }

  return res.json()
}

export async function getMediaVideos(mediaId: string, mediaType: 'movie' | 'tv'): Promise<{ key: string; site: string; type: string }[]> {
  const res = await fetch(
    `${TMDB_BASE_URL}/${mediaType}/${mediaId}/videos?api_key=${TMDB_API_KEY}`
  )
  
  if (!res.ok) {
    throw new Error(`Failed to fetch ${mediaType} videos`)
  }

  const data = await res.json()
  return data.results
}

