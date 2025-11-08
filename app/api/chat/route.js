import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

const API_KEY = "AIzaSyBV7f5R2eURtyfwFVWFhG29krQc6Go5cps"
const genAI = new GoogleGenerativeAI(API_KEY)

export async function POST(request) {
  try {
    const { message, userEmail, conversationHistory } = await request.json()

    console.log("[v0] Chat API called:", { message, userEmail, hasAPIKey: !!API_KEY })

    let customerContext = ""
    let customer = null

    if (userEmail) {
      try {
        const { db } = await connectToDatabase()
        const customersCollection = db.collection("customers")

        customer = await customersCollection.findOne({ email: userEmail })

        console.log("[v0] Customer fetched from MongoDB:", customer ? customer.name : "Not found")

        if (customer) {
          customerContext = `
You are Nova, an AI loan assistant for NeuroNova NBFC. You are chatting with ${customer.name}.

Customer Details:
- Name: ${customer.name}
- Email: ${customer.email}
- Phone: ${customer.phone}
- Account Number: ${customer.accountNumber}
- Date of Birth: ${customer.dob}
- City: ${customer.city}

KYC Details:
- Aadhaar: ${customer.aadhaar}
- PAN: ${customer.pan}
- Address: ${customer.address}

Employment Details:
- Status: ${customer.employmentStatus}
- Company: ${customer.companyName}
- Monthly Income: ₹${customer.monthlyIncome?.toLocaleString("en-IN")}
- Experience: ${customer.workExperience}

Bank Details:
- Bank: ${customer.bankName}
- Account Number: ${customer.accountNo}
- IFSC Code: ${customer.ifscCode}
- Account Type: ${customer.accountType}

Loan Information:
- Loan Amount: ₹${customer.loanAmount.toLocaleString("en-IN")}
- EMI: ₹${customer.emi.toLocaleString("en-IN")}
- Tenure: ${customer.tenure} months
- Current Loan Status: ${customer.loanStatus}
- Credit Score: ${customer.creditScore}
- Applied Date: ${customer.appliedDate}

IMPORTANT DATABASE UPDATE RULES:

When the customer takes ANY of these actions, you MUST include the EXACT command at the END of your response (after a space):

1. APPLYING FOR A LOAN:
   - Customer says: "I want to apply for loan", "submit my application", "apply now", "I want to apply", "start loan process"
   - Current Status: "Not Applied"
   - Your response should confirm application submission
   - Command to add: [UPDATE_STATUS:Pending]
   
2. REQUESTING APPROVAL:
   - Customer says: "approve my loan", "send for approval", "request approval"
   - Current Status: "Pending"
   - Your response should confirm approval
   - Command to add: [UPDATE_STATUS:Approved]

3. LOAN DISBURSEMENT:
   - Customer asks: "disburse my loan", "release the funds", "when will I get money"
   - Current Status: "Approved"
   - Command to add: [UPDATE_STATUS:Disbursed]

4. CANCELLATION:
   - Customer says: "cancel my loan", "reject application", "I don't want the loan"
   - Command to add: [UPDATE_STATUS:Rejected]

EXAMPLE CONVERSATIONS:

Customer: "I want to apply for a loan"
Nova: "Great! I've submitted your loan application for ₹${customer.loanAmount.toLocaleString("en-IN")} with an EMI of ₹${customer.emi.toLocaleString("en-IN")} per month for ${customer.tenure} months. Your application is now under review and our team will contact you within 24-48 hours. [UPDATE_STATUS:Pending]"

Customer: "Please approve my loan"
Nova: "Wonderful news! Your loan application has been approved! Your loan of ₹${customer.loanAmount.toLocaleString("en-IN")} is now ready for disbursement. Please complete the final documentation and the funds will be transferred to your account. [UPDATE_STATUS:Approved]"

REMEMBER: Always add the status update command at the VERY END of your response, separated by a space. Use the customer's specific loan details when responding.
`
        }
      } catch (dbError) {
        console.error("[v0] MongoDB error:", dbError)
      }
    }

    const chatHistory = conversationHistory || []

    const systemPrompt = customerContext
      ? customerContext
      : `You are Nova, an AI loan assistant for NeuroNova NBFC. Help users with loan applications, eligibility checks, KYC verification, credit scores, and loan status. Be friendly, professional, and helpful.`

    const fullPrompt = `${systemPrompt}

Previous conversation:
${chatHistory.map((msg) => `${msg.sender === "user" ? "Customer" : "Nova"}: ${msg.text}`).join("\n")}

Customer: ${message}
Nova:`

    console.log("[v0] Calling Google AI API...")
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    let botReply = response.text()

    console.log("[v0] AI Response:", botReply)

    const statusUpdateMatch = botReply.match(/\[UPDATE_STATUS:\s*(\w+)\]/i)
    let statusUpdated = false
    let updatedStatus = null

    if (statusUpdateMatch && customer) {
      const newStatus = statusUpdateMatch[1]
      console.log("[v0] Status update command detected:", newStatus)

      try {
        const { db } = await connectToDatabase()
        const customersCollection = db.collection("customers")

        console.log("[v0] Attempting to update customer ID:", customer._id.toString())
        console.log("[v0] New status:", newStatus)

        const updateResult = await customersCollection.updateOne(
          { _id: new ObjectId(customer._id) },
          {
            $set: {
              loanStatus: newStatus,
              lastUpdated: new Date().toISOString(),
            },
          },
        )

        console.log("[v0] MongoDB update result:", {
          matchedCount: updateResult.matchedCount,
          modifiedCount: updateResult.modifiedCount,
        })

        if (updateResult.modifiedCount > 0) {
          statusUpdated = true
          updatedStatus = newStatus
          customer.loanStatus = newStatus
          console.log("[v0] ✅ Customer status SUCCESSFULLY updated in MongoDB to:", newStatus)
        } else if (updateResult.matchedCount > 0) {
          console.log("[v0] ⚠️ Customer found but status was already:", newStatus)
        } else {
          console.log("[v0] ❌ No customer matched for update")
        }

        botReply = botReply.replace(/\[UPDATE_STATUS:\s*\w+\]/gi, "").trim()
      } catch (updateError) {
        console.error("[v0] ❌ Error updating customer status:", {
          message: updateError.message,
          stack: updateError.stack,
        })
      }
    } else {
      console.log("[v0] No status update command found in AI response")
    }

    return NextResponse.json({
      success: true,
      reply: botReply,
      statusUpdated,
      updatedStatus,
      customerData: customer
        ? {
            name: customer.name,
            accountNumber: customer.accountNumber,
            loanStatus: customer.loanStatus,
            creditScore: customer.creditScore,
          }
        : null,
    })
  } catch (error) {
    console.error("[v0] Chat API Error Details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    })

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        reply: `I apologize, but I encountered an error: ${error.message}. Please try again.`,
      },
      { status: 500 },
    )
  }
}
