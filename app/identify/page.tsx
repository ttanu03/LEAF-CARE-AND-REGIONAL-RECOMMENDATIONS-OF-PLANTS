"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImageUpload from "@/components/image-upload"
import PlantInfoCard from "@/components/plant-info-card"
import DiseaseInfoCard from "@/components/disease-info-card"
import ChatInterface from "@/components/chat-interface"
import { Loader2 } from "lucide-react"

type PlantInfo = {
  name?: string
  scientificName?: string
  description?: string
  careTips?: string[]
  problems?: string[]
  confidence?: number
  error?: string
  suggestions?: string[]
}

type DiseaseInfo = {
  name?: string
  description?: string
  treatment?: string[]
  prevention?: string[]
  confidence?: number
  error?: string
  suggestions?: string[]
}

export default function IdentifyPage() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null)
  const [diseaseInfo, setDiseaseInfo] = useState<DiseaseInfo | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("identify")

  const handleImageCapture = async (imageData: string) => {
    setCapturedImage(imageData)
    setPlantInfo(null)
    setDiseaseInfo(null)
    setError(null)
    setIsProcessing(true)

    try {
      if (!imageData || !imageData.startsWith("data:image")) {
        throw new Error("Invalid image format. Please upload a valid image.")
      }

      // Timeout after 15 seconds
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)

      const [identifyRes, diseaseRes] = await Promise.all([
        fetch("/api/identify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: imageData }),
          signal: controller.signal
        }),
        fetch("/api/disease", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: imageData }),
          signal: controller.signal
        })
      ])

      clearTimeout(timeoutId)

      const processResponse = async (res: Response) => {
        if (!res.ok) {
          const error = await res.text()
          throw new Error(error || "Request failed")
        }
        return await res.json()
      }

      const [plantData, diseaseData] = await Promise.all([
        processResponse(identifyRes),
        processResponse(diseaseRes)
      ])

      setPlantInfo({
        name: plantData.name,
        scientificName: plantData.scientificName,
        description: plantData.description,
        careTips: plantData.careTips,
        problems: plantData.problems,
        confidence: plantData.confidence
      })

      setDiseaseInfo({
        name: diseaseData.name,
        description: diseaseData.description,
        treatment: diseaseData.treatment,
        prevention: diseaseData.prevention,
        confidence: diseaseData.confidence
      })

    } catch (err) {
      console.error("Error:", err)
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setError(errorMessage)
      
      setPlantInfo({
        error: errorMessage,
        suggestions: [
          "Try a different photo angle",
          "Ensure good lighting",
          "Make sure the plant is clearly visible"
        ]
      })
      
      setDiseaseInfo({
        error: errorMessage,
        suggestions: [
          "Check for visible symptoms",
          "Take a closer photo of affected areas",
          "Try again with better lighting"
        ]
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
        Plant Identification & Disease Detection
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-green-700">Upload or Take a Photo</h2>
          <ImageUpload onImageCapture={handleImageCapture} disabled={isProcessing} />
          
          {isProcessing && (
            <div className="flex items-center gap-2 text-green-700">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Analyzing your plant...</span>
            </div>
          )}

          {capturedImage && (
            <div className="mt-4">
              <img 
                src={capturedImage} 
                alt="Captured plant" 
                className="rounded-lg border border-gray-200 max-h-64 object-contain"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-green-700">Chat with Plant Assistant</h2>
          <ChatInterface />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-8">
          <p className="font-medium">{error}</p>
          <p className="text-sm">Please try again with a different photo.</p>
        </div>
      )}

      {(plantInfo || diseaseInfo) && (
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="identify">Plant Information</TabsTrigger>
              <TabsTrigger value="disease">Health Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="identify" className="mt-4">
              <PlantInfoCard
                plantInfo={plantInfo}
                isLoading={isProcessing}
              />
            </TabsContent>

            <TabsContent value="disease" className="mt-4">
              <DiseaseInfoCard
                diseaseInfo={diseaseInfo}
                isLoading={isProcessing}
              />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}