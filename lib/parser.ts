// lib/parser.ts
export function parsePlantResponse(response: string): PlantIdentification {
  try {
    // Clean the response string
    const cleaned = response.replace(/```json|```/g, '').trim()
    
    // Parse the JSON
    const data = JSON.parse(cleaned)
    
    // Extract only the fields we need
    return {
      name: data.name || 'Unknown',
      scientificName: data.scientificName || '',
      description: data.description || '',
      careTips: data.careTips || [],
      problems: data.problems || [],
      confidence: data.confidence || 0
    }
  } catch (error) {
    console.error('Failed to parse plant response:', response)
    throw new Error('Invalid plant response format')
  }
}

export function parseSuggestionResponse(response: string): PlantSuggestion[] {
  try {
    const cleaned = response.replace(/```json|```/g, '').trim()
    const data = JSON.parse(cleaned)
    
    if (!Array.isArray(data)) {
      throw new Error('Expected array of plant suggestions')
    }
    
    return data.map(item => ({
      name: item.name || 'Unknown',
      scientificName: item.scientificName || '',
      description: item.description || ''
    }))
  } catch (error) {
    console.error('Failed to parse suggestions:', response)
    throw new Error('Invalid suggestions format')
  }
}