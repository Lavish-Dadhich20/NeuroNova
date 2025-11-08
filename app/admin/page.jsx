"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AdminLogin from "@/components/AdminLogin"
import AdminDashboard from "@/components/AdminDashboard"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminName, setAdminName] = useState("")
  const router = useRouter()

  const handleLogin = (userType, user) => {
    if (userType === "admin") {
      setIsAuthenticated(true)
      setAdminName(user.name)
    } else if (userType === "customer") {
      // Redirect to customer dashboard
      router.push(`/customer?id=${user.id}`)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {!isAuthenticated ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <AdminDashboard
          adminName={adminName}
          onLogout={() => {
            setIsAuthenticated(false)
            setAdminName("")
          }}
        />
      )}
    </main>
  )
}
