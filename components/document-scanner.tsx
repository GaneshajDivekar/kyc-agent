"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Camera, RefreshCw } from "lucide-react"

interface DocumentScannerProps {
  onCapture: (imageSrc: string) => void
}

export default function DocumentScanner({ onCapture }: DocumentScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [isCaptured, setIsCaptured] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setIsStreaming(true)
          setCameraError(null)
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
        setCameraError("Could not access camera. Please check permissions or try uploading a file instead.")
      }
    }

    startCamera()

    return () => {
      // Clean up the video stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        const tracks = stream.getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [])

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
      }
    }
  }

  const retakePhoto = () => {
    setCapturedImage(null)
    setIsCaptured(false)
  }

  const confirmCapture = () => {
    if (capturedImage) {
      onCapture(capturedImage)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setCapturedImage(event.target.result as string)
          setIsCaptured(true)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg">
      <div className="relative w-full max-w-md h-80 bg-black rounded-lg overflow-hidden mb-4">
        {cameraError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 p-4 text-center">
            <div>
              <p className="text-red-500 mb-4">{cameraError}</p>
              <label className="bg-teal-600 text-white px-4 py-2 rounded-md cursor-pointer">
                Upload Image Instead
                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
              </label>
            </div>
          </div>
        ) : !isCaptured ? (
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
        ) : (
          <img src={capturedImage || ""} alt="Captured document" className="w-full h-full object-contain" />
        )}

        {/* Overlay with document outline */}
        {!isCaptured && !cameraError && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="border-2 border-dashed border-white w-[90%] h-[70%] rounded-md opacity-70"></div>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="flex gap-4 mt-2">
        {!isCaptured ? (
          <>
            <Button
              onClick={captureImage}
              className="bg-teal-600 hover:bg-teal-700"
              disabled={!isStreaming || !!cameraError}
            >
              <Camera className="mr-2 h-4 w-4" />
              Capture Document
            </Button>
            {!cameraError && (
              <label className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 cursor-pointer">
                Upload Instead
                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
              </label>
            )}
          </>
        ) : (
          <>
            <Button variant="outline" onClick={retakePhoto}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Retake
            </Button>
            <Button onClick={confirmCapture} className="bg-teal-600 hover:bg-teal-700">
              Confirm & Process
            </Button>
          </>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p className="text-center">Position your Aadhaar card within the frame and ensure good lighting</p>
      </div>
    </div>
  )
}
