"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import EmiCalculator from "@/components/EmiCalculator"
import Footer from "@/components/Footer"
import ChatBot from "@/components/ChatBot"

export default function Home() {
  const [showChat, setShowChat] = useState(false)
  const [chatContext, setChatContext] = useState(null)

  const handleApplyLoan = (loanData) => {
    setChatContext(loanData)
    setShowChat(true)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <EmiCalculator onApply={handleApplyLoan} />
      </section>
      <Footer />

      <ChatBot isOpen={showChat} onClose={() => setShowChat(false)} context={chatContext} userEmail={null} />
    </main>
  )
}
