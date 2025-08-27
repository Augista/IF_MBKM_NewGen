"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Typography from "@/components/Typography"

export default function RegisterPage() {
  const [nama, setNama] = useState("")
  const [email, setEmail] = useState("")
  const [nrp, setNrp] = useState("")
  const [role, setRole] = useState("mahasiswa")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, email, nrp, role, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Pendaftaran gagal")
      }

      router.push("/") 
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "Pendaftaran gagal")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Typography variant="h4" weight="bold" className="text-center">
            Daftar Akun Baru
          </Typography>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="nama">Nama</Label>
            <Input id="nama" value={nama} onChange={(e) => setNama(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="nrp">NRP</Label>
            <Input id="nrp" value={nrp} onChange={(e) => setNrp(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-1 border rounded p-2"
            >
              <option value="mahasiswa">Mahasiswa</option>
              <option value="dosen">Dosen</option>
              <option value="management">Management</option>
            </select>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {error && <div className="text-red-600 text-sm text-center">{error}</div>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Mendaftarkan..." : "Daftar"}
          </Button>

          <div className="text-center mt-2">
            <Typography variant="bt" className="text-gray-600">
              Sudah punya akun?{" "}
              <a href="/login" className="text-blue-600 underline hover:text-blue-800 transition">
                Masuk di sini
              </a>
            </Typography>
          </div>
        </form>
      </div>
    </div>
  )
}
