"use client"

import { useState } from "react"

export default function CustomerTable({ customers, onStatusChange }) {
  const [editingId, setEditingId] = useState(null)
  const [editingStatus, setEditingStatus] = useState("")

  const startEdit = (id, status) => {
    setEditingId(id)
    setEditingStatus(status)
  }

  const saveEdit = (id) => {
    onStatusChange(id, editingStatus)
    setEditingId(null)
  }

  return (
    <div className="bg-card rounded-2xl p-6 card-shadow border border-border overflow-x-auto">
      <h2 className="text-lg font-bold text-foreground mb-6">Loan Applications</h2>

      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-4 px-4 font-semibold text-foreground">Account Number</th>
            <th className="text-left py-4 px-4 font-semibold text-foreground">Name</th>
            <th className="text-left py-4 px-4 font-semibold text-foreground">Email</th>
            <th className="text-left py-4 px-4 font-semibold text-foreground">City</th>
            <th className="text-left py-4 px-4 font-semibold text-foreground">Credit Score</th>
            <th className="text-left py-4 px-4 font-semibold text-foreground">Loan Amount</th>
            <th className="text-left py-4 px-4 font-semibold text-foreground">EMI</th>
            <th className="text-left py-4 px-4 font-semibold text-foreground">Status</th>
            <th className="text-left py-4 px-4 font-semibold text-foreground">Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-b border-border hover:bg-muted/50 smooth-transition">
              <td className="py-4 px-4 text-foreground font-mono text-sm">{customer.accountNumber}</td>
              <td className="py-4 px-4 text-foreground">{customer.name}</td>
              <td className="py-4 px-4 text-foreground text-sm">{customer.email}</td>
              <td className="py-4 px-4 text-foreground">{customer.city}</td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold ${
                      customer.creditScore >= 750
                        ? "bg-green-600"
                        : customer.creditScore >= 650
                          ? "bg-yellow-600"
                          : "bg-red-600"
                    }`}
                  >
                    {customer.creditScore}
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 text-foreground">₹{customer.loanAmount?.toLocaleString("en-IN")}</td>
              <td className="py-4 px-4 text-foreground">₹{customer.emi?.toLocaleString("en-IN")}</td>
              <td className="py-4 px-4">
                {editingId === customer.id ? (
                  <select
                    value={editingStatus}
                    onChange={(e) => setEditingStatus(e.target.value)}
                    className="bg-input border border-border rounded-lg px-2 py-1 text-foreground text-sm"
                  >
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                ) : (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      customer.loanStatus === "Approved"
                        ? "bg-green-100 text-green-800"
                        : customer.loanStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {customer.loanStatus}
                  </span>
                )}
              </td>
              <td className="py-4 px-4">
                {editingId === customer.id ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(customer.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm font-semibold hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(customer.id)}
                      className="px-3 py-1 bg-gray-400 text-white rounded text-sm font-semibold hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEdit(customer.id, customer.loanStatus)}
                    className="px-3 py-1 bg-primary text-white rounded text-sm font-semibold hover:bg-primary/80"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {customers.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No customers found. Please add customers to MongoDB.
        </div>
      )}
    </div>
  )
}
