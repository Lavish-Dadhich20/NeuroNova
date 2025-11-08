// Temporary in-memory customer database
// This works WITHOUT MongoDB setup - for immediate testing

const tempCustomers = [
  {
    id: "1",
    name: "Lavish Dadhich",
    email: "lavish.dadhich@example.com",
    password: "lavish@123",
    accountNumber: "ACC001112223",
    loanAmount: null,
    emi: null,
    tenure: null,
    loanStatus: "Not Applied",
    creditScore: 850,
    city: "Udaipur",
    phone: "+91 99777 55443",
    appliedDate: null,
  },
  {
    id: "2",
    name: "Yuvraj Singh",
    email: "yuvraj@example.com",
    password: "yuvraj@123",
    accountNumber: "ACC001234567",
    loanAmount: 500000,
    emi: 12500,
    tenure: 48,
    loanStatus: "Approved",
    creditScore: 780,
    city: "Mumbai",
    phone: "+91 98765 43210",
    appliedDate: "2024-01-15",
  },
  {
    id: "3",
    name: "Ravi Sharma",
    email: "ravi.sharma@example.com",
    password: "ravi123",
    accountNumber: "ACC001234568",
    loanAmount: 300000,
    emi: 7500,
    tenure: 36,
    loanStatus: "Approved",
    creditScore: 750,
    city: "Delhi",
    phone: "+91 98765 43211",
    appliedDate: "2024-01-20",
  },
  {
    id: "4",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    password: "priya123",
    accountNumber: "ACC001234569",
    loanAmount: 750000,
    emi: 18750,
    tenure: 60,
    loanStatus: "Processing",
    creditScore: 820,
    city: "Bangalore",
    phone: "+91 98765 43212",
    appliedDate: "2024-02-01",
  },
  {
    id: "5",
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    password: "amit123",
    accountNumber: "ACC001234570",
    loanAmount: 200000,
    emi: 5000,
    tenure: 24,
    loanStatus: "Rejected",
    creditScore: 650,
    city: "Pune",
    phone: "+91 98765 43213",
    appliedDate: "2024-02-10",
  },
]

export function updateCustomerStatus(id, newStatus) {
  const customerIndex = tempCustomers.findIndex((c) => c.id === id)
  if (customerIndex !== -1) {
    tempCustomers[customerIndex].loanStatus = newStatus
    return true
  }
  return false
}

export function getTempCustomers() {
  return tempCustomers
}

export { tempCustomers }
