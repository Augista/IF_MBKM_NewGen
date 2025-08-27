"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"

interface ApiResponse<T> {
  data: T
  error?: string
}

interface UseApiResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useApi<T>(url: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, loading: authLoading } = useAuth()

  const fetchData = async () => {
    if (typeof url !== "string") {
      console.error("❌ useApi: URL must be a string. Got:", url)
      setError("Invalid API URL")
      setLoading(false)
      return
    }

    if (authLoading || !user) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(url, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.status === 401) {
        setError("Authentication required")
        setData(null)
        return
      }

      const result: ApiResponse<T> = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "API request failed")
      }

      setData(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading) {
      fetchData()
    }
  }, [url, user, authLoading])

  return { data, loading, error, refetch: fetchData }
}
export function useApiMutation<T, P = any>() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mutate = async (
    url: string,
    options: RequestInit = {}
  ): Promise<T | null> => {
    try {
      setLoading(true)
      setError(null)

      const token = localStorage.getItem("token")
      const isFormData = options.body instanceof FormData

      const headers: HeadersInit = {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      }

      const response = await fetch(url, {
        ...options,
        headers,
        credentials: "include",
      })

      const result: ApiResponse<T> = await response.json()

      if (!response.ok) {
        const msg = result.error || "API request failed"
        throw new Error(msg)
      }

      return result.data
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error"
      setError(errorMessage)
      console.error("❌ useApiMutation error:", errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { mutate, loading, error }
}

