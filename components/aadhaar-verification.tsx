"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Check, AlertCircle } from "lucide-react"

interface AadhaarVerificationProps {
  data: {
    name: string
    nameLocal: string
    aadhaarNumber: string
    vid: string
    dob: string
    gender: string
    address: string
    addressLocal: string
    mobile: string
    enrollmentNo: string
    issuedDate: string
    detailsAsOn: string
  }
}

export default function AadhaarVerification({ data }: AadhaarVerificationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-4"
    >
      <h3 className="text-lg font-semibold">Extracted Aadhaar Information</h3>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Name</h4>
                <div className="flex items-center">
                  <p className="font-medium">{data.name}</p>
                  <Check className="h-4 w-4 text-green-500 ml-2" />
                </div>
                <p className="text-sm text-gray-600">{data.nameLocal}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Aadhaar Number</h4>
                <div className="flex items-center">
                  <p className="font-medium">{data.aadhaarNumber}</p>
                  <Check className="h-4 w-4 text-green-500 ml-2" />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Virtual ID (VID)</h4>
                <p className="font-medium">{data.vid}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Date of Birth</h4>
                  <div className="flex items-center">
                    <p className="font-medium">{data.dob}</p>
                    <Check className="h-4 w-4 text-green-500 ml-2" />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Gender</h4>
                  <p className="font-medium">{data.gender}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Address</h4>
                <div className="flex items-start">
                  <div>
                    <p className="font-medium text-sm">{data.address}</p>
                    <p className="text-xs text-gray-600 mt-1">{data.addressLocal}</p>
                  </div>
                  <Check className="h-4 w-4 text-green-500 ml-2 mt-1 shrink-0" />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Mobile Number</h4>
                <p className="font-medium">{data.mobile}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Enrollment No.</h4>
                  <p className="font-medium">{data.enrollmentNo}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Issued Date</h4>
                  <p className="font-medium">{data.issuedDate}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Details As On</h4>
                <p className="font-medium">{data.detailsAsOn}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-green-50 p-3 rounded-md flex items-start">
            <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
            <div>
              <p className="font-medium text-green-800">Aadhaar Verification Successful</p>
              <p className="text-sm text-green-700">All data has been successfully extracted and verified.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center text-amber-600 text-sm">
        <AlertCircle className="h-4 w-4 mr-2" />
        <p>This is a demo. In a real application, this data would be securely processed and stored.</p>
      </div>
    </motion.div>
  )
}
