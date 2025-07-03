"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface RegionSelectorProps {
  onRegionChange: (region: string) => void
}

const indianRegions = [
  { value: "northern", label: "Northern India" },
  { value: "southern", label: "Southern India" },
  { value: "eastern", label: "Eastern India" },
  { value: "western", label: "Western India" },
  { value: "central", label: "Central India" },
  { value: "northeastern", label: "North-Eastern India" },
]

export default function RegionSelector({ onRegionChange }: RegionSelectorProps) {
  const [selectedRegion, setSelectedRegion] = useState("northern")

  const handleRegionChange = (value: string) => {
    setSelectedRegion(value)
    onRegionChange(value)
  }

  return (
    <Card className="w-full">
      <CardHeader className="bg-green-50">
        <CardTitle className="text-green-800 flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Select Your Region
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Select value={selectedRegion} onValueChange={handleRegionChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a region" />
          </SelectTrigger>
          <SelectContent>
            {indianRegions.map((region) => (
              <SelectItem key={region.value} value={region.value}>
                {region.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-gray-500 mt-2">We'll suggest plants that grow well in your selected region</p>
      </CardContent>
    </Card>
  )
}
