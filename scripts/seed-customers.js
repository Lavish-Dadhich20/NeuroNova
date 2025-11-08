// Script to seed MongoDB with sample customer data
import clientPromise from "../lib/mongodb.js"

const SAMPLE_CUSTOMERS = [
  {
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
    name: "Ravi Sharma",
    email: "ravi.sharma@example.com",
    password: "ravi123",
    accountNumber: "NNA001234567",
    loanAmount: 200000,
    loanStatus: "Approved",
    creditScore: 745,
    city: "Delhi",
    phone: "+91 98765 43210",
    emi: 8500,
    tenure: 24,
    appliedDate: "2024-01-20",
  },
  {
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
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    password: "amit123",
    accountNumber: "NNA001234568",
    loanAmount: 150000,
    loanStatus: "Pending",
    creditScore: 680,
    city: "Mumbai",
    phone: "+91 98765 43211",
    emi: 6500,
    tenure: 24,
    appliedDate: "2024-02-05",
  },
  {
    name: "Rahul Gupta",
    email: "rahul.gupta@example.com",
    password: "rahul123",
    accountNumber: "NNA001234570",
    loanAmount: 180000,
    loanStatus: "Approved",
    creditScore: 710,
    city: "Pune",
    phone: "+91 98765 43213",
    emi: 7800,
    tenure: 24,
    appliedDate: "2024-02-10",
  },
  {
    name: "Sneha Verma",
    email: "sneha.verma@example.com",
    password: "sneha123",
    accountNumber: "NNA001234571",
    loanAmount: 220000,
    loanStatus: "Pending",
    creditScore: 695,
    city: "Chennai",
    phone: "+91 98765 43214",
    emi: 9500,
    tenure: 24,
    appliedDate: "2024-02-12",
  },
  {
    name: "Arjun Mehta",
    email: "arjun.mehta@example.com",
    password: "arjun123",
    accountNumber: "NNA001234572",
    loanAmount: 100000,
    loanStatus: "Rejected",
    creditScore: 665,
    city: "Hyderabad",
    phone: "+91 98765 43215",
    emi: 4500,
    tenure: 24,
    appliedDate: "2024-02-15",
  },
  {
    name: "Kavita Joshi",
    email: "kavita.joshi@example.com",
    password: "kavita123",
    accountNumber: "NNA001234573",
    loanAmount: 270000,
    loanStatus: "Approved",
    creditScore: 790,
    city: "Ahmedabad",
    phone: "+91 98765 43216",
    emi: 11500,
    tenure: 24,
    appliedDate: "2024-01-28",
  },
  {
    name: "Manoj Tiwari",
    email: "manoj.tiwari@example.com",
    password: "manoj123",
    accountNumber: "NNA001234574",
    loanAmount: 190000,
    loanStatus: "Approved",
    creditScore: 715,
    city: "Jaipur",
    phone: "+91 98765 43217",
    emi: 8200,
    tenure: 24,
    appliedDate: "2024-02-03",
  },
]

async function seedDatabase() {
  try {
    console.log("[v0] Connecting to MongoDB...")
    const client = await clientPromise
    const db = client.db("NeuroNovaDB")

    console.log("[v0] Clearing existing customers...")
    await db.collection("customers").deleteMany({})

    console.log("[v0] Inserting sample customers...")
    const result = await db.collection("customers").insertMany(SAMPLE_CUSTOMERS)

    console.log(`[v0] Successfully inserted ${result.insertedCount} customers`)
    console.log("[v0] Sample customer credentials:")
    SAMPLE_CUSTOMERS.forEach((customer) => {
      console.log(`  - Email: ${customer.email}, Password: ${customer.password}`)
    })

    process.exit(0)
  } catch (error) {
    console.error("[v0] Seed error:", error)
    process.exit(1)
  }
}

seedDatabase()
