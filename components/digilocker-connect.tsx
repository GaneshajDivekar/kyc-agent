"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Shield, Lock, Loader2, Smartphone, QrCode } from "lucide-react"

interface DigilockerConnectProps {
  connected: boolean
  aadhaarData: any
}

export default function DigilockerConnect({ connected, aadhaarData }: DigilockerConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [connectionProgress, setConnectionProgress] = useState(0)
  const [localConnected, setLocalConnected] = useState(connected)
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
  const [otpSent, setOtpSent] = useState(false)
  const [verifyingOtp, setVerifyingOtp] = useState(false)

  useEffect(() => {
    setLocalConnected(connected)
  }, [connected])

  const handleConnect = () => {
    setIsConnecting(true)

    // Simulate connection progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setConnectionProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setLocalConnected(true)
      }
    }, 100)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleSendOtp = () => {
    setOtpSent(true)
  }

  const handleVerifyOtp = () => {
    setVerifyingOtp(true)
    setTimeout(() => {
      setVerifyingOtp(false)
      handleConnect()
    }, 2000)
  }

  const toggleQRCode = () => {
    setShowQR(!showQR)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Connect with DigiLocker</h2>
        <p className="text-gray-600">Access and verify your government-issued documents securely</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
            <img src="/placeholder.svg?height=80&width=240" alt="DigiLocker Logo" className="h-16" />
          </div>
          <p className="text-sm text-gray-600 max-w-md">
            DigiLocker is a platform for issuance and verification of documents & certificates digitally.
          </p>
        </div>

        {!localConnected ? (
          <div className="space-y-4">
            {isConnecting ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="text-center mb-4">
                  <p className="font-medium mb-2">Connecting to DigiLocker</p>
                  <p className="text-sm text-gray-600 mb-4">Please wait while we establish a secure connection</p>
                  <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div
                      className="absolute top-0 left-0 h-full bg-violet-600 transition-all duration-300"
                      style={{ width: `${connectionProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">{connectionProgress}% complete</p>
                </div>

                <div className="flex justify-center items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-violet-600 animate-pulse"></div>
                  <div
                    className="w-3 h-3 rounded-full bg-violet-600 animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-3 h-3 rounded-full bg-violet-600 animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </motion.div>
            ) : (
              <Tabs defaultValue="mobile" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="mobile">Mobile OTP</TabsTrigger>
                  <TabsTrigger value="qrcode">QR Code</TabsTrigger>
                </TabsList>

                <TabsContent value="mobile" className="space-y-4">
                  {!otpSent ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="mobile">Mobile Number</Label>
                        <Input
                          id="mobile"
                          placeholder="Enter your registered mobile number"
                          defaultValue={aadhaarData.mobile}
                        />
                      </div>
                      <div>
                        <Label htmlFor="aadhaar">Aadhaar Number</Label>
                        <Input
                          id="aadhaar"
                          placeholder="Enter your 12-digit Aadhaar number"
                          defaultValue={aadhaarData.aadhaarNumber.replace(/\s/g, "")}
                        />
                      </div>

                      <div className="flex justify-center">
                        <Button onClick={handleSendOtp} className="bg-violet-600 hover:bg-violet-700 w-full">
                          <Smartphone className="mr-2 h-4 w-4" />
                          Send OTP
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      <div className="text-center mb-2">
                        <p className="font-medium">Enter OTP sent to {aadhaarData.mobile}</p>
                        <p className="text-sm text-gray-600">OTP will expire in 10:00 minutes</p>
                      </div>

                      <div className="flex justify-center gap-2 my-6">
                        {otp.map((digit, index) => (
                          <Input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            className="w-10 h-12 text-center text-lg"
                          />
                        ))}
                      </div>

                      <div className="flex justify-center">
                        <Button
                          onClick={handleVerifyOtp}
                          className="bg-violet-600 hover:bg-violet-700 w-full"
                          disabled={otp.join("").length !== 6 || verifyingOtp}
                        >
                          {verifyingOtp ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Verifying...
                            </>
                          ) : (
                            <>
                              <Lock className="mr-2 h-4 w-4" />
                              Verify OTP
                            </>
                          )}
                        </Button>
                      </div>

                      <p className="text-center text-sm text-gray-600">
                        Didn't receive OTP? <button className="text-violet-600 hover:underline">Resend</button>
                      </p>
                    </motion.div>
                  )}
                </TabsContent>

                <TabsContent value="qrcode" className="space-y-4">
                  <div className="flex flex-col items-center">
                    <div className="bg-white p-4 border rounded-lg mb-4">
                      <img src="/placeholder.svg?height=200&width=200" alt="DigiLocker QR Code" className="w-48 h-48" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4 text-center">
                      Scan this QR code with the DigiLocker app to connect your account
                    </p>
                    <Button onClick={handleConnect} className="bg-violet-600 hover:bg-violet-700">
                      <QrCode className="mr-2 h-4 w-4" />
                      I've Scanned the QR Code
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-green-800">DigiLocker Connected Successfully</p>
                <p className="text-sm text-green-700">Your DigiLocker account has been linked.</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg divide-y">
              <div className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">Aadhaar Card</p>
                  <p className="text-sm text-gray-500">Issued by UIDAI</p>
                </div>
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">PAN Card</p>
                  <p className="text-sm text-gray-500">Issued by Income Tax Department</p>
                </div>
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">Driving License</p>
                  <p className="text-sm text-gray-500">Issued by Transport Department</p>
                </div>
                <Check className="h-5 w-5 text-green-500" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              className="bg-violet-50 p-4 rounded-lg flex items-start"
            >
              <Shield className="h-5 w-5 text-violet-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-violet-800">Documents Verified by DigiLocker</p>
                <p className="text-sm text-violet-700">All documents have been verified against government records.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
