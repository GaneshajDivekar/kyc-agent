"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = 50

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.color = `rgba(124, 58, 237, ${Math.random() * 0.5 + 0.1})` // Violet color
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle())
      }
    }

    init()

    // Draw document and ID card
    const drawDocuments = () => {
      // Draw ID card
      ctx.fillStyle = "#fff"
      ctx.shadowColor = "rgba(0, 0, 0, 0.1)"
      ctx.shadowBlur = 15
      ctx.shadowOffsetX = 5
      ctx.shadowOffsetY = 5
      ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 - 70, 200, 120)

      // ID card details
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0

      // Photo area
      ctx.fillStyle = "#e2e8f0"
      ctx.fillRect(canvas.width / 2 - 80, canvas.height / 2 - 50, 60, 80)

      // Text lines
      ctx.fillStyle = "#94a3b8"
      ctx.fillRect(canvas.width / 2 - 10, canvas.height / 2 - 50, 90, 10)
      ctx.fillRect(canvas.width / 2 - 10, canvas.height / 2 - 30, 90, 10)
      ctx.fillRect(canvas.width / 2 - 10, canvas.height / 2 - 10, 90, 10)
      ctx.fillRect(canvas.width / 2 - 10, canvas.height / 2 + 10, 90, 10)

      // Draw document
      ctx.fillStyle = "#fff"
      ctx.shadowColor = "rgba(0, 0, 0, 0.1)"
      ctx.shadowBlur = 15
      ctx.shadowOffsetX = -5
      ctx.shadowOffsetY = 5
      ctx.fillRect(canvas.width / 2 - 150, canvas.height / 2 - 120, 180, 220)

      // Document lines
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.fillStyle = "#94a3b8"

      for (let i = 0; i < 6; i++) {
        ctx.fillRect(canvas.width / 2 - 130, canvas.height / 2 - 100 + i * 25, 140, 8)
      }

      // Draw checkmark
      ctx.strokeStyle = "#8b5cf6" // Violet color
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2 + 60, canvas.height / 2 + 30)
      ctx.lineTo(canvas.width / 2 + 70, canvas.height / 2 + 40)
      ctx.lineTo(canvas.width / 2 + 90, canvas.height / 2 + 20)
      ctx.stroke()

      // Draw circular progress
      ctx.strokeStyle = "#8b5cf6" // Violet color
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2 + 80, 30, 0, Math.PI * 2 * 0.75)
      ctx.stroke()

      // Draw AI brain icon
      const centerX = canvas.width / 2 - 180
      const centerY = canvas.height / 2 - 50
      const radius = 25

      // Draw circle
      ctx.fillStyle = "rgba(139, 92, 246, 0.2)" // Light violet
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fill()

      // Draw brain-like pattern
      ctx.strokeStyle = "#8b5cf6"
      ctx.lineWidth = 2
      ctx.beginPath()

      // Left half
      ctx.moveTo(centerX - radius / 2, centerY - radius / 2)
      ctx.bezierCurveTo(
        centerX - radius / 1.5,
        centerY - radius / 4,
        centerX - radius / 1.5,
        centerY + radius / 4,
        centerX - radius / 2,
        centerY + radius / 2,
      )

      // Right half
      ctx.moveTo(centerX + radius / 2, centerY - radius / 2)
      ctx.bezierCurveTo(
        centerX + radius / 1.5,
        centerY - radius / 4,
        centerX + radius / 1.5,
        centerY + radius / 4,
        centerX + radius / 2,
        centerY + radius / 2,
      )

      // Middle connections
      ctx.moveTo(centerX, centerY - radius / 1.5)
      ctx.lineTo(centerX, centerY + radius / 1.5)

      ctx.moveTo(centerX - radius / 3, centerY)
      ctx.lineTo(centerX + radius / 3, centerY)

      ctx.stroke()
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connecting lines
      ctx.strokeStyle = "rgba(124, 58, 237, 0.05)" // Violet color
      ctx.lineWidth = 1
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x
          const dy = particlesArray[i].y - particlesArray[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      drawDocuments()

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-[400px] md:h-[500px]"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}
