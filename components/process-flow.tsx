"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, FileCheck, UserCheck, Database, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: <Upload className="h-6 w-6" />,
    title: "Document Upload",
    description: "Upload your identification documents securely through our platform.",
  },
  {
    icon: <FileCheck className="h-6 w-6" />,
    title: "Document Verification",
    description: "Our AI analyzes and verifies the authenticity of your documents.",
  },
  {
    icon: <UserCheck className="h-6 w-6" />,
    title: "Identity Verification",
    description: "Facial recognition and biometric verification ensure you are who you claim to be.",
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "DigiLocker Integration",
    description: "Connect with DigiLocker to access and verify your government-issued documents.",
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Verification Complete",
    description: "Your identity is verified and your KYC process is complete.",
  },
]

export default function ProcessFlow() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-5 gap-4 mb-12">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col items-center text-center ${
              index === activeStep ? "opacity-100" : "opacity-50"
            } transition-opacity duration-300`}
          >
            <div
              className={`
              w-12 h-12 rounded-full flex items-center justify-center mb-3
              ${index === activeStep ? "bg-violet-100 text-violet-600" : "bg-gray-100 text-gray-500"}
            `}
            >
              {step.icon}
            </div>
            <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
          </div>
        ))}
      </div>

      <div className="relative h-64 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center p-8"
          >
            <div className="text-center max-w-md">
              <div
                className={`
                w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4
                bg-violet-100 text-violet-600
              `}
              >
                {steps[activeStep].icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{steps[activeStep].title}</h3>
              <p className="text-gray-600">{steps[activeStep].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${index === activeStep ? "bg-violet-600" : "bg-gray-300"}`}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
