"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function AnimatedHeaderSignature() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show the signature after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    // Particle system
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.color = `hsl(${260 + Math.random() * 20}, 70%, 60%)`
        this.alpha = Math.random() * 0.8 + 0.2
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.size > 0.2) this.size -= 0.05
      }

      draw() {
        ctx.globalAlpha = this.alpha
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    const particles: Particle[] = []

    // Text path points for "Powered by Ganesh Divekar"
    const textPath = [
      // P
      { x: 20, y: 20 },
      { x: 20, y: 40 },
      { x: 20, y: 20 },
      { x: 30, y: 20 },
      { x: 35, y: 25 },
      { x: 30, y: 30 },
      { x: 20, y: 30 },

      // o
      { x: 45, y: 35 },
      { x: 40, y: 30 },
      { x: 45, y: 25 },
      { x: 50, y: 30 },
      { x: 45, y: 35 },

      // w
      { x: 55, y: 25 },
      { x: 60, y: 35 },
      { x: 65, y: 25 },
      { x: 70, y: 35 },

      // e
      { x: 80, y: 30 },
      { x: 75, y: 30 },
      { x: 75, y: 25 },
      { x: 80, y: 25 },
      { x: 75, y: 30 },
      { x: 75, y: 35 },
      { x: 80, y: 35 },

      // r
      { x: 85, y: 25 },
      { x: 85, y: 35 },
      { x: 85, y: 25 },
      { x: 90, y: 25 },

      // e
      { x: 100, y: 30 },
      { x: 95, y: 30 },
      { x: 95, y: 25 },
      { x: 100, y: 25 },
      { x: 95, y: 30 },
      { x: 95, y: 35 },
      { x: 100, y: 35 },

      // d
      { x: 110, y: 15 },
      { x: 110, y: 35 },
      { x: 110, y: 25 },
      { x: 115, y: 25 },
      { x: 120, y: 30 },
      { x: 115, y: 35 },
      { x: 110, y: 35 },

      // Space

      // b
      { x: 130, y: 15 },
      { x: 130, y: 35 },
      { x: 130, y: 25 },
      { x: 135, y: 25 },
      { x: 140, y: 30 },
      { x: 135, y: 35 },
      { x: 130, y: 35 },

      // y
      { x: 145, y: 25 },
      { x: 150, y: 35 },
      { x: 155, y: 25 },
      { x: 150, y: 35 },
      { x: 150, y: 45 },

      // Space

      // G
      { x: 170, y: 25 },
      { x: 165, y: 30 },
      { x: 170, y: 35 },
      { x: 175, y: 30 },
      { x: 175, y: 32 },
      { x: 170, y: 32 },

      // a
      { x: 185, y: 35 },
      { x: 180, y: 30 },
      { x: 185, y: 25 },
      { x: 190, y: 30 },
      { x: 185, y: 35 },
      { x: 190, y: 35 },

      // n
      { x: 195, y: 25 },
      { x: 195, y: 35 },
      { x: 195, y: 25 },
      { x: 200, y: 25 },
      { x: 205, y: 30 },
      { x: 205, y: 35 },

      // e
      { x: 215, y: 30 },
      { x: 210, y: 30 },
      { x: 210, y: 25 },
      { x: 215, y: 25 },
      { x: 210, y: 30 },
      { x: 210, y: 35 },
      { x: 215, y: 35 },

      // s
      { x: 225, y: 25 },
      { x: 220, y: 25 },
      { x: 220, y: 30 },
      { x: 225, y: 30 },
      { x: 225, y: 35 },
      { x: 220, y: 35 },

      // h
      { x: 230, y: 15 },
      { x: 230, y: 35 },
      { x: 230, y: 25 },
      { x: 235, y: 25 },
      { x: 240, y: 30 },
      { x: 240, y: 35 },

      // Space

      // D
      { x: 250, y: 25 },
      { x: 250, y: 35 },
      { x: 250, y: 25 },
      { x: 255, y: 25 },
      { x: 260, y: 30 },
      { x: 255, y: 35 },
      { x: 250, y: 35 },

      // i
      { x: 265, y: 25 },
      { x: 265, y: 35 },
      { x: 265, y: 20 },
      { x: 265, y: 22 },

      // v
      { x: 270, y: 25 },
      { x: 275, y: 35 },
      { x: 280, y: 25 },

      // e
      { x: 290, y: 30 },
      { x: 285, y: 30 },
      { x: 285, y: 25 },
      { x: 290, y: 25 },
      { x: 285, y: 30 },
      { x: 285, y: 35 },
      { x: 290, y: 35 },

      // k
      { x: 295, y: 15 },
      { x: 295, y: 35 },
      { x: 295, y: 25 },
      { x: 305, y: 20 },
      { x: 295, y: 25 },
      { x: 305, y: 35 },

      // a
      { x: 315, y: 35 },
      { x: 310, y: 30 },
      { x: 315, y: 25 },
      { x: 320, y: 30 },
      { x: 315, y: 35 },
      { x: 320, y: 35 },

      // r
      { x: 325, y: 25 },
      { x: 325, y: 35 },
      { x: 325, y: 25 },
      { x: 330, y: 25 },
      { x: 335, y: 30 },
    ]

    // Scale the path to fit the canvas
    const scaleX = canvas.width / 360
    const scaleY = canvas.height / 60
    const scaledPath = textPath.map((point) => ({
      x: point.x * scaleX,
      y: point.y * scaleY,
    }))

    // Animation variables
    let currentPoint = 0
    let animationFrame: number
    let lastTime = 0
    const interval = 20 // ms between points

    // Animation function
    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastTime

      if (deltaTime > interval && currentPoint < scaledPath.length) {
        // Add particles at the current point
        const point = scaledPath[currentPoint]
        for (let i = 0; i < 3; i++) {
          particles.push(new Particle(point.x, point.y))
        }
        currentPoint++
        lastTime = timestamp
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update()
        particles[i].draw()

        // Remove tiny particles
        if (particles[i].size <= 0.2) {
          particles.splice(i, 1)
        }
      }

      // Draw the signature path up to the current point
      if (currentPoint > 1) {
        ctx.strokeStyle = "#8b5cf6"
        ctx.lineWidth = 2
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.beginPath()

        for (let i = 0; i < Math.min(currentPoint, scaledPath.length); i++) {
          if (i === 0) {
            ctx.moveTo(scaledPath[i].x, scaledPath[i].y)
          } else {
            ctx.lineTo(scaledPath[i].x, scaledPath[i].y)
          }
        }

        ctx.stroke()
      }

      // Continue animation
      if (currentPoint < scaledPath.length || particles.length > 0) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    // Start animation
    animationFrame = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [isVisible])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="absolute top-0 right-0 w-64 h-16 overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}
