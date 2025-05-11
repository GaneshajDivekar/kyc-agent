"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import AnimatedHeaderSignature from "./animated-header-signature"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white border-b border-gray-200 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl text-teal-600">
              KYC Agent
            </Link>

            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-teal-600">
                Features
              </Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-teal-600">
                How It Works
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-teal-600">
                Pricing
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-teal-600">
                Contact
              </Link>
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline">Log In</Button>
            <Button className="bg-teal-600 hover:bg-teal-700">Sign Up</Button>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="#features"
              className="block px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-teal-600 rounded-md"
              onClick={toggleMenu}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="block px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-teal-600 rounded-md"
              onClick={toggleMenu}
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="block px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-teal-600 rounded-md"
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            <Link
              href="#contact"
              className="block px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-teal-600 rounded-md"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <Button variant="outline" className="w-full mb-2">
                Log In
              </Button>
            </div>
            <div className="flex items-center px-5">
              <Button className="w-full bg-teal-600 hover:bg-teal-700">Sign Up</Button>
            </div>
          </div>
        </div>
      )}

      {/* Animated signature */}
      <AnimatedHeaderSignature />
    </header>
  )
}
