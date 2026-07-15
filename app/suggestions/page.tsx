"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Leaf } from "lucide-react"

type PlantSuggestion = {
  name: string
  scientificName: string
  description: string
}

export default function PlantSuggestions() {
  const [region, setRegion] = useState("")
  const [suggestions, setSuggestions] = useState<PlantSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!region.trim()) {
      setError("Please enter a region in India")
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/suggestions?region=${encodeURIComponent(region)}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch suggestions")
      }
      
      if (!data.success) {
        throw new Error("Failed to get plant suggestions")
      }
      
      setSuggestions(data.data)
    } catch (err) {
      console.error("Error fetching suggestions:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-green-700">Find Plants for Your Region</h2>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          placeholder="Enter your region in India (e.g., Kerala, Delhi)"
          className="flex-1"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </>
          ) : (
            "Get Suggestions"
          )}
        </Button>
      </form>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded">
          {error}
        </div>
      )}
      
      {suggestions.length > 0 && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {suggestions.map((plant, index) => (
            <Card key={index} className="border-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-green-800">
                  <Leaf className="h-4 w-4 mr-2" />
                  {plant.name}
                </CardTitle>
                <CardDescription className="italic">
                  {plant.scientificName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{plant.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}