"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Camera, Check, RefreshCw, Loader2, Scan, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface FaceVerificationProps {
  onCapture: (imageSrc: string) => void
  faceImage: string | null
  verificationStatus: Record<string, boolean>
  faceVerified: boolean
  onVerificationComplete: () => void
}

export default function FaceVerification({
  onCapture,
  faceImage,
  verificationStatus,
  faceVerified,
  onVerificationComplete,
}: FaceVerificationProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [isCaptured, setIsCaptured] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [faceDetected, setFaceDetected] = useState(false)
  const [facePosition, setFacePosition] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [livenessChecks, setLivenessChecks] = useState<string[]>([])
  const [currentCheck, setCurrentCheck] = useState<string | null>(null)
  const [checkProgress, setCheckProgress] = useState(0)
  const [checkComplete, setCheckComplete] = useState(false)
  const [localVerified, setLocalVerified] = useState(faceVerified)

  useEffect(() => {
    setLocalVerified(faceVerified)
  }, [faceVerified])

  useEffect(() => {
    if (faceImage) {
      setCapturedImage(faceImage)
      setIsCaptured(true)
      return
    }

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setIsStreaming(true)
          setCameraError(null)
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
        setCameraError("Could not access camera. Please check permissions.")
      }
    }

    startCamera()

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        const tracks = stream.getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [faceImage])

  useEffect(() => {
    if (isStreaming && !isCaptured && !analyzing) {
      const detectFaceInterval = setInterval(() => {
        // Simulate face detection
        const detected = Math.random() > 0.3
        setFaceDetected(detected)

        if (detected) {
          // Simulate face position
          setFacePosition({
            x: 20 + Math.random() * 10,
            y: 20 + Math.random() * 10,
            width: 60 - Math.random() * 10,
            height: 60 - Math.random() * 10,
          })
        }
      }, 500)

      return () => clearInterval(detectFaceInterval)
    }
  }, [isStreaming, isCaptured, analyzing])

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Draw the current video frame on the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Convert canvas to data URL
        const imageSrc = canvas.toDataURL("image/png")
        setCapturedImage(imageSrc)
        setIsCaptured(true)
        onCapture(imageSrc)
      }
    }
  }

  const retakePhoto = () => {
    setCapturedImage(null)
    setIsCaptured(false)
    setAnalyzing(false)
    setCheckComplete(false)
    setLivenessChecks([])
    setCurrentCheck(null)
    setCheckProgress(0)
    setLocalVerified(false)
  }

  const startVerification = () => {
    setAnalyzing(true)
    setLivenessChecks([])
    setCurrentCheck("Analyzing facial features")
    setCheckProgress(0)

    // Simulate liveness detection checks
    const checks = [
      "Analyzing facial features",
      "Performing liveness detection",
      "Checking for spoofing attempts",
      "Matching with document photo",
      "Verifying identity",
    ]

    let currentCheckIndex = 0
    const checkInterval = setInterval(() => {
      if (currentCheckIndex < checks.length) {
        setCurrentCheck(checks[currentCheckIndex])
        setLivenessChecks((prev) => [...prev, checks[currentCheckIndex]])
        currentCheckIndex++

        // Progress animation
        let progress = 0
        const progressInterval = setInterval(() => {
          progress += 5
          setCheckProgress(progress)
          if (progress >= 100) {
            clearInterval(progressInterval)
            if (currentCheckIndex === checks.length) {
              setCheckComplete(true)
              clearInterval(checkInterval)

              // Set verification complete after all checks
              setTimeout(() => {
                setLocalVerified(true)
                onVerificationComplete()
              }, 1000)
            }
          }
        }, 50)
      }
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Face Verification</h2>
        <p className="text-gray-600">Please look at the camera for identity verification</p>
      </div>

      <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg">
        <div className="relative w-full max-w-md h-80 bg-black rounded-lg overflow-hidden mb-4">
          {cameraError ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 p-4 text-center">
              <div>
                <p className="text-red-500 mb-4">{cameraError}</p>
                <Button className="bg-violet-600 hover:bg-violet-700">Try Again</Button>
              </div>
            </div>
          ) : !isCaptured ? (
            <>
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              {/* Face detection overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className={`border-2 rounded-full w-3/4 h-3/4 max-w-[240px] max-h-[240px] ${faceDetected ? "border-green-400" : "border-white border-dashed"}`}
                ></div>
                {faceDetected && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute"
                    style={{
                      top: `${facePosition.y}%`,
                      left: `${facePosition.x}%`,
                      width: `${facePosition.width}%`,
                      height: `${facePosition.height}%`,
                    }}
                  >
                    <div className="w-full h-full border-2 border-green-400 rounded-md"></div>
                  </motion.div>
                )}
              </div>
            </>
          ) : (
            <div className="relative w-full h-full">
              <img src={capturedImage || ""} alt="Captured face" className="w-full h-full object-contain" />

              {analyzing && !checkComplete && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-4 rounded-lg w-4/5 max-w-[300px]">
                    <div className="flex items-center mb-3">
                      <Scan className="h-5 w-5 text-violet-600 mr-2" />
                      <p className="font-medium text-gray-800">{currentCheck}</p>
                    </div>
                    <Progress value={checkProgress} className="h-2 mb-2" />
                    <div className="space-y-2 mt-4">
                      {livenessChecks.map((check, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>{check}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {checkComplete && Object.keys(verificationStatus).length === 0 && !localVerified && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-4 rounded-lg w-4/5 max-w-[300px] text-center">
                    <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="font-medium text-gray-800 mb-1">Verification Complete</p>
                    <p className="text-sm text-gray-600 mb-3">All checks passed successfully</p>
                    <div className="flex justify-center">
                      <Loader2 className="h-5 w-5 animate-spin text-violet-600" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        <div className="flex gap-4 mt-2">
          {!isCaptured ? (
            <Button
              onClick={captureImage}
              className="bg-violet-600 hover:bg-violet-700"
              disabled={!isStreaming || !!cameraError || !faceDetected}
            >
              <Camera className="mr-2 h-4 w-4" />
              Capture Photo
            </Button>
          ) : analyzing ? (
            <Button disabled className="bg-violet-600">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </Button>
          ) : checkComplete && localVerified ? (
            <Button disabled className="bg-green-600">
              <Check className="mr-2 h-4 w-4" />
              Verification Complete
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={retakePhoto}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Retake
              </Button>
              <Button onClick={startVerification} className="bg-violet-600 hover:bg-violet-700">
                Verify Identity
              </Button>
            </>
          )}
        </div>

        {!isCaptured && (
          <div className="mt-4 text-sm text-gray-600 flex items-center">
            <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
            <p>Position your face within the circle and look directly at the camera</p>
          </div>
        )}
      </div>

      {localVerified && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-sm font-medium mb-4">Verification Results</h3>
            <div className="space-y-4">
              {Object.entries(verificationStatus).map(([key, value]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-between items-center"
                >
                  <span className="text-sm font-medium">{key}</span>
                  <div className="flex items-center text-green-500">
                    <Check className="h-5 w-5 mr-1" />
                    <span className="text-sm">Verified</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start"
          >
            <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-green-800">Face Verification Successful</p>
              <p className="text-sm text-green-700">Your identity has been verified successfully.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
