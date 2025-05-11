"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Brain, Sparkles, Shield, Scan, AlertTriangle } from "lucide-react"

export default function AiFeatures() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-violet-600" />,
      title: "Neural Network Analysis",
      description: "Our advanced neural networks analyze document patterns and detect anomalies with 99.9% accuracy.",
      animation: (
        <div className="relative h-full w-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-32">
              {/* Brain nodes */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-violet-500 rounded-full"
                  style={{
                    top: `${20 + Math.sin(i) * 50}%`,
                    left: `${20 + Math.cos(i) * 50}%`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                {[...Array(15)].map((_, i) => {
                  const startNode = Math.floor(Math.random() * 12)
                  const endNode = Math.floor(Math.random() * 12)
                  return (
                    <motion.path
                      key={i}
                      d={`M ${20 + Math.sin(startNode) * 50} ${20 + Math.cos(startNode) * 50} 
                         C ${50} ${50}, ${50} ${50}, 
                         ${20 + Math.sin(endNode) * 50} ${20 + Math.cos(endNode) * 50}`}
                      stroke="rgba(139, 92, 246, 0.3)"
                      strokeWidth="1"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: 1,
                        opacity: [0, 0.5, 0],
                        transition: {
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.3,
                        },
                      }}
                    />
                  )
                })}
              </svg>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: <Sparkles className="h-8 w-8 text-violet-600" />,
      title: "Real-time Document Enhancement",
      description: "AI automatically enhances document quality, corrects orientation, and improves readability.",
      animation: (
        <div className="relative h-full w-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-64 bg-white rounded-lg shadow-md overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-violet-100 to-purple-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />

              {/* Document content */}
              <div className="absolute inset-0 p-4 flex flex-col">
                <div className="w-full h-1/3 bg-gray-200 rounded-md mb-3"></div>
                <div className="w-3/4 h-2 bg-gray-200 rounded-md mb-2"></div>
                <div className="w-full h-2 bg-gray-200 rounded-md mb-2"></div>
                <div className="w-5/6 h-2 bg-gray-200 rounded-md mb-2"></div>
                <div className="w-4/5 h-2 bg-gray-200 rounded-md mb-4"></div>
                <div className="w-full h-2 bg-gray-200 rounded-md mb-2"></div>
                <div className="w-3/4 h-2 bg-gray-200 rounded-md"></div>
              </div>

              {/* Enhancement effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 200, opacity: 0.7 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
              />

              {/* Sparkles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-violet-400 rounded-full"
                  style={{
                    top: `${10 + Math.random() * 80}%`,
                    left: `${10 + Math.random() * 80}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: <Shield className="h-8 w-8 text-violet-600" />,
      title: "Fraud Detection System",
      description: "AI-powered fraud detection identifies manipulated documents and suspicious patterns in real-time.",
      animation: (
        <div className="relative h-full w-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Shield */}
              <motion.div
                className="absolute inset-0 bg-violet-100 rounded-full"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />

              <motion.div
                className="absolute inset-4 border-4 border-violet-400 rounded-full"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />

              {/* Scanning effect */}
              <motion.div
                className="absolute inset-8 bg-violet-500 rounded-full opacity-20"
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />

              {/* Alert symbols */}
              <motion.div
                className="absolute top-1/4 left-1/4"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 1,
                }}
              >
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </motion.div>

              <motion.div
                className="absolute bottom-1/4 right-1/4"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 1.5,
                }}
              >
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </motion.div>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: <Scan className="h-8 w-8 text-violet-600" />,
      title: "Biometric Verification",
      description: "Advanced facial recognition and liveness detection ensure the person is who they claim to be.",
      animation: (
        <div className="relative h-full w-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-48 rounded-full bg-gray-200 overflow-hidden">
              {/* Face silhouette */}
              <div className="absolute inset-4 rounded-full bg-gray-300"></div>

              {/* Scanning effect */}
              <motion.div
                className="absolute inset-0 h-1 bg-violet-500 opacity-70"
                animate={{
                  top: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />

              {/* Face detection points */}
              {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * Math.PI * 2
                const radius = 20
                return (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-violet-500 rounded-full"
                    style={{
                      top: `calc(50% + ${Math.sin(angle) * radius}%)`,
                      left: `calc(50% + ${Math.cos(angle) * radius}%)`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.1,
                    }}
                  />
                )
              })}

              {/* Face grid */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <motion.path
                  d="M 30 30 L 70 30 L 70 70 L 30 70 Z"
                  stroke="rgba(139, 92, 246, 0.5)"
                  strokeWidth="0.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.path
                  d="M 40 40 L 60 40 L 60 60 L 40 60 Z"
                  stroke="rgba(139, 92, 246, 0.5)"
                  strokeWidth="0.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.path
                  d="M 50 30 L 50 70"
                  stroke="rgba(139, 92, 246, 0.5)"
                  strokeWidth="0.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.path
                  d="M 30 50 L 70 50"
                  stroke="rgba(139, 92, 246, 0.5)"
                  strokeWidth="0.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1.5, repeat: Number.POSITIVE_INFINITY }}
                />
              </svg>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
              activeFeature === index ? "bg-white shadow-lg" : "bg-transparent hover:bg-white/50"
            }`}
            onClick={() => setActiveFeature(index)}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start">
              <div className="mr-4 mt-1">{feature.icon}</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[400px]">{features[activeFeature].animation}</div>
    </div>
  )
}
