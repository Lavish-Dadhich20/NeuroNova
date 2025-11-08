import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    if (email === "admin@neuronova.com" && password === "admin123") {
      return NextResponse.json({
        success: true,
        userType: "admin",
        user: {
          name: "Admin User",
          email: email,
        },
      })
    }

    const client = await clientPromise
    const db = client.db("NeuroNovaDB")
    const customersCollection = db.collection("customers")

    const customer = await customersCollection.findOne({ email, password })

    if (customer) {
      return NextResponse.json({
        success: true,
        userType: "customer",
        user: {
          id: customer._id.toString(),
          name: customer.name,
          email: customer.email,
          accountNumber: customer.accountNumber,
          loanAmount: customer.loanAmount,
          loanStatus: customer.loanStatus,
          creditScore: customer.creditScore,
          city: customer.city,
          phone: customer.phone,
          emi: customer.emi,
          tenure: customer.tenure,
          appliedDate: customer.appliedDate,
        },
      })
    }

    return NextResponse.json(
      {
        success: false,
        message: "Invalid credentials",
      },
      { status: 401 },
    )
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Server error: " + error.message,
      },
      { status: 500 },
    )
  }
}
