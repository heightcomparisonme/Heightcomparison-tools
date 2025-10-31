'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center space-x-6 text-sm">
          <Link href="/about" className="hover:text-blue-400 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-400 transition-colors">
            Contact
          </Link>
          <Link href="/faq" className="hover:text-blue-400 transition-colors">
            FAQ
          </Link>
          <Link href="/terms" className="hover:text-blue-400 transition-colors">
            Terms
          </Link>
          <Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">
            Privacy Policy
          </Link>
          <span className="text-gray-400">
            © 2025 HeightComparison.com | All rights reserved
          </span>
        </div>
      </div>
    </footer>
  )
}
