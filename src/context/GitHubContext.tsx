'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export interface Contributor {
  login: string
  avatar_url: string
  html_url: string
}

export interface GitHubData {
  stars: number
  forks: number
  contributorsCount: number
  contributors: Contributor[]
}

interface GitHubContextType {
  data: GitHubData | null
  loading: boolean
  error: boolean
}

const GitHubContext = createContext<GitHubContextType>({
  data: null,
  loading: true,
  error: false,
})

export function GitHubProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    async function fetchData() {
      try {
        const res = await fetch('/api/github')
        if (!res.ok) {
          throw new Error('Failed to fetch')
        }
        const json = await res.json()
        if (active) {
          setData(json)
          setLoading(false)
        }
      } catch (err) {
        console.error('Error fetching GitHub data in client:', err)
        if (active) {
          setError(true)
          setLoading(false)
        }
      }
    }
    fetchData()
    return () => {
      active = false
    }
  }, [])

  return (
    <GitHubContext.Provider value={{ data, loading, error }}>
      {children}
    </GitHubContext.Provider>
  )
}

export function useGitHub() {
  return useContext(GitHubContext)
}
