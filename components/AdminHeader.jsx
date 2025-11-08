"use client"
import Link from "next/link"

export default function AdminHeader({ adminName, onLogout }) {
  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white">💠</div>
          <span className="text-xl font-bold text-foreground">NeuroNova Admin</span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Logged in as</p>
            <p className="font-semibold text-foreground">{adminName}</p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 smooth-transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
