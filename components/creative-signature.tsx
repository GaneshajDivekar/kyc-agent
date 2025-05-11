"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function CreativeSignature() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    // Draw signature
    const drawSignature = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set styles
      ctx.strokeStyle = "#8b5cf6" // Violet color
      ctx.lineWidth = 2
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      // Draw "Powered by"
      ctx.font = "italic 14px Arial"
      ctx.fillStyle = "#a78bfa"
      ctx.textAlign = "center"
      ctx.fillText("Powered by", canvas.width / 2, 20)

      // Draw signature
      ctx.beginPath()

      // G
      ctx.moveTo(canvas.width / 2 - 100, 50)
      ctx.bezierCurveTo(canvas.width / 2 - 110, 40, canvas.width / 2 - 110, 60, canvas.width / 2 - 100, 60)
      ctx.lineTo(canvas.width / 2 - 90, 60)
      ctx.lineTo(canvas.width / 2 - 90, 55)
      ctx.lineTo(canvas.width / 2 - 95, 55)
      ctx.stroke()

      // a
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2 - 80, 55)
      ctx.bezierCurveTo(canvas.width / 2 - 80, 45, canvas.width / 2 - 70, 45, canvas.width / 2 - 70, 50)
      ctx.bezierCurveTo(canvas.width / 2 - 70, 55, canvas.width / 2 - 80, 55, canvas.width / 2 - 80, 60)
      ctx.stroke()

      // n
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2 - 60, 60)
      ctx.lineTo(canvas.width / 2 - 60, 45)
      ctx.bezierCurveTo(canvas.width / 2 - 60, 50, canvas.width / 2 - 50, 50, canvas.width / 2 - 50, 55)
      ctx.lineTo(canvas.width / 2 - 50, 60)
      ctx.stroke()

      // e
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2 - 40, 55)
      ctx.bezierCurveTo(canvas.width / 2 - 40, 45, canvas.width / 2 - 30, 45, canvas.width / 2 - 30, 50)
      ctx.bezierCurveTo(canvas.width / 2 - 30, 55, canvas.width / 2 - 40, 55, canvas.width / 2 - 40, 50)
      ctx.lineTo(canvas.width / 2 - 30, 50)
      ctx.stroke()

      // s
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2 - 20, 45)
      ctx.bezierCurveTo(canvas.width / 2 - 25, 45, canvas.width / 2 - 25, 50, canvas.width / 2 - 20, 50)
      ctx.bezierCurveTo(canvas.width / 2 - 15, 50, canvas.width / 2 - 15, 55, canvas.width / 2 - 20, 55)
      ctx.stroke()

      // h
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2 - 10, 40)
      ctx.lineTo(canvas.width / 2 - 10, 60)
      ctx.moveTo(canvas.width / 2 - 10, 50)
      ctx.bezierCurveTo(canvas.width / 2 - 10, 45, canvas.width / 2, 45, canvas.width / 2, 50)
      ctx.lineTo(canvas.width / 2, 60)
      ctx.stroke()

      // D
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2 + 10, 40)
      ctx.lineTo(canvas.width / 2 + 10, 60)
      ctx.bezierCurveTo(canvas.width / 2 + 25, 60, canvas.width / 2 + 25, 40, canvas.width / 2 + 10, 40)
      ctx.stroke()

      // i
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2 + 30, 45)
      ctx.lineTo(canvas.width / 2 + 30, 60)
      ctx.moveTo(canvas.width / 2 + 30, 40)
      ctx.arc(canvas.width / 2 + 30, 40, 1, 0, Math.PI * 2)
      ctx.stroke()

      // v
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2 + 35, 45)
      ctx.lineTo(canvas.width / 2 + 40, 60)
      ctx.lineTo(canvas.width / 2 + 45, 45)
      ctx.stroke()

      // e
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2 + 55, 55)
      ctx.bezierCurveTo(canvas.width / 2 + 55, 45, canvas.width / 2 + 65, 45, canvas.width / 2 + 65, 50)
      ctx.bezierCurveTo(canvas.width / 2 + 65, 55, canvas.width / 2 + 55, 55, canvas.width / 2 + 55, 50)
      ctx.lineTo(canvas.width / 2 + 65, 50)
      ctx.stroke()

      // k
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2 + 70, 40)
      ctx.lineTo(canvas.width / 2 + 70, 60)
      ctx.moveTo(canvas.width / 2 + 70, 50)
      ctx.lineTo(canvas.width / 2 + 80, 45)
      ctx.moveTo(canvas.width / 2 + 70, 50)
      ctx.lineTo(canvas.width / 2 + 80, 60)
      ctx.stroke()

      // a
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2 + 90, 55)
      ctx.bezierCurveTo(canvas.width / 2 + 90, 45, canvas.width / 2 + 100, 45, canvas.width / 2 + 100, 50)
      ctx.bezierCurveTo(canvas.width / 2 + 100, 55, canvas.width / 2 + 90, 55, canvas.width / 2 + 90, 60)
      ctx.stroke()

      // r
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2 + 110, 60)
      ctx.lineTo(canvas.width / 2 + 110, 45)
      ctx.bezierCurveTo(canvas.width / 2 + 110, 45, canvas.width / 2 + 120, 45, canvas.width / 2 + 120, 50)
      ctx.stroke()

      // Draw sparkles
      const sparkles = [
        { x: canvas.width / 2 - 90, y: 40 },
        { x: canvas.width / 2 + 20, y: 35 },
        { x: canvas.width / 2 + 100, y: 40 },
      ]

      sparkles.forEach((sparkle) => {
        ctx.beginPath()
        ctx.strokeStyle = "#c4b5fd"
        ctx.moveTo(sparkle.x - 5, sparkle.y)
        ctx.lineTo(sparkle.x + 5, sparkle.y)
        ctx.moveTo(sparkle.x, sparkle.y - 5)
        ctx.lineTo(sparkle.x, sparkle.y + 5)
        ctx.moveTo(sparkle.x - 3, sparkle.y - 3)
        ctx.lineTo(sparkle.x + 3, sparkle.y + 3)
        ctx.moveTo(sparkle.x + 3, sparkle.y - 3)
        ctx.lineTo(sparkle.x - 3, sparkle.y + 3)
        ctx.stroke()
      })
    }

    // Initial draw
    drawSignature()

    // Redraw on resize
    const handleResize = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      drawSignature()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="relative"
    >
      <canvas ref={canvasRef} className="w-full h-20" />
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ delay: 1, duration: 1 }}
          className="h-0.5 bg-gradient-to-r from-transparent via-violet-500 to-transparent"
        />
      </div>
    </motion.div>
  )
}
