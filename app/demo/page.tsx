"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, Upload, FileText, Loader2, Camera, X, Shield, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import DocumentScanner from "@/components/document-scanner"
import FaceVerification from "@/components/face-verification"
import DigilockerConnect from "@/components/digilocker-connect"
import VerificationComplete from "@/components/verification-complete"
import AnimatedHeaderSignature from "@/components/animated-header-signature"

const steps = [
  { id: "upload", title: "Upload Documents" },
  { id: "face", title: "Face Verification" },
  { id: "digilocker", title: "DigiLocker Connect" },
  { id: "review", title: "Review & Submit" },
  { id: "complete", title: "Complete" },
]

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([])
  const [verificationStatus, setVerificationStatus] = useState<Record<string, boolean>>({})
  const [digilockerConnected, setDigilockerConnected] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [extractedData, setExtractedData] = useState<any>(null)
  const [processingDoc, setProcessingDoc] = useState(false)
  const [faceVerified, setFaceVerified] = useState(false)
  const [faceImage, setFaceImage] = useState<string | null>(null)

  // Aadhaar data from the provided card


  const handleNext = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (currentStep === 0) {
        if (capturedImage) {
          setUploadedDocs(["Aadhar Card"])
        } else {
          setUploadedDocs(["Aadhar Card"])
        }
        setExtractedData(aadhaarData)
      } else if (currentStep === 1) {
        setVerificationStatus({
          "Face Match": true,
          "Liveness Detection": true,
          "Identity Confirmation": true,
        })
        setFaceVerified(true)
      } else if (currentStep === 2) {
        setDigilockerConnected(true)
      } else if (currentStep === 3) {
        setCompleted(true)
      }
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }, 2000)
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleCameraToggle = () => {
    setShowCamera(!showCamera)
  }

  const handleCapture = (imageSrc: string) => {
    setCapturedImage(imageSrc)
    setShowCamera(false)
    setProcessingDoc(true)

    // Simulate document processing
    setTimeout(() => {
      setProcessingDoc(false)
      setUploadedDocs(["Aadhar Card"])
    }, 3000)
  }

  const handleFaceCapture = (imageSrc: string) => {
    setFaceImage(imageSrc)
  }

  const handleFaceVerificationComplete = () => {
    setFaceVerified(true)
    setVerificationStatus({
      "Face Match": true,
      "Liveness Detection": true,
      "Identity Confirmation": true,
    })
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <UploadDocumentsStep
            uploadedDocs={uploadedDocs}
            showCamera={showCamera}
            onCameraToggle={handleCameraToggle}
            onCapture={handleCapture}
            capturedImage={capturedImage}
            processingDoc={processingDoc}
            extractedData={extractedData}
          />
        )
      case 1:
        return (
          <FaceVerification
            onCapture={handleFaceCapture}
            faceImage={faceImage}
            verificationStatus={verificationStatus}
            faceVerified={faceVerified}
            onVerificationComplete={handleFaceVerificationComplete}
          />
        )
      case 2:
        return <DigilockerConnect connected={digilockerConnected} aadhaarData={aadhaarData} />
      case 3:
        return (
          <ReviewSubmitStep
            uploadedDocs={uploadedDocs}
            verificationStatus={verificationStatus}
            digilockerConnected={digilockerConnected}
            extractedData={extractedData || aadhaarData}
            faceVerified={faceVerified}
          />
        )
      case 4:
        return <VerificationComplete extractedData={extractedData || aadhaarData} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto relative">
        <div className="mb-8 flex justify-between items-center">
          <Link href="/" className="inline-flex items-center text-violet-600 hover:text-violet-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          {/* Animated signature in header */}
          <div className="relative h-16 w-64">
            <AnimatedHeaderSignature />
          </div>
        </div>

        <Card className="border-0 shadow-lg overflow-hidden">
          <CardContent className="p-0">
            {/* Progress Header */}
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-6 rounded-t-lg">
              <h1 className="text-2xl font-bold mb-6">AI KYC Verification</h1>
              <div className="space-y-6">
                <Progress value={(currentStep / (steps.length - 1)) * 100} className="h-2 bg-violet-400" />
                <div className="grid grid-cols-5 gap-2">
                  {steps.map((step, index) => (
                    <div key={step.id} className="text-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                          index < currentStep
                            ? "bg-white text-violet-600"
                            : index === currentStep
                              ? "bg-violet-100 text-violet-600 border-2 border-white"
                              : "bg-violet-500 text-violet-100"
                        }`}
                      >
                        {index < currentStep ? <Check className="h-5 w-5" /> : <span>{index + 1}</span>}
                      </div>
                      <p className={`text-xs ${index === currentStep ? "font-medium" : "font-normal opacity-80"}`}>
                        {step.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step Content */}
            <div className="p-6">
              {renderStepContent()}

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0 || loading}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={
                      loading ||
                      (currentStep === 0 && uploadedDocs.length === 0 && !capturedImage) ||
                      (currentStep === 1 && !faceVerified)
                    }
                    className="bg-violet-600 hover:bg-violet-700"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {currentStep === 3 ? "Complete Verification" : "Next Step"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              )}

              {currentStep === 4 && (
                <div className="flex justify-center mt-8">
                  <Button asChild className="bg-violet-600 hover:bg-violet-700">
                    <Link href="/">Return to Home</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function UploadDocumentsStep({
  uploadedDocs,
  showCamera,
  onCameraToggle,
  onCapture,
  capturedImage,
  processingDoc,
  extractedData,
}: {
  uploadedDocs: string[]
  showCamera: boolean
  onCameraToggle: () => void
  onCapture: (imageSrc: string) => void
  capturedImage: string | null
  processingDoc: boolean
  extractedData: any
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropAreaRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const dropArea = dropAreaRef.current
    if (!dropArea) return

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(true)
    }

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0]
        if (file.type.startsWith("image/")) {
          const reader = new FileReader()
          reader.onload = (event) => {
            if (event.target?.result) {
              onCapture(event.target.result as string)
            }
          }
          reader.readAsDataURL(file)
        }
      }
    }

    dropArea.addEventListener("dragover", handleDragOver)
    dropArea.addEventListener("dragleave", handleDragLeave)
    dropArea.addEventListener("drop", handleDrop)

    return () => {
      dropArea.removeEventListener("dragover", handleDragOver)
      dropArea.removeEventListener("dragleave", handleDragLeave)
      dropArea.removeEventListener("drop", handleDrop)
    }
  }, [onCapture])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          onCapture(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Upload Your Documents</h2>
        <p className="text-gray-600">Please upload clear images of your identification documents</p>
      </div>

      {showCamera ? (
        <div className="relative">
          <button onClick={onCameraToggle} className="absolute top-2 right-2 z-10 bg-white p-1 rounded-full shadow-md">
            <X className="h-5 w-5 text-gray-600" />
          </button>
          <DocumentScanner onCapture={onCapture} />
        </div>
      ) : (
        <div className="space-y-6">
          {capturedImage ? (
            <div className="border-2 border-violet-500 rounded-lg p-4">
              <div className="flex flex-col items-center">
                <div className="relative w-full max-w-md h-64 mb-4 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={capturedImage || "/placeholder.svg"}
                    alt="Captured Aadhaar"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="font-medium mb-1">Aadhaar Card</p>
                {processingDoc ? (
                  <div className="flex items-center text-violet-600">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span>Processing document with AI...</span>
                  </div>
                ) : (
                  <div className="space-y-4 w-full">
                    <p className="text-sm text-green-600 flex items-center justify-center">
                      <Check className="h-4 w-4 mr-1" /> Document processed successfully
                    </p>

                    {extractedData && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-violet-50 p-4 rounded-lg border border-violet-100"
                      >
                        <div className="flex items-start mb-3">
                          <Brain className="h-5 w-5 text-violet-600 mr-2 mt-0.5" />
                          <p className="font-medium text-violet-800">AI Data Extraction</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-gray-500">Name:</div>
                          <div className="font-medium">{extractedData.name}</div>
                          <div className="text-gray-500">Aadhaar Number:</div>
                          <div className="font-medium">{extractedData.aadhaarNumber}</div>
                          <div className="text-gray-500">Date of Birth:</div>
                          <div className="font-medium">{extractedData.dob}</div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              {/* Drag & Drop Upload */}
              <div
                ref={dropAreaRef}
                className={`border-2 ${
                  isDragging ? "border-violet-500 bg-violet-50" : "border-dashed border-violet-300"
                } rounded-lg p-8 text-center transition-colors cursor-pointer`}
                onClick={triggerFileInput}
              >
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
                <div className="flex flex-col items-center">
                  <Upload className="h-12 w-12 text-violet-600 mb-4" />
                  <p className="font-bold text-lg mb-2">Upload Aadhaar Card</p>
                  <p className="text-sm text-gray-600 mb-4">Drag and drop your file here or click to browse</p>
                  <Button className="bg-violet-600 hover:bg-violet-700" onClick={triggerFileInput}>
                    Select File
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-500 mb-2">- OR -</p>
              </div>

              {/* Camera Option */}
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-violet-500 transition-colors cursor-pointer"
                onClick={onCameraToggle}
              >
                <div className="flex flex-col items-center">
                  <Camera className="h-10 w-10 text-gray-500 mb-3" />
                  <p className="font-medium mb-1">Use Camera</p>
                  <p className="text-sm text-gray-500 mb-3">Take a photo of your Aadhaar card</p>
                  <Button variant="outline" size="sm" onClick={onCameraToggle}>
                    Open Camera
                  </Button>
                </div>
              </div>
            </div>
          )}

          {uploadedDocs.length > 0 && !capturedImage && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Uploaded Documents</h3>
              <div className="space-y-3">
                {uploadedDocs.map((doc, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center p-3 bg-violet-50 rounded-md"
                  >
                    <FileText className="h-5 w-5 text-violet-600 mr-3" />
                    <div>
                      <p className="font-medium text-sm">{doc}</p>
                      <p className="text-xs text-gray-500">Uploaded successfully</p>
                    </div>
                    <Check className="h-5 w-5 text-green-500 ml-auto" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function ReviewSubmitStep({
  uploadedDocs,
  verificationStatus,
  digilockerConnected,
  extractedData,
  faceVerified,
}: {
  uploadedDocs: string[]
  verificationStatus: Record<string, boolean>
  digilockerConnected: boolean
  extractedData: any
  faceVerified: boolean
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Review & Submit</h2>
        <p className="text-gray-600">Please review your information before final submission</p>
      </div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-violet-50 p-4 rounded-lg border border-violet-100"
        >
          <div className="flex items-start mb-3">
            <Brain className="h-5 w-5 text-violet-600 mr-2 mt-0.5" />
            <p className="font-medium text-violet-800">AI Verification Summary</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Document Authenticity</span>
              <span className="text-sm text-green-600 flex items-center">
                <Check className="h-4 w-4 mr-1" /> Verified
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Face Verification</span>
              <span className="text-sm text-green-600 flex items-center">
                <Check className="h-4 w-4 mr-1" /> Verified
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">DigiLocker Connection</span>
              <span className="text-sm text-green-600 flex items-center">
                <Check className="h-4 w-4 mr-1" /> Verified
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Fraud Risk Assessment</span>
              <span className="text-sm text-green-600 flex items-center">
                <Check className="h-4 w-4 mr-1" /> Low Risk
              </span>
            </div>
          </div>
        </motion.div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3">Personal Information</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-gray-500">Name:</div>
              <div className="text-sm font-medium">{extractedData.name}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-gray-500">Aadhaar Number:</div>
              <div className="text-sm font-medium">{extractedData.aadhaarNumber}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-gray-500">Date of Birth:</div>
              <div className="text-sm font-medium">{extractedData.dob}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-gray-500">Gender:</div>
              <div className="text-sm font-medium">{extractedData.gender}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-gray-500">Address:</div>
              <div className="text-sm font-medium">{extractedData.address}</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3">Uploaded Documents</h3>
          <div className="space-y-2">
            {uploadedDocs.map((doc, index) => (
              <div key={index} className="flex items-center">
                <FileText className="h-4 w-4 text-violet-600 mr-2" />
                <span className="text-sm">{doc}</span>
                <Check className="h-4 w-4 text-green-500 ml-auto" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-violet-50 p-4 rounded-lg">
          <div className="flex items-start">
            <Shield className="h-5 w-5 text-violet-600 mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-violet-800">All Verification Steps Complete</p>
              <p className="text-sm text-violet-700">You can now submit your KYC verification.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
