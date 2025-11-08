export function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount)
}

export const calculateEMI = (principal, rate, months) => {
  const monthlyRate = rate / 12 / 100
  const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, months)
  const denominator = Math.pow(1 + monthlyRate, months) - 1
  return Math.round(numerator / denominator)
}
