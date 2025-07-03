"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Leaf } from "lucide-react"

interface PlantSuggestion {
  commonName: string
  scientificName: string
  suitability: string
  careRequirements: string
}

interface PlantSuggestionsProps {
  region: string
}

export default function PlantSuggestions({ region }: PlantSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<PlantSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSuggestions = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/suggestions?region=${region}`)
        const data = await response.json()

        if (data.success) {
          setSuggestions(Array.isArray(data.suggestions) ? data.suggestions : [])
        } else {
          throw new Error(data.error || "Failed to fetch suggestions")
        }
      } catch (err) {
        console.error("Error fetching plant suggestions:", err)
        setError("Failed to load plant suggestions. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSuggestions()
  }, [region])

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="bg-green-50">
          <CardTitle className="text-green-800">Loading Plant Suggestions...</CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader className="bg-red-50">
          <CardTitle className="text-red-800">Error</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p>{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!suggestions.length) {
    return (
      <Card className="w-full">
        <CardHeader className="bg-green-50">
          <CardTitle className="text-green-800">Plant Suggestions</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p>No plant suggestions available for this region yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="bg-green-50">
        <CardTitle className="text-green-800">Recommended Plants for Your Region</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="0" className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            {suggestions.slice(0, 5).map((_, index) => (
              <TabsTrigger key={index} value={index.toString()}>
                {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>

          {suggestions.slice(0, 5).map((plant, index) => (
            <TabsContent key={index} value={index.toString()} className="space-y-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">{plant.commonName}</h3>
              </div>
              <p className="italic text-gray-600">{plant.scientificName}</p>

              <div>
                <h4 className="font-medium">Why it's suitable for your region:</h4>
                <p>{plant.suitability}</p>
              </div>

              <div>
                <h4 className="font-medium">Care requirements:</h4>
                <p>{plant.careRequirements}</p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
