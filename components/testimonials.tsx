"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Rahul Sharma",
    position: "CTO, FinTech Solutions",
    content:
      "The KYC Agent has transformed our customer onboarding process. What used to take days now takes minutes, with even better accuracy and security.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Priya Patel",
    position: "Head of Compliance, Axis Bank",
    content:
      "The DigiLocker integration is seamless and has significantly reduced our document verification time. Our compliance team is now more efficient than ever.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Vikram Mehta",
    position: "CEO, InsureTech India",
    content:
      "We've seen a 70% reduction in customer drop-offs during onboarding since implementing this KYC solution. The ROI has been exceptional.",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -left-4 md:-left-12">
        <button onClick={handlePrevious} className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50">
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 -right-4 md:-right-12">
        <button onClick={handleNext} className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50">
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-0 shadow-md">
            <CardContent className="p-8">
              <Quote className="h-10 w-10 text-teal-100 mb-4" />
              <p className="text-lg text-gray-700 mb-6">{testimonials[currentIndex].content}</p>
              <div className="flex items-center">
                <img
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonials[currentIndex].name}</h4>
                  <p className="text-sm text-gray-600">{testimonials[currentIndex].position}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-teal-600" : "bg-gray-300"}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
