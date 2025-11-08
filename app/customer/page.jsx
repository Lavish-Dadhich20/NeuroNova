"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import CustomerDashboard from "@/components/CustomerDashboard"

function CustomerPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const customerId = searchParams.get("id")
  const [customerData, setCustomerData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!customerId) {
      router.push("/admin")
      return
    }

    // Get customer data from sessionStorage (set during login)
    const storedData = sessionStorage.getItem("customerData")
    if (storedData) {
      setCustomerData(JSON.parse(storedData))
      setLoading(false)
    } else {
      router.push("/admin")
    }
  }, [customerId, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {customerData && (
        <CustomerDashboard
          customer={customerData}
          onLogout={() => {
            sessionStorage.removeItem("customerData")
            router.push("/admin")
          }}
        />
      )}
    </main>
  )
}

export default function CustomerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      }
    >
      <CustomerPageContent />
    </Suspense>
  )
}
