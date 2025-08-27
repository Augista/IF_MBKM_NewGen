"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Typography from "@/components/Typography"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
  const router = useRouter()

  const getRedirectPath = (role: string) => {
    switch (role) {
      case "mahasiswa":
        return "/" // StudentDashboard
      case "dosen":
        return "/" // LectureDashboard
      case "management":
        return "/" // ManagementDashboard
      default:
        return "/"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important: include cookies
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `Login failed: ${response.status}`)
      }

      if (data.success && data.user) {
        // Update auth context
        login(data.user.email, data.user.role, data.user.nama, data.user.id, data.user.nrp)

        // Small delay to ensure cookie is set
        await new Promise((resolve) => setTimeout(resolve, 100))

        // Redirect based on user role
        const redirectPath = getRedirectPath(data.user.role)
        router.push(redirectPath)
        router.refresh() // Force refresh to update auth state
      } else {
        throw new Error(data.error || "Login failed")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  // Quick login buttons for demo
  const quickLogin = (demoEmail: string) => {
    setEmail(demoEmail)
    setPassword("password123")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Typography variant="h4" weight="bold" className="text-center">
            Sign in to MBKM Dashboard
          </Typography>
          <Typography variant="bt" className="text-center text-gray-600 mt-2">
            Demo Mode - Database fallback enabled
          </Typography>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded border border-red-200">{error}</div>
          )}

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </div>

          <div className="text-center">
            <Typography variant="bt" className="text-gray-600 mb-3">
              Demo accounts (click to auto-fill):
            </Typography>
            <div className="space-y-2">
              <Button
                type="button"
                variant="primary-outline"
                size="sm"
                className="w-full"
                onClick={() => quickLogin("muammar@student.its.ac.id")}
              >
                Student: Muammar Bahalwan → Student Dashboard
              </Button>
              <Button
                type="button"
                variant="primary-outline"
                size="sm"
                className="w-full"
                onClick={() => quickLogin("bintang@its.ac.id")}
              >
                Lecturer: Dr. Bintang Nuralamsyah → Lecturer Dashboard
              </Button>
              <Button
                type="button"
                variant="primary-outline"
                size="sm"
                className="w-full"
                onClick={() => quickLogin("siti.aminah@its.ac.id")}
              >
                Management: Dr. Siti Aminah → Management Dashboard
              </Button>
            </div>
            <Typography variant="l2" className="text-gray-500 mt-2">
              Password: password123
            </Typography>
          </div>
        </form>
        <div className="text-center mt-4">
        <Typography variant="bt" className="text-gray-600">
          Belum punya akun?{" "}
          <a
            href="/register"
            className="text-blue-600 underline hover:text-blue-800 transition"
          >
            Daftar di sini
          </a>
        </Typography>
      </div>
      </div>
      
    </div>
  )
}
