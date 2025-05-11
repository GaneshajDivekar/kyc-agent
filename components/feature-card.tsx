"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="border-0 shadow-md h-full">
        <CardContent className="pt-6">
          <div className="mb-4 p-2 inline-flex items-center justify-center rounded-full bg-violet-100">{icon}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
