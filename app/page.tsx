import Link from "next/link"
import { ArrowRight, Shield, Database, FileCheck, Sparkles, Brain, Scan } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroAnimation from "@/components/hero-animation"
import FeatureCard from "@/components/feature-card"
import ProcessFlow from "@/components/process-flow"
import AiFeatures from "@/components/ai-features"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-violet-50 to-white py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-violet-100 text-violet-800 font-medium text-sm mb-4">
                AI-Powered KYC Verification
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Next-Gen <span className="text-violet-600">KYC Agent</span> with AI
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Our advanced AI-powered KYC Agent extracts, validates, and securely stores customer data with seamless
                DigiLocker integration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700" asChild>
                  <Link href="/demo">
                    Try Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/demo">Experience AI KYC</Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <HeroAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-gradient-to-r from-violet-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Verification</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our cutting-edge AI technology transforms the KYC process with intelligent automation and enhanced
              security.
            </p>
          </div>

          <AiFeatures />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced KYC Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our KYC Agent combines cutting-edge AI with secure verification processes to deliver a seamless
              experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-violet-600" />}
              title="Secure Verification"
              description="Multi-layered security protocols ensure data integrity and protection throughout the KYC process."
            />
            <FeatureCard
              icon={<Database className="h-8 w-8 text-violet-600" />}
              title="DigiLocker Integration"
              description="Seamless integration with DigiLocker for instant access to verified government documents."
            />
            <FeatureCard
              icon={<FileCheck className="h-8 w-8 text-violet-600" />}
              title="Document Extraction"
              description="AI-powered extraction of data from IDs, passports, and other documents with 99.9% accuracy."
            />
            <FeatureCard
              icon={<Sparkles className="h-8 w-8 text-violet-600" />}
              title="Real-time Analysis"
              description="Instant verification against multiple databases to ensure authenticity of customer information."
            />
            <FeatureCard
              icon={<Brain className="h-8 w-8 text-violet-600" />}
              title="AI Fraud Detection"
              description="Advanced neural networks detect potential fraud patterns and suspicious activities in real-time."
            />
            <FeatureCard
              icon={<Scan className="h-8 w-8 text-violet-600" />}
              title="Biometric Verification"
              description="Facial recognition and liveness detection ensure the person is who they claim to be."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-violet-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered process makes KYC verification simple, secure, and efficient.
            </p>
          </div>

          <ProcessFlow />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-violet-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Experience the Future of KYC</h2>
          <p className="text-violet-100 max-w-2xl mx-auto mb-8">
            Try our AI-powered KYC verification system and see the difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50" asChild>
              <Link href="/demo">Try Demo Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Copyright notice */}
      <div className="bg-gray-900 text-gray-300 py-4 text-center text-sm">
        © 2025 AI KYC Agent. All rights reserved.
      </div>
    </main>
  )
}
