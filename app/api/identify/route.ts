<<<<<<< HEAD
import { NextResponse } from 'next/server';
import { identifyPlant } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    
    if (!image) {
      return NextResponse.json(
        { error: "Image is required" },
        { status: 400 }
      );
    }

    // Get the raw text response from the Gemini API
    const identificationText = await identifyPlant(image);
    console.log("Raw identification text:", identificationText);
    
    // Clean up the text - remove markdown code blocks
    let cleanedText = identificationText.trim();
    
    // Remove markdown code blocks if present
    if (cleanedText.startsWith("```") && cleanedText.includes("```")) {
      // Check for ```json format
      if (cleanedText.startsWith("```json")) {
        cleanedText = cleanedText.replace(/^```json/, "");
      } else {
        cleanedText = cleanedText.replace(/^```/, "");
      }
      // Remove ending ```
      cleanedText = cleanedText.replace(/```$/, "");
    }
    
    // Also try to handle cases where JSON is in a code block but not the entire response
    const jsonMatch = cleanedText.match(/```(?:json)?([\s\S]*?)```/);
    if (jsonMatch && jsonMatch[1]) {
      cleanedText = jsonMatch[1].trim();
    }
    
    console.log("Cleaned text:", cleanedText);
    
    // Try to parse the response as JSON
    let plantData;
    try {
      plantData = JSON.parse(cleanedText);
      
      // Return the data with the expected structure
      return NextResponse.json({
        name: plantData.name || "Unknown Plant",
        scientificName: plantData.scientificName || "Unknown",
        description: plantData.description || "No description available",
        careTips: Array.isArray(plantData.careTips) ? plantData.careTips : [],
        problems: Array.isArray(plantData.problems) ? plantData.problems : [],
        confidence: typeof plantData.confidence === 'number' ? plantData.confidence : 0
      });
    } catch (parseError) {
      console.error("Error parsing identification result:", parseError);
      console.error("Failed text:", cleanedText);
      
      // Return error in the format expected by the frontend
      return NextResponse.json({
        name: "Error",
        scientificName: "Unknown",
        description: "Could not identify plant. The system encountered an error processing the image.",
        careTips: [],
        problems: ["Failed to process the identification data"],
        confidence: 0
      });
    }
    
  } catch (error: unknown) {
    console.error("Identification error:", error);
    
    return NextResponse.json({
      name: "Error",
      scientificName: "Unknown",
      description: "Failed to identify plant",
      careTips: [],
      problems: ["API error occurred"],
      confidence: 0
    });
=======
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
>>>>>>> f8d6ed51a3b9e3ad68b31a06bef8b5d41f08a0db
  }
}