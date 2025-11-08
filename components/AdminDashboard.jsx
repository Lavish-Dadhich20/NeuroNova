"use client"

import { useState, useMemo, useEffect } from "react"
import AdminHeader from "./AdminHeader"
import CustomerTable from "./CustomerTable"
import DashboardStats from "./DashboardStats"

export default function AdminDashboard({ adminName, onLogout }) {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterCity, setFilterCity] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [sortBy, setSortBy] = useState("name")

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/customers")
      const data = await response.json()

      if (data.success) {
        setCustomers(data.customers)
      }
    } catch (error) {
      console.error("[v0] Fetch customers error:", error)
    } finally {
      setLoading(false)
    }
  }

  // Filter and sort customers
  const filteredCustomers = useMemo(() => {
    let filtered = [...customers]

    if (filterCity) {
      filtered = filtered.filter((c) => c.city.toLowerCase().includes(filterCity.toLowerCase()))
    }

    if (filterStatus) {
      filtered = filtered.filter((c) => c.loanStatus === filterStatus)
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "creditScore":
          return b.creditScore - a.creditScore
        case "city":
          return a.city.localeCompare(b.city)
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [customers, filterCity, filterStatus, sortBy])

  const handleStatusChange = async (id, newStatus) => {
    try {
      console.log("[v0] Updating customer status:", { id, newStatus })

      const response = await fetch(`/api/customers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loanStatus: newStatus }),
      })

      console.log("[v0] Update response status:", response.status)
      const result = await response.json()
      console.log("[v0] Update response:", result)

      if (response.ok) {
        setCustomers(customers.map((c) => (c.id === id ? { ...c, loanStatus: newStatus } : c)))
        fetchCustomers()
      } else {
        console.error("[v0] Update failed:", result.message)
        alert(`Failed to update: ${result.message}`)
      }
    } catch (error) {
      console.error("[v0] Update status error:", error)
      alert(`Error updating status: ${error.message}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader adminName={adminName} onLogout={onLogout} />

      <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8">
        {/* Dashboard Stats */}
        <DashboardStats customers={customers} />

        {/* Filters */}
        <div className="bg-card rounded-2xl p-6 card-shadow border border-border mb-8 mt-8">
          <h2 className="text-lg font-bold text-foreground mb-6">Filters & Search</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Filter by City</label>
              <input
                type="text"
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                placeholder="Enter city name..."
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="name">Name</option>
                <option value="creditScore">Credit Score</option>
                <option value="city">City</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Results</label>
              <div className="bg-primary/10 border border-primary/20 rounded-lg px-3 py-2 text-foreground font-semibold">
                {filteredCustomers.length} customers
              </div>
            </div>
          </div>
        </div>

        {/* Customers Table */}
        <CustomerTable customers={filteredCustomers} onStatusChange={handleStatusChange} />
      </main>
    </div>
  )
}
