// Mock API utilities for NeuroNova

export const generateCreditScore = () => {
  return Math.floor(Math.random() * (850 - 650 + 1)) + 650
}

export const generateSanctionLetter = (customerData) => {
  const now = new Date()
  const content = `
NEURONOVA - LOAN SANCTION LETTER

Date: ${now.toLocaleDateString("en-IN")}
Reference: LOAN-${Date.now()}

SANCTION DETAILS
================
Loan Amount: ₹${customerData.loanAmount.toLocaleString("en-IN")}
Tenure: ${customerData.tenure} months
Interest Rate: ${customerData.interestRate}% p.a.
Monthly EMI: ₹${customerData.emi.toLocaleString("en-IN")}

DISBURSEMENT
============
The approved loan amount will be credited to your registered bank account within 24 hours of final documentation.

TERMS & CONDITIONS
==================
1. Loan is sanctioned subject to satisfactory KYC verification
2. Monthly EMI payment is mandatory
3. Prepayment is allowed without any penalty
4. The loan is subject to NeuroNova's standard terms and conditions

This letter is valid for 30 days from the date of issue.

Authorized By: NeuroNova AI System
  `
  return content
}

export const downloadSanctionLetter = (customerData) => {
  const content = generateSanctionLetter(customerData)
  const element = document.createElement("a")
  const file = new Blob([content], { type: "text/plain" })
  element.href = URL.createObjectURL(file)
  element.download = `neuronova-sanction-letter-${Date.now()}.txt`
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

export const validateKYC = (kycData) => {
  // Mock KYC validation
  return {
    success: Math.random() > 0.1, // 90% success rate
    message: "KYC validation in progress",
  }
}

export const performUnderwriting = (applicantData) => {
  // Mock underwriting process
  return new Promise((resolve) => {
    setTimeout(() => {
      const riskScore = Math.random() * 100
      const approved = riskScore > 30
      resolve({
        approved,
        riskScore: Math.round(riskScore),
        message: approved ? "Underwriting approved" : "Underwriting rejected",
      })
    }, 2000)
  })
}
