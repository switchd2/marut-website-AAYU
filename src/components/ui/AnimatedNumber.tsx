'use client'

import { useEffect, useState } from 'react'

interface AnimatedNumberProps {
  value: number
  duration?: number
}

export default function AnimatedNumber({ value, duration = 1000 }: AnimatedNumberProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const start = 0
    const end = value
    if (start === end) {
      setCount(end)
      return
    }

    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing: easeOutQuad
      const easeProgress = progress * (2 - progress)
      
      const currentCount = Math.floor(easeProgress * (end - start) + start)
      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [value, duration])

  return <>{count}</>
}
