"use client"

export default function Hero() {
  const handleEligibility = () => {
    const element = document.getElementById("calculator")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
      <div className="max-w-4xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground">
            Instant Personal Loans with
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              AI Assistance
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Get approved in minutes with our smart digital sales assistant
          </p>
        </div>

        <button
          onClick={handleEligibility}
          className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg smooth-transition text-lg"
        >
          Check Your Eligibility
        </button>
      </div>
    </section>
  )
}
