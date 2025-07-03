import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Shield, Globe, Database } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">About PlantID</h1>

      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2">
              <Leaf className="h-6 w-6" />
              Our Mission
            </h2>
            <p className="text-gray-700 mb-4">
              PlantID was created to help people identify plants, detect diseases, and learn more about plant care. Our
              mission is to make plant identification accessible to everyone and promote sustainable gardening
              practices.
            </p>
            <p className="text-gray-700">
              With a special focus on Indian plants and growing conditions, we aim to provide region-specific advice
              that helps gardeners and plant enthusiasts across India grow healthy, thriving plants.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Shield className="h-10 w-10 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold text-green-700 mb-2">AI-Powered</h3>
                <p className="text-gray-600">
                  Our plant identification system uses advanced AI to accurately identify plants and detect diseases.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Globe className="h-10 w-10 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold text-green-700 mb-2">India-Focused</h3>
                <p className="text-gray-600">
                  Specialized for Indian plants and growing conditions across different regions of the country.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Database className="h-10 w-10 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold text-green-700 mb-2">Comprehensive</h3>
                <p className="text-gray-600">
                  Get detailed information about plants, diseases, care tips, and region-specific recommendations.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">How We Built This</h2>
            <p className="text-gray-700 mb-4">
              PlantID is built using Next.js for the frontend and backend, MongoDB for data storage, and Google's Gemini
              API for AI-powered plant identification and disease detection.
            </p>
            <p className="text-gray-700">
              Our system is constantly learning and improving to provide more accurate identifications and better
              recommendations for plant care.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
