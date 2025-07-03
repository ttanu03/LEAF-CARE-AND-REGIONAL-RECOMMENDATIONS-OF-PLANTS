// components/plant-suggestions.tsx
"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface PlantSuggestion {
  name: string
  scientificName: string
  description: string
}

export default function PlantSuggestions({ region }: { region: string }) {
  const [suggestions, setSuggestions] = useState<PlantSuggestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/plants?region=${encodeURIComponent(region)}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        if (data.success && Array.isArray(data.data)) {
          setSuggestions(data.data)
        } else {
          throw new Error(data.error || "Invalid data format received")
        }
      } catch (err) {
        console.error("Error fetching plant suggestions:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch suggestions")
      } finally {
        setLoading(false)
      }
    }

    fetchSuggestions()
  }, [region])

  if (loading) {
    return (
      <div className="grid gap-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded-lg">
        <p>Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {suggestions.map((plant, index) => (
        <div key={index} className="p-4 border rounded-lg bg-white shadow-sm">
          <h3 className="font-bold text-lg text-green-700">{plant.name}</h3>
          <p className="text-sm text-gray-500 italic">{plant.scientificName}</p>
          <p className="mt-2 text-gray-700">{plant.description}</p>
        </div>
      ))}
    </div>
  )
}