import { type NextRequest, NextResponse } from "next/server"
import { getIndianPlantSuggestions } from "@/lib/gemini"

export async function GET(request: NextRequest) {
  const region = request.nextUrl.searchParams.get("region")
  
  if (!region) {
    return NextResponse.json({ error: "Region is required" }, { status: 400 })
  }
  
  try {
    const suggestions = await getIndianPlantSuggestions(region)
    return NextResponse.json({
      success: true,
      data: suggestions
    })
  } catch (error) {
    console.error("Error fetching plant suggestions:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch plant suggestions"
      },
      { status: 500 }
    )
  }
}