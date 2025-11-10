# NeuroNova NBFC - MongoDB Setup Instructions

## Prerequisites
- MongoDB Atlas account (free tier works)
- MongoDB connection string

## Setup Steps

### 1. MongoDB Connection Already Configured
Your MongoDB Atlas connection is already set up with:
- Database: `NeuroNovaDB`
- Cluster: `neuronovacluster`

### 2. Environment Variable
The environment variable needs to be configured:
- Create a `.env.local` file in the root directory
- Add your MongoDB connection string as `MONGO_URI`
- Format: `MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority`
- Never commit this file to version control

### 3. Seed the Database
Once the environment variable is set:

1. The `scripts/seed-customers.js` file contains 10 sample customers
2. Run this script from the v0 interface to populate your database
3. Sample customers will have credentials like:
   - Email: `ravi.sharma@example.com`, Password: `ravi123`
   - Email: `priya.nair@example.com`, Password: `priya123`
   - etc.

### 4. Test the Application

**Admin Login:**
- Email: `admin@neuronova.com`
- Password: `admin123`
- This will take you to the admin dashboard to see all customers

**Customer Login:**
- Use any customer email from the seeded data (e.g., `ravi.sharma@example.com`)
- Password: (e.g., `ravi123`)
- This will take you to the customer-specific dashboard showing their loan details

## Database Schema

### Customers Collection
\`\`\`javascript
{
  name: String,
  email: String (unique),
  password: String,
  accountNumber: String (unique),
  loanAmount: Number,
  loanStatus: String (Approved/Pending/Rejected),
  creditScore: Number,
  city: String,
  phone: String,
  emi: Number,
  tenure: Number (in months)
}
\`\`\`

## Features
- **Dual Login System**: Separate dashboards for admin and customers
- **Admin Dashboard**: View all customers, filter by city/status, edit loan statuses
- **Customer Dashboard**: Personalized view with account details, download statements
- **MongoDB Integration**: Real-time data from MongoDB Atlas
- **Secure Authentication**: Email and password based login

## Notes
- Passwords are stored in plain text for demo purposes. In production, use bcrypt or similar hashing.
- The admin credentials are hardcoded for demo purposes.
- Each customer sees only their own data in the customer dashboard.
