"use client"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    const stored = localStorage.getItem("theme")
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (stored === "dark" || (!stored && isSystemDark)) {
      root.classList.add("dark")
      setIsDark(true)
    }
  }, [])

  const toggleTheme = () => {
    const root = window.document.documentElement
    if (root.classList.contains("dark")) {
      root.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setIsDark(false)
    } else {
      root.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setIsDark(true)
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-800" />}
    </button>
  )
}
