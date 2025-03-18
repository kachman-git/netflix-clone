"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Movie } from './tmdb'

type MyListContextType = {
  myList: Movie[]
  addToMyList: (movie: Movie) => void
  removeFromMyList: (movieId: number) => void
  isInMyList: (movieId: number) => boolean
}

const MyListContext = createContext<MyListContextType | undefined>(undefined)

export function MyListProvider({ children }: { children: React.ReactNode }) {
  const [myList, setMyList] = useState<Movie[]>([])

  useEffect(() => {
    const savedList = localStorage.getItem('myList')
    if (savedList) {
      setMyList(JSON.parse(savedList))
    }
  }, [])

  const addToMyList = (movie: Movie) => {
    setMyList((prevList) => {
      const newList = [...prevList, movie]
      localStorage.setItem('myList', JSON.stringify(newList))
      return newList
    })
  }

  const removeFromMyList = (movieId: number) => {
    setMyList((prevList) => {
      const newList = prevList.filter((m) => m.id !== movieId)
      localStorage.setItem('myList', JSON.stringify(newList))
      return newList
    })
  }

  const isInMyList = (movieId: number) => {
    return myList.some((m) => m.id === movieId)
  }

  return (
    <MyListContext.Provider value={{ myList, addToMyList, removeFromMyList, isInMyList }}>
      {children}
    </MyListContext.Provider>
  )
}

export function useMyList() {
  const context = useContext(MyListContext)
  if (context === undefined) {
    throw new Error('useMyList must be used within a MyListProvider')
  }
  return context
}

