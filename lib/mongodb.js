// MongoDB connection utility
import { MongoClient } from "mongodb"

console.log("[v0] MongoDB URI exists:", !!process.env.MONGO_URI)
console.log("[v0] MongoDB URI length:", process.env.MONGO_URI?.length || 0)

if (!process.env.MONGO_URI) {
  throw new Error("Please add your MONGO_URI to environment variables in the Vars section")
}

const uri = process.env.MONGO_URI
const options = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}

console.log("[v0] Attempting to connect to MongoDB...")

let client
let clientPromise

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to preserve the connection
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client
      .connect()
      .then((client) => {
        console.log("[v0] MongoDB connected successfully!")
        return client
      })
      .catch((error) => {
        console.error("[v0] MongoDB connection error:", error.message)
        throw error
      })
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, create a new client for each connection
  client = new MongoClient(uri, options)
  clientPromise = client
    .connect()
    .then((client) => {
      console.log("[v0] MongoDB connected successfully!")
      return client
    })
    .catch((error) => {
      console.error("[v0] MongoDB connection error:", error.message)
      throw error
    })
}

export default clientPromise

export async function connectToDatabase() {
  try {
    const client = await clientPromise
    const db = client.db("NeuroNovaDB")
    return { client, db }
  } catch (error) {
    console.error("[v0] Error connecting to database:", error)
    throw error
  }
}
