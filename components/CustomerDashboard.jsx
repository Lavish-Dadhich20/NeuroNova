"use client"

import { useState } from "react"
import { Download, LogOut, CreditCard, TrendingUp, Calendar, Phone, Mail, MapPin } from "lucide-react"
import ChatBot from "@/components/ChatBot"

export default function CustomerDashboard({ customer, onLogout }) {
  const [showChat, setShowChat] = useState(false)

  const handleDownloadStatement = () => {
    const statement = `
NEURONOVA NBFC - LOAN STATEMENT
================================

Customer Details:
-----------------
Name: ${customer.name}
Account Number: ${customer.accountNumber}
Email: ${customer.email}
Phone: ${customer.phone}
City: ${customer.city}

Loan Details:
-------------
Loan Amount: ₹${customer.loanAmount?.toLocaleString("en-IN") || "Not Applied"}
EMI: ₹${customer.emi?.toLocaleString("en-IN") || "N/A"}/month
Tenure: ${customer.tenure || "N/A"} months
Credit Score: ${customer.creditScore}
Loan Status: ${customer.loanStatus}

Generated on: ${new Date().toLocaleDateString("en-IN")}
`
    const blob = new Blob([statement], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `statement-${customer.accountNumber}.txt`
    a.click()
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-xl">💠</div>
              <div>
                <h1 className="text-xl font-bold text-foreground">NeuroNova</h1>
                <p className="text-xs text-muted-foreground">Customer Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-foreground">{customer.name}</p>
                <p className="text-xs text-muted-foreground">{customer.accountNumber}</p>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 smooth-transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back, {customer.name}!</h2>
          <p className="text-muted-foreground">Here's your loan overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-2xl p-6 card-shadow border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-indigo-600" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Loan Amount</p>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {customer.loanAmount ? `₹${customer.loanAmount.toLocaleString("en-IN")}` : "Not Applied"}
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 card-shadow border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Monthly EMI</p>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {customer.emi ? `₹${customer.emi.toLocaleString("en-IN")}` : "N/A"}
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 card-shadow border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Tenure</p>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {customer.tenure ? `${customer.tenure} Months` : "N/A"}
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 card-shadow border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Credit Score</p>
            </div>
            <p className="text-2xl font-bold text-foreground">{customer.creditScore}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Loan Status */}
          <div className="lg:col-span-2 bg-card rounded-2xl p-6 card-shadow border border-border">
            <h3 className="text-xl font-bold text-foreground mb-6">Loan Status</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Account Number</p>
                  <p className="font-semibold text-foreground">{customer.accountNumber}</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Current Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-1 ${
                      customer.loanStatus === "Approved"
                        ? "bg-green-100 text-green-800"
                        : customer.loanStatus === "Pending" || customer.loanStatus === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : customer.loanStatus === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {customer.loanStatus}
                  </span>
                </div>
              </div>

              {customer.loanAmount && customer.emi && customer.tenure && (
                <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Payable</p>
                    <p className="font-semibold text-foreground">
                      ₹{(customer.emi * customer.tenure).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={handleDownloadStatement}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg smooth-transition"
              >
                <Download className="w-5 h-5" />
                Download Statement
              </button>
            </div>
          </div>

          {/* Personal Details */}
          <div className="bg-card rounded-2xl p-6 card-shadow border border-border">
            <h3 className="text-xl font-bold text-foreground mb-6">Contact Details</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground break-all">{customer.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium text-foreground">{customer.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">City</p>
                  <p className="text-sm font-medium text-foreground">{customer.city}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChatBot isOpen={showChat} onClose={() => setShowChat(false)} context={null} userEmail={customer.email} />

      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl smooth-transition text-2xl z-50"
        >
          💬
        </button>
      )}
    </div>
  )
}
