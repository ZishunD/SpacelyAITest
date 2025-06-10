"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function PromptForm({ onSubmit }: { onSubmit: (prompt: string, nPrompt: string) => void }) {
  const [prompt, setPrompt] = useState("")
  const [nPrompt, setNPrompt] = useState("")

  return (
    <div className="space-y-6 max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <Input
        placeholder="Enter prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="rounded-lg border-gray-300 dark:border-gray-700 focus:ring-blue-500"
      />
      <Input
        placeholder="Negative prompt (optional)"
        value={nPrompt}
        onChange={(e) => setNPrompt(e.target.value)}
        className="rounded-lg border-gray-300 dark:border-gray-700 focus:ring-blue-500"
      />
      <Button
        onClick={() => onSubmit(prompt, nPrompt)}
        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition"
      >
        Generate
      </Button>
    </div>
  )
}
