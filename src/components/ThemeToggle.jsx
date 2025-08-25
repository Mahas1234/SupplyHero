"use client"

import { useTheme } from "@/contexts/ThemeContext"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 hover:bg-white dark:hover:bg-slate-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-yellow-500" />}
    </button>
  )
}
