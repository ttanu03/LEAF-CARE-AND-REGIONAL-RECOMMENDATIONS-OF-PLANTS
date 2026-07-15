import Link from "next/link"
import { Leaf } from "lucide-react"

export default function Navbar() {
  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-content items-center">
        
        <Link href="/" className="flex gap-2 text-xl font-bold italic">
          <Leaf className="h-7 w-7" />
          <span>Plantopedia</span>
        </Link>
       
        <nav >
          <ul className="flex gap-6 items-center">
            <li>
              <Link href="/" className="hover:text-green-200 transition-colors ml-7">
                Home
              </Link>
            </li>
            <li>
              <Link href="/identify" className="hover:text-green-200 transition-colors">
                Identify
              </Link>
            </li>
            <li>
              <Link href="/suggestions" className="hover:text-green-200 transition-colors">
                Plant Suggestions
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-green-200 transition-colors">
                About
              </Link>
            </li>
          </ul>
        </nav>


    <div className="ml-auto w-full max-w-xs relative">
          <input
            type="text"
            placeholder="Search Plantopedia"
            className="w-full rounded-full pl-10 pr-3 py-2 text-sm bg-green-600 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-sm">
            🔍
          </div>
        </div>



      </div>
    </header>
  )
}