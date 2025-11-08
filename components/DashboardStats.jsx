"use client"

export default function DashboardStats({ customers }) {
  const approved = customers.filter((c) => c.loanStatus === "Approved").length
  const pending = customers.filter((c) => c.loanStatus === "Pending").length
  const avgCreditScore =
    customers.length > 0 ? Math.round(customers.reduce((sum, c) => sum + c.creditScore, 0) / customers.length) : 0

  return (
    <div className="grid md:grid-cols-4 gap-6">
      <StatCard title="Total Applications" value={customers.length} icon="📊" />
      <StatCard title="Approved" value={approved} icon="✅" color="text-green-600" />
      <StatCard title="Pending" value={pending} icon="⏳" color="text-yellow-600" />
      <StatCard title="Avg Credit Score" value={avgCreditScore} icon="📈" color="text-blue-600" />
    </div>
  )
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-card rounded-2xl p-6 card-shadow border border-border">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <p className={`text-3xl font-bold ${color || "text-primary"}`}>{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  )
}
