# Google AI Studio Chatbot Integration Guide

Your NeuroNova chatbot is now fully integrated with MongoDB and customer authentication!

## Setup Instructions

### 1. Get Your Google AI Studio API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy your API key

### 2. Add the API Key to Your Project

1. In v0, click the **sidebar** on the left
2. Go to the **"Vars"** section
3. Add a new environment variable:
   - **Name:** `GOOGLE_AI_API_KEY`
   - **Value:** Your API key from Google AI Studio
4. Save and refresh your preview

### 3. How It Works

#### For Customers (Logged In)
- When a customer logs in with their email, the chatbot automatically recognizes them
- The chatbot pulls their complete profile from MongoDB/temp database:
  - Name, Account Number
  - Loan Amount, EMI, Tenure
  - Credit Score, Loan Status
  - City, Phone, Applied Date
- Nova (the AI assistant) provides personalized responses using their actual data
- Example: "What's my loan status?" → Nova responds with their specific status and details

#### For Public Users (Not Logged In)
- Chatbot works on the main landing page for general inquiries
- Can help with loan calculations, eligibility, and general questions
- No personalized data shown

### 4. Current Customer Credentials

Login with these test accounts to see personalized chatbot in action:

| Email | Password | Name |
|-------|----------|------|
| yuvraj@example.com | yuvraj@123 | Yuvraj Singh |
| ravi.sharma@example.com | ravi123 | Ravi Sharma |
| priya.patel@example.com | priya123 | Priya Patel |

### 5. MongoDB Integration

The chatbot connects to your MongoDB database at:
\`\`\`
mongodb+srv://lavish2006:Lavish20@neuronovacluster.y55tlbx.mongodb.net/NeuroNovaDB
\`\`\`

**To use MongoDB instead of temp data:**
1. Add `MONGO_URI` environment variable in the Vars section
2. Run the seed script to populate customer data
3. The chatbot will automatically pull from MongoDB

### 6. Chatbot Features

✅ **Personalized Greetings** - Recognizes logged-in customers by name
✅ **Account Information** - Knows account number, loan status, EMI details
✅ **Loan Queries** - Answers questions about their specific loan
✅ **Credit Score Info** - References their actual credit score
✅ **Payment Details** - Calculates total payable based on their EMI
✅ **Context Awareness** - Remembers conversation history

### 7. Testing the Integration

1. **Login as a customer** (e.g., yuvraj@example.com / yuvraj@123)
2. **Go to customer dashboard**
3. **Click the chat button** (bottom right corner)
4. **Try these questions:**
   - "What's my loan status?"
   - "What's my EMI?"
   - "Tell me about my loan"
   - "What's my credit score?"
   - "How much do I need to pay in total?"

The chatbot will respond with YOUR ACTUAL DATA from the database!

### 8. Troubleshooting

**"I'm having trouble connecting"**
- Make sure `GOOGLE_AI_API_KEY` is set in environment variables
- Check that the API key is valid and active

**"Chatbot doesn't recognize me"**
- Make sure you're logged in as a customer
- Check that your email is in the temp-customers database
- Verify sessionStorage has customerData

**"Responses are generic"**
- The chatbot needs a moment to load customer context
- Try sending a message and wait for the response

---

Your chatbot is production-ready and integrates seamlessly with MongoDB for personalized customer experiences!
