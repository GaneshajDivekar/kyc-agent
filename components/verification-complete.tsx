"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, Download, Share2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

interface VerificationCompleteProps {
  extractedData: any
}

export default function VerificationComplete({ extractedData }: VerificationCompleteProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Trigger confetti effect
    setTimeout(() => {
      setShowConfetti(true)
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min
      }

      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)

        // since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      }, 250)
    }, 500)
  }, [])

  const handleDownloadCertificate = () => {
    // Create a certificate with verification details
    const certificateContent = `
      ===== KYC VERIFICATION CERTIFICATE =====
      
      Verification ID: KYC-10052025-001
      Name: ${extractedData.name}
      Aadhaar Number: ${extractedData.aadhaarNumber}
      Date of Birth: ${extractedData.dob}
      Gender: ${extractedData.gender}
      
      Status: APPROVED
      Completed On: May 10, 2025
      Security Score: 98/100
      Valid Until: May 10, 2026
      
      This is to certify that the above individual has successfully
      completed the KYC verification process through AI KYC Agent.
      
      ===== END OF CERTIFICATE =====
    `

    // Create a blob and download it
    const blob = new Blob([certificateContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `KYC_Certificate_${extractedData.name.replace(/\s+/g, "_")}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleShareResults = () => {
    // Check if Web Share API is supported
    if (navigator.share) {
      navigator
        .share({
          title: "KYC Verification Complete",
          text: `I've completed my KYC verification for ${extractedData.name} with ID: KYC-10052025-001`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error))
    } else {
      // Fallback for browsers that don't support the Web Share API
      // Copy verification details to clipboard
      const shareText = `KYC Verification Complete for ${extractedData.name} with ID: KYC-10052025-001`
      navigator.clipboard
        .writeText(shareText)
        .then(() => {
          alert("Verification details copied to clipboard!")
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err)
        })
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6"
      >
        <Check className="h-12 w-12 text-green-600" />
      </motion.div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Complete!</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Your KYC verification has been successfully completed. You will receive a confirmation email shortly.
      </p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-violet-50 to-purple-50 p-6 rounded-lg mb-8 inline-block shadow-sm border border-violet-100"
      >
        <div className="text-left">
          <div className="flex justify-between mb-3">
            <span className="text-sm text-gray-500">Verification ID</span>
            <span className="text-sm font-medium">KYC-10052025-001</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-sm text-gray-500">Name</span>
            <span className="text-sm font-medium">{extractedData.name}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-sm text-gray-500">Aadhaar Number</span>
            <span className="text-sm font-medium">{extractedData.aadhaarNumber}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-sm text-gray-500">Status</span>
            <span className="text-sm font-medium text-green-600">Approved</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-sm text-gray-500">Completed On</span>
            <span className="text-sm font-medium">May 10, 2025</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Security Score</span>
            <span className="text-sm font-medium text-violet-600">98/100</span>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col items-center space-y-4">
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex items-center" onClick={handleDownloadCertificate}>
            <Download className="h-4 w-4 mr-1" />
            Download Certificate
          </Button>
          <Button variant="outline" size="sm" className="flex items-center" onClick={handleShareResults}>
            <Share2 className="h-4 w-4 mr-1" />
            Share Results
          </Button>
        </div>

        <div className="bg-violet-50 p-4 rounded-lg max-w-md mt-6">
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-violet-600 mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-violet-800">Verification Valid For 1 Year</p>
              <p className="text-sm text-violet-700">Your KYC verification is valid until May 10, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
