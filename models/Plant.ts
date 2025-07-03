import type { ObjectId } from "mongodb"

export interface Plant {
  _id?: ObjectId
  commonName: string
  scientificName: string
  family: string
  nativeRegion: string
  description: string
  careTips: string
  isIndian: boolean
  imageUrl?: string
  createdAt: Date
}

export interface PlantSuggestion {
  _id?: ObjectId
  region: string
  plants: Array<{
    commonName: string
    scientificName: string
    suitability: string
    careRequirements: string
  }>
  createdAt: Date
}

export interface ChatMessage {
  _id?: ObjectId
  role: "user" | "assistant"
  content: string
  timestamp: Date
  sessionId: string
}
