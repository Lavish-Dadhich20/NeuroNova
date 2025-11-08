import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    console.log("[v0] Fetching customers from MongoDB...")

    const client = await clientPromise
    const db = client.db("NeuroNovaDB")
    const customers = await db.collection("customers").find({}).toArray()

    console.log("[v0] Fetched customers from MongoDB:", customers.length)

    return NextResponse.json({
      success: true,
      customers: customers.map((c) => ({
        id: c._id.toString(),
        name: c.name,
        email: c.email,
        password: c.password,
        accountNumber: c.accountNumber,
        loanAmount: c.loanAmount,
        loanStatus: c.loanStatus,
        creditScore: c.creditScore,
        city: c.city,
        phone: c.phone,
        emi: c.emi,
        tenure: c.tenure,
        appliedDate: c.appliedDate,
        aadhaar: c.aadhaar,
        pan: c.pan,
        address: c.address,
        dob: c.dob,
        employmentStatus: c.employmentStatus,
        companyName: c.companyName,
        monthlyIncome: c.monthlyIncome,
        workExperience: c.workExperience,
        bankName: c.bankName,
        accountNo: c.accountNo,
        ifscCode: c.ifscCode,
        accountType: c.accountType,
      })),
    })
  } catch (error) {
    console.error("[v0] Get customers error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch customers from MongoDB: " + error.message,
      },
      { status: 500 },
    )
  }
}
