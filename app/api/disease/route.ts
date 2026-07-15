import { NextResponse } from 'next/server';
import { detectDisease } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    
    if (!image) {
      return NextResponse.json(
        { error: "Image is required" },
        { status: 400 }
      );
    }

    const diseaseText = await detectDisease(image);
    console.log("Raw disease detection response:", diseaseText);
    
    // Extract useful information from the text response
    let diseaseInfo = extractDiseaseInfo(diseaseText);
    
    // Return in the format expected by the frontend
    return NextResponse.json({
      name: diseaseInfo.name,
      description: diseaseInfo.description,
      treatment: diseaseInfo.treatment,
      prevention: diseaseInfo.prevention,
      confidence: diseaseInfo.confidence
    });
    
  } catch (error: unknown) {
    console.error("Disease detection error:", error);
    
    return NextResponse.json({
      name: "Error",
      description: "Failed to analyze plant health",
      treatment: [],
      prevention: [],
      confidence: 0
    });
  }
}

// Helper function to extract structured disease info from text
function extractDiseaseInfo(text: string) {
  // Default values
  const diseaseInfo = {
    name: "No issues detected",
    description: "The plant appears healthy based on the visible parts.",
    treatment: [] as string[],
    prevention: [] as string[],
    confidence: 0.5
  };

  // If there's no text, return defaults
  if (!text || text.trim() === '') {
    return diseaseInfo;
  }

  // Try to extract a disease name
  const diseaseNameMatch = text.match(/disease:?\s*([^.\n]+)/i) || 
                          text.match(/condition:?\s*([^.\n]+)/i) ||
                          text.match(/identified as:?\s*([^.\n]+)/i);
                          
  if (diseaseNameMatch && diseaseNameMatch[1].trim()) {
    diseaseInfo.name = diseaseNameMatch[1].trim();
    diseaseInfo.confidence = 0.7;
  }

  // Check if it's healthy
  if (text.toLowerCase().includes("healthy") || 
      text.toLowerCase().includes("no disease") || 
      text.toLowerCase().includes("no issues")) {
    diseaseInfo.name = "Healthy Plant";
    diseaseInfo.confidence = 0.8;
  }

  // Extract description
  const descriptionMatch = text.match(/description:?\s*([^.\n]+(?:\.[^.\n]+)?)/i) ||
                          text.match(/symptoms:?\s*([^.\n]+(?:\.[^.\n]+)?)/i);
                          
  if (descriptionMatch && descriptionMatch[1].trim()) {
    diseaseInfo.description = descriptionMatch[1].trim();
  } else {
    // Use the first 1-2 sentences if no explicit description
    const firstSentences = text.split(/\.\s+/).slice(0, 2).join('. ') + '.';
    if (firstSentences.length > 20) {
      diseaseInfo.description = firstSentences;
    }
  }

  // Extract treatment suggestions
  const treatmentSection = text.match(/treatment:?\s*([^#]+?)(?:\n\n|\n#|$)/i)?.[1] ||
                          text.match(/recommendations:?\s*([^#]+?)(?:\n\n|\n#|$)/i)?.[1] ||
                          text.match(/manage:?\s*([^#]+?)(?:\n\n|\n#|$)/i)?.[1];

  if (treatmentSection) {
    // Extract bullet points or numbered lists
    const treatmentPoints = treatmentSection.split(/\n\s*[-•*]\s*|\n\s*\d+\.\s*/).filter(p => p.trim());
    if (treatmentPoints.length > 0) {
      diseaseInfo.treatment = treatmentPoints.map(p => p.trim());
    } else {
      // Split by sentences if no bullet points
      diseaseInfo.treatment = treatmentSection
        .split(/\.\s+/)
        .filter(s => s.trim().length > 10) // Only reasonably long sentences
        .map(s => s.trim() + '.');
    }
  }

  // Extract prevention suggestions
  const preventionSection = text.match(/prevention:?\s*([^#]+?)(?:\n\n|\n#|$)/i)?.[1] ||
                           text.match(/prevent:?\s*([^#]+?)(?:\n\n|\n#|$)/i)?.[1];
                           
  if (preventionSection) {
    // Extract bullet points or numbered lists
    const preventionPoints = preventionSection.split(/\n\s*[-•*]\s*|\n\s*\d+\.\s*/).filter(p => p.trim());
    if (preventionPoints.length > 0) {
      diseaseInfo.prevention = preventionPoints.map(p => p.trim());
    } else {
      // Split by sentences if no bullet points
      diseaseInfo.prevention = preventionSection
        .split(/\.\s+/)
        .filter(s => s.trim().length > 10) // Only reasonably long sentences
        .map(s => s.trim() + '.');
    }
  }

  // If we couldn't extract treatments or prevention, try to find general suggestions
  if (diseaseInfo.treatment.length === 0 && diseaseInfo.prevention.length === 0) {
    const suggestions = text.match(/suggestions?:?\s*([^#]+?)(?:\n\n|\n#|$)/i)?.[1] ||
                       text.match(/recommendations?:?\s*([^#]+?)(?:\n\n|\n#|$)/i)?.[1];
                       
    if (suggestions) {
      const points = suggestions.split(/\n\s*[-•*]\s*|\n\s*\d+\.\s*/).filter(p => p.trim());
      if (points.length > 0) {
        diseaseInfo.treatment = points.map(p => p.trim());
      }
    }
  }

  return diseaseInfo;
}