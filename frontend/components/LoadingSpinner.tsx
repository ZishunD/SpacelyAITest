"use client"

import { cn } from "@/lib/utils"

export default function LoadingSpinner({
  size = 32,
  className = "",
}: {
  size?: number
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative",
        className
      )}
      style={{ width: size, height: size }}
    >
      <div
        className="absolute inset-0 rounded-full border-4 border-t-transparent border-b-transparent border-l-blue-500 border-r-blue-400 animate-spin"
        style={{
          width: size,
          height: size,
        }}
      />
    </div>
  )
}