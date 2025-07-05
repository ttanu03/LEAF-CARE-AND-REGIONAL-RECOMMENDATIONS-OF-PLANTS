import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Helper to process base64 image string
function processImageData(image: string): { data: string; mimeType: string } {
  if (image.startsWith("data:image")) {
    const [meta, base64Data] = image.split(",");
    const mimeType = meta.split(";")[0].split(":")[1];
    return { data: base64Data, mimeType };
  }
  return { data: image, mimeType: "image/jpeg" };
}

// Identify plant
export async function identifyPlant(image: string): Promise<string> {
  try {
    const { data, mimeType } = processImageData(image);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      "Identify the plant in this image. Provide common name, scientific name, and basic care tips.",
      { 
        inlineData: { 
          data, 
          mimeType 
        } 
      }
    ]);

    return (await result.response).text();
  } catch (error) {
    console.error("Identification error:", error);
    throw new Error(
      `Plant identification failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// Detect plant disease
export async function detectDisease(image: string): Promise<string> {
  try {
    const { data, mimeType } = processImageData(image);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      "Detect any plant diseases or problems visible in this image. Provide diagnosis and treatment suggestions.",
      { 
        inlineData: { 
          data, 
          mimeType 
        } 
      }
    ]);

    return (await result.response).text();
  } catch (error) {
    console.error("Disease detection error:", error);
    throw new Error(
      `Disease detection failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// Chat with Gemini AI
export async function chatWithAI(
  message: string,
  history: Array<{ role: "user" | "model"; content: string }> = []
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000
      }
    });


    // Suggest Indian plants based on climate or region
export function getIndianPlantSuggestions(region: string): string[] {
  const suggestions: Record<string, string[]> = {
    'north': ['Tulsi', 'Neem', 'Peepal'],
    'south': ['Coconut', 'Banana', 'Betel Leaf'],
    'east': ['Bamboo', 'Jute', 'Areca Palm'],
    'west': ['Aloe Vera', 'Cactus', 'Bougainvillea'],
    'central': ['Mango', 'Guava', 'Jackfruit']
  };

  const key = region.toLowerCase();
  return suggestions[key] || ['Tulsi', 'Neem', 'Aloe Vera']; // default fallback
}

    // Format and clean history
    const formattedHistory: any[] = [];
    let lastRole: "user" | "model" = "model";

    for (const msg of history) {
      if (!msg.role || !msg.content) continue;
      const currentRole = msg.role;
      if (currentRole === lastRole) continue;
      formattedHistory.push({
        role: currentRole,
        parts: [{ text: msg.content }]
      });
      lastRole = currentRole;
    }

    // Ensure conversation starts with user
    if (formattedHistory.length > 0 && formattedHistory[0].role !== "user") {
      formattedHistory.unshift({
        role: "user",
        parts: [{ text: "Start the conversation" }]
      });
    }

    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessage(message);
    return (await result.response).text();
  } catch (error) {
    console.error("Chat error:", error);
    throw new Error(
      `Chat failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
