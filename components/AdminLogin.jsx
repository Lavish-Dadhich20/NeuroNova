"use client"

import { useState } from "react"

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    console.log("[v0] Client: Submitting login form")
    console.log("[v0] Client: Email:", email)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      console.log("[v0] Client: Response status:", response.status)
      const data = await response.json()
      console.log("[v0] Client: Response data:", data)

      if (data.success) {
        console.log("[v0] Client: Login successful, userType:", data.userType)
        if (data.userType === "customer") {
          sessionStorage.setItem("customerData", JSON.stringify(data.user))
        }
        onLogin(data.userType, data.user)
      } else {
        console.log("[v0] Client: Login failed:", data.message)
        setError(data.message || "Invalid Mail ID or Password")
      }
    } catch (error) {
      console.error("[v0] Client: Login error:", error)
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-2xl">💠</div>
            <span className="text-3xl font-bold text-foreground">NeuroNova</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Login Portal</h1>
          <p className="text-muted-foreground mt-2">Access your dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="bg-card rounded-2xl p-8 card-shadow border border-border space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Mail ID</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg smooth-transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login to Dashboard"}
          </button>

          <div className="text-center text-sm text-muted-foreground space-y-1">
            <p className="font-semibold text-foreground">Demo Credentials:</p>
            <p>Admin: admin@neuronova.com / admin123</p>
            <p>Customer: ravi.sharma@example.com / ravi123</p>
            <p className="text-xs mt-2">Run seed script to add all 10 test customers</p>
          </div>
        </form>
      </div>
    </div>
  )
}
