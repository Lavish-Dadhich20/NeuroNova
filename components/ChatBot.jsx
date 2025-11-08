"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ChatBot({ isOpen, onClose, context, userEmail }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [customerData, setCustomerData] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      let initialMessage = "Welcome to NeuroNova! I'm Nova, your AI loan assistant. How can I help you today?"

      // Personalized greeting for logged-in customers
      if (userEmail) {
        initialMessage =
          "Hello! I'm Nova, your personal AI loan assistant. I can see you're logged in, so I have all your loan details ready. What would you like to know?"
      } else if (context) {
        initialMessage = `Welcome to NeuroNova! I see you're interested in a loan of ₹${context.loanAmount?.toLocaleString("en-IN")} for ${context.tenure} months at ${context.interestRate}% interest. Let me help you with the loan process.`
      }

      setMessages([
        {
          id: 1,
          text: initialMessage,
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, userEmail])

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    const currentInput = input
    setInput("")
    setLoading(true)

    try {
      // Call the chat API with Google AI Studio
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
          userEmail: userEmail, // Pass logged-in user email
          conversationHistory: messages.slice(-6), // Last 6 messages for context
        }),
      })

      const data = await response.json()

      if (data.success) {
        if (data.customerData) {
          setCustomerData(data.customerData)
        }

        if (data.statusUpdated) {
          console.log("[v0] Customer status updated successfully via chatbot")
        }

        // Add bot response
        const botMessage = {
          id: messages.length + 2,
          text: data.reply,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
      } else {
        // Error fallback
        const errorMessage = {
          id: messages.length + 2,
          text:
            data.reply ||
            "I'm having trouble processing your request. Please try again or contact support if the issue persists.",
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
      }
    } catch (error) {
      console.error("[v0] Chat error:", error)
      const errorMessage = {
        id: messages.length + 2,
        text: "I'm having trouble connecting right now. Please check your internet connection and try again.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setMessages([])}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl smooth-transition text-2xl z-50"
          >
            💬
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 w-96 max-h-screen md:max-h-[600px] bg-card rounded-2xl shadow-2xl border border-border flex flex-col z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                <div>
                  <h3 className="font-bold">Nova - Your Loan Assistant</h3>
                  {customerData && <p className="text-xs opacity-90">Chatting with {customerData.name}</p>}
                </div>
              </div>
              <button onClick={onClose} className="text-white hover:opacity-75 smooth-transition text-xl">
                ✕
              </button>
            </div>

            {/* Customer Info Badge */}
            {customerData && (
              <div className="bg-blue-50 border-b border-blue-200 px-4 py-2 text-xs text-blue-800">
                <p>
                  <strong>Account:</strong> {customerData.accountNumber} | <strong>Status:</strong>{" "}
                  {customerData.loanStatus} | <strong>Credit Score:</strong> {customerData.creditScore}
                </p>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none"
                        : "bg-muted text-foreground rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-muted rounded-lg px-4 py-2 rounded-bl-none">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-input border border-border rounded-lg px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg smooth-transition disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
