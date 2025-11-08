import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function PATCH(request, { params }) {
  try {
    const { id } = await params
    const { loanStatus } = await request.json()

    console.log("[v0] Updating customer loan status:", id, loanStatus)

    if (!ObjectId.isValid(id)) {
      console.log("[v0] Invalid ObjectId format:", id)
      return NextResponse.json({ success: false, message: "Invalid customer ID format" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("NeuroNovaDB")
    const customersCollection = db.collection("customers")

    const result = await customersCollection.updateOne({ _id: new ObjectId(id) }, { $set: { loanStatus } })

    console.log("[v0] MongoDB update result:", result)

    if (result.matchedCount > 0) {
      console.log("[v0] Customer status updated successfully in MongoDB")
      return NextResponse.json({ success: true })
    } else {
      console.log("[v0] Customer not found in MongoDB")
      return NextResponse.json({ success: false, message: "Customer not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("[v0] Update customer error:", error)
    return NextResponse.json({ success: false, message: "Server error: " + error.message }, { status: 500 })
  }
}
