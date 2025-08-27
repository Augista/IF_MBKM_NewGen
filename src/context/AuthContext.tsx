"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"


type User = {
  id: string
  email: string
  role: string
  nama: string
  nrp?: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, role: string, nama: string, id?: string, nrp?: string) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking auth status...")
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        })

        console.log("Auth check response:", response.status)

        if (response.ok) {
          const data = await response.json()
          console.log("Auth check successful:", data.user?.email)
          setUser(data.user)
        } else {
          console.log("Auth check failed, clearing user state")
          setUser(null)
        }
      } catch (error) {
        console.log("Auth check error:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = (email: string, role: string, nama: string, id?: string, nrp?: string) => {
    const newUser = { id: id || "", email, role, nama, nrp }
    console.log("Setting user in context:", newUser)
    setUser(newUser)
    setLoading(false)
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
    } catch (error) {
      console.log("Logout error:", error)
    } finally {
      setUser(null)
      router.push("/login")
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
