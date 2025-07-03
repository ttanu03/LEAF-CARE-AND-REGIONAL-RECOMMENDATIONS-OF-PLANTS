import Link from "next/link"
import { Leaf, Mail, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold mb-4">
              <Leaf className="h-6 w-6" />
              <span>PlantID</span>
            </div>
            <p className="text-green-200">
              Your AI-powered plant identification and disease detection assistant. Get information about plants and
              receive location-based suggestions for Indian regions.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-green-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/identify" className="text-green-200 hover:text-white transition-colors">
                  Identify Plants
                </Link>
              </li>
              <li>
                <Link href="/suggestions" className="text-green-200 hover:text-white transition-colors">
                  Plant Suggestions
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-green-200 hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <a
                href="mailto:contact@plantid.example.com"
                className="flex items-center gap-2 text-green-200 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>contact@plantid.example.com</span>
              </a>
              <a
                href="https://github.com/example/plantid"
                className="flex items-center gap-2 text-green-200 hover:text-white transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-4 text-center text-green-300">
          <p>&copy; {new Date().getFullYear()} PlantID. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
