"use client"

import { useState } from "react"
import Link from "next/link"
import { Leaf, Menu, X, Search } from "lucide-react"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/identify", label: "Identify" },
    { href: "/suggestions", label: "Plant Suggestions" },
    { href: "/about", label: "About" },
  ]

  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-lg sm:text-xl font-bold italic shrink-0">
            <Leaf className="h-6 w-6 sm:h-7 sm:w-7" />
            <span>Plantopedia</span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:block">
            <ul className="flex gap-6 items-center">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-green-200 transition-colors whitespace-nowrap">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop search */}
          <div className="hidden md:block w-full max-w-xs relative">
            <input
              type="text"
              placeholder="Search Plantopedia"
              className="w-full rounded-full pl-9 pr-3 py-2 text-sm bg-green-600 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-green-600 transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="lg:hidden mt-3 pb-2 border-t border-green-600">
            <ul className="flex flex-col gap-1 pt-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 px-1 hover:text-green-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-3 w-full relative">
              <input
                type="text"
                placeholder="Search Plantopedia"
                className="w-full rounded-full pl-9 pr-3 py-2 text-sm bg-green-600 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
