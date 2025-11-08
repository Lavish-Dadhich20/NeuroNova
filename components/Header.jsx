"use client"

import { useState } from "react"
import Link from "next/link"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white">💠</div>
          <span className="text-foreground">NeuroNova</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-foreground hover:text-primary smooth-transition">
            Home
          </Link>
          <a href="#calculator" className="text-foreground hover:text-primary smooth-transition">
            EMI Calculator
          </a>
          <a href="#contact" className="text-foreground hover:text-primary smooth-transition">
            Contact
          </a>
          <Link href="/admin" className="text-foreground hover:text-primary smooth-transition">
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          ☰
        </button>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-4 md:hidden">
            <Link href="/" className="text-foreground hover:text-primary">
              Home
            </Link>
            <a href="#calculator" className="text-foreground hover:text-primary">
              EMI Calculator
            </a>
            <a href="#contact" className="text-foreground hover:text-primary">
              Contact
            </a>
            <Link href="/admin" className="text-foreground hover:text-primary">
              Login
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
