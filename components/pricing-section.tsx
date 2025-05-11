"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Check } from "lucide-react"

export default function PricingSection() {
  const [annual, setAnnual] = useState(false)

  const toggleBilling = () => {
    setAnnual(!annual)
  }

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses just getting started",
      monthlyPrice: 49,
      annualPrice: 39,
      features: [
        "Up to 100 verifications per month",
        "Basic document extraction",
        "Email support",
        "DigiLocker integration",
        "48-hour verification time",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses with moderate volume",
      monthlyPrice: 99,
      annualPrice: 79,
      features: [
        "Up to 500 verifications per month",
        "Advanced document extraction",
        "Priority email & chat support",
        "DigiLocker integration",
        "24-hour verification time",
        "Custom branding",
        "API access",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations with high volume needs",
      monthlyPrice: 249,
      annualPrice: 199,
      features: [
        "Unlimited verifications",
        "Advanced document extraction",
        "24/7 priority support",
        "DigiLocker integration",
        "Real-time verification",
        "Custom branding",
        "Full API access",
        "Dedicated account manager",
        "Custom integrations",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-center mb-12">
        <div className="flex items-center space-x-3 bg-gray-100 p-1 rounded-full">
          <span className={`px-4 py-2 rounded-full ${!annual ? "bg-white shadow-sm" : ""}`}>Monthly</span>
          <Switch checked={annual} onCheckedChange={toggleBilling} />
          <span className={`px-4 py-2 rounded-full ${annual ? "bg-white shadow-sm" : ""}`}>
            Annually <span className="text-xs text-teal-600 font-medium">Save 20%</span>
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className={`h-full flex flex-col ${plan.popular ? "border-teal-200 shadow-lg" : "border-gray-200"}`}>
              {plan.popular && (
                <div className="bg-teal-600 text-white text-center text-sm py-1 font-medium">Most Popular</div>
              )}
              <CardHeader className="pb-0">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <span className="text-4xl font-bold">₹{annual ? plan.annualPrice : plan.monthlyPrice}</span>
                  <span className="text-gray-500 ml-2">/month</span>
                  {annual && <p className="text-sm text-teal-600 mt-1">Billed annually</p>}
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-2 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  className={`w-full ${plan.popular ? "bg-teal-600 hover:bg-teal-700" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
