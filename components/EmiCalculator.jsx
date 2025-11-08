"use client"

import { useState, useEffect } from "react"

export default function EmiCalculator({ onApply }) {
  const [loanAmount, setLoanAmount] = useState(100000)
  const [tenure, setTenure] = useState(12)
  const [interestRate, setInterestRate] = useState(12)
  const [emi, setEmi] = useState(0)

  useEffect(() => {
    // EMI Calculation: EMI = [P * R * (1+R)^N] / [(1+R)^N - 1]
    const monthlyRate = interestRate / 12 / 100
    const numerator = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)
    const denominator = Math.pow(1 + monthlyRate, tenure) - 1
    const calculatedEmi = Math.round(numerator / denominator)
    setEmi(calculatedEmi)
  }, [loanAmount, tenure, interestRate])

  const totalAmount = Math.round(emi * tenure)
  const totalInterest = totalAmount - loanAmount

  return (
    <section id="calculator" className="py-12 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">EMI Calculator</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-card rounded-2xl p-8 card-shadow border border-border">
            <div className="space-y-6">
              {/* Loan Amount */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Loan Amount (₹)</label>
                <input
                  type="range"
                  min="50000"
                  max="1000000"
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between items-center mt-3">
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="bg-input border border-border rounded-lg px-3 py-2 w-24 text-foreground"
                  />
                  <span className="text-lg font-semibold text-primary">₹ {loanAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Tenure (months)</label>
                <input
                  type="range"
                  min="6"
                  max="60"
                  step="1"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between items-center mt-3">
                  <input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="bg-input border border-border rounded-lg px-3 py-2 w-24 text-foreground"
                  />
                  <span className="text-lg font-semibold text-primary">{tenure} months</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Interest Rate (%)</label>
                <input
                  type="range"
                  min="6"
                  max="20"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between items-center mt-3">
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="bg-input border border-border rounded-lg px-3 py-2 w-24 text-foreground"
                    step="0.1"
                  />
                  <span className="text-lg font-semibold text-primary">{interestRate}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* EMI Details */}
          <div className="space-y-6">
            <div className="gradient-primary rounded-2xl p-8 text-white card-shadow">
              <p className="text-sm font-medium opacity-90 mb-2">Monthly EMI</p>
              <p className="text-5xl font-bold mb-2">₹ {emi.toLocaleString("en-IN")}</p>
              <p className="text-sm opacity-75">Calculated EMI amount</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card rounded-2xl p-6 card-shadow border border-border">
                <p className="text-sm font-medium text-muted-foreground mb-2">Total Amount</p>
                <p className="text-2xl font-bold text-foreground">₹ {totalAmount.toLocaleString("en-IN")}</p>
              </div>
              <div className="bg-card rounded-2xl p-6 card-shadow border border-border">
                <p className="text-sm font-medium text-muted-foreground mb-2">Total Interest</p>
                <p className="text-2xl font-bold text-primary">₹ {totalInterest.toLocaleString("en-IN")}</p>
              </div>
            </div>

            <button
              onClick={() => onApply({ loanAmount, tenure, interestRate, emi })}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg smooth-transition text-lg"
            >
              Apply for this Loan
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
