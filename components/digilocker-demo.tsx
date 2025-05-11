"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Check, FileText, Shield, Lock } from "lucide-react"

export default function DigilockerDemo() {
  const [connected, setConnected] = useState(false)

  const handleConnect = () => {
    setConnected(true)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">DigiLocker Benefits</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="mr-3 mt-1 bg-teal-100 p-1 rounded-full">
                <Shield className="h-4 w-4 text-teal-600" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Secure Document Access</h4>
                <p className="text-sm text-gray-600">
                  Access your government-issued documents securely without physical copies.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-3 mt-1 bg-teal-100 p-1 rounded-full">
                <Check className="h-4 w-4 text-teal-600" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Instant Verification</h4>
                <p className="text-sm text-gray-600">
                  Verify your identity instantly with authentic government documents.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-3 mt-1 bg-teal-100 p-1 rounded-full">
                <Lock className="h-4 w-4 text-teal-600" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Privacy Control</h4>
                <p className="text-sm text-gray-600">You control what documents are shared and with whom.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-3 mt-1 bg-teal-100 p-1 rounded-full">
                <FileText className="h-4 w-4 text-teal-600" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Digital Document Storage</h4>
                <p className="text-sm text-gray-600">
                  Store all your important documents digitally in one secure place.
                </p>
              </div>
            </li>
          </ul>

          {!connected && (
            <Button onClick={handleConnect} className="mt-6 bg-teal-600 hover:bg-teal-700">
              Connect DigiLocker <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        <div>
          <Card className="border-0 shadow-md overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-teal-600 p-4 text-white">
                <div className="flex items-center">
                  <img src="/placeholder.svg?height=40&width=120" alt="DigiLocker" className="h-10" />
                  <div className="ml-auto text-sm">{connected ? "Connected" : "Not Connected"}</div>
                </div>
              </div>

              {!connected ? (
                <div className="p-6 text-center">
                  <img src="/placeholder.svg?height=120&width=120" alt="DigiLocker" className="h-30 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Connect Your DigiLocker</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Access your government-issued documents securely for instant verification.
                  </p>
                  <Button onClick={handleConnect} className="bg-blue-600 hover:bg-blue-700">
                    Connect Now
                  </Button>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <Tabs defaultValue="documents" className="w-full">
                    <div className="px-4 pt-4">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="documents">Documents</TabsTrigger>
                        <TabsTrigger value="issued">Issued Documents</TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value="documents" className="p-4">
                      <div className="space-y-3">
                        <DocumentItem title="Aadhaar Card" issuer="UIDAI" date="15 Jan 2022" />
                        <DocumentItem title="PAN Card" issuer="Income Tax Department" date="03 Mar 2021" />
                        <DocumentItem title="Driving License" issuer="Transport Department" date="22 Nov 2023" />
                        <DocumentItem title="Voter ID" issuer="Election Commission" date="10 Apr 2020" />
                      </div>
                    </TabsContent>

                    <TabsContent value="issued" className="p-4">
                      <div className="space-y-3">
                        <DocumentItem title="Income Certificate" issuer="Revenue Department" date="05 May 2023" />
                        <DocumentItem title="Domicile Certificate" issuer="State Government" date="18 Jul 2022" />
                      </div>
                    </TabsContent>
                  </Tabs>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function DocumentItem({ title, issuer, date }: { title: string; issuer: string; date: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
    >
      <FileText className="h-5 w-5 text-teal-600 mr-3" />
      <div>
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-gray-500">
          Issued by: {issuer} • {date}
        </p>
      </div>
      <Check className="h-5 w-5 text-green-500 ml-auto" />
    </motion.div>
  )
}
