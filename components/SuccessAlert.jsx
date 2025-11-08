"use client"
import { motion } from "framer-motion"

export default function SuccessAlert({ message, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-4 right-4 max-w-md bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg z-50"
    >
      <div className="flex gap-3">
        <span className="text-2xl">✓</span>
        <div className="flex-1">
          <h3 className="font-bold text-green-800">Success!</h3>
          <p className="text-green-700 text-sm">{message}</p>
        </div>
        <button onClick={onClose} className="text-green-600 hover:text-green-800 font-bold">
          ✕
        </button>
      </div>
    </motion.div>
  )
}
