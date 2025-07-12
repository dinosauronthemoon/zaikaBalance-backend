"use client"

import { useEffect, useState } from "react"

const FloatingBackground = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const elements = ["🌸", "🦋", "🌿", "✨", "🌺", "🍃", "💫", "🌼"]

  return (
    <div className="floating-elements">
      {elements.map((element, index) => (
        <div
          key={index}
          className="floating-element text-4xl"
          style={{
            left: `${10 + index * 10}%`,
            animationDelay: `${index * 2.5}s`,
            animationDuration: `${20 + index * 5}s`,
          }}
        >
          {element}
        </div>
      ))}
    </div>
  )
}

export default FloatingBackground
