// app/api/identify/route.ts
import { NextResponse } from "next/server"
import { identifyPlant } from "@/lib/gemini"

export async function POST(request: Request) {
  try {
    const { image } = await request.json()
    
    if (!image) {
      return NextResponse.json(
        { success: false, error: "Image is required" },
        { status: 400 }
      )
    }

    const identification = await identifyPlant(image)
    
    return NextResponse.json({
      success: true,
      data: {
        name: identification.name,
        scientificName: identification.scientificName,
        description: identification.description,
        careTips: identification.careTips || [],
        problems: identification.problems || [],
        confidence: identification.confidence
      }
    })
    
  } catch (error) {
    console.error("Identification error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to identify plant",
        details: process.env.NODE_ENV === "development" ? 
          (error instanceof Error ? error.message : String(error)) : 
          undefined
      },
      { status: 200 } // Change from 422 to 200 to ensure frontend receives the error
    )
  }
}