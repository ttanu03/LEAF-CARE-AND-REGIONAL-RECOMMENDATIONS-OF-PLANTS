import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Helper to process base64 image string (UNCHANGED)
function processImageData(image: string): { data: string; mimeType: string } {
  if (image.startsWith("data:image")) {
    const [meta, base64Data] = image.split(",");
    const mimeType = meta.split(";")[0].split(":")[1];
    return { data: base64Data, mimeType };
  }
  return { data: image, mimeType: "image/jpeg" };
}

// ✅ FIXED FUNCTION: Get plant suggestions for a region
export async function getIndianPlantSuggestions(region: string): Promise<
  {
    name: string;
    scientificName: string;
    description: string;
  }[]
> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a bot that recommends plants suitable for specific regions in India based on climate and geography.

Provide a list of 5 suitable plants for the region: "${region}". 
Return only valid JSON in the following format:
[
  {
    "name": "Common name",
    "scientificName": "Scientific name",
    "description": "Short description (1-2 sentences)"
  }
]

Do NOT include any markdown or extra commentary. Just raw JSON.
`;

    const result = await model.generateContent(prompt);
    const text = (await result.response).text();

    // ✅ Clean markdown wrapping if Gemini returns it
    const cleaned = text.trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/, "");

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Plant suggestion error:", error);
    throw new Error(
      `getIndianPlantSuggestions failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// identifyPlant (UNCHANGED)
export async function identifyPlant(image: string): Promise<string> {
  try {
    const { data, mimeType } = processImageData(image);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Analyze this plant image and provide response in this EXACT format:
{
  "name": "Common name (e.g., 'Rose')",
  "scientificName": "Scientific name (e.g., 'Rosa rubiginosa')",
  "description": "Brief description (1-2 sentences)",
  "careTips": ["array", "of", "specific", "care", "tips"],
  "problems": ["common", "problems", "if", "visible"],
  "confidence": 0.0-1.0
}

Rules:
1. Only return valid JSON, no additional text
2. If uncertain, use "Unknown" for text fields
3. confidence should reflect your certainty
4. Include only visible problems in problems array
5. Do not include any markdown syntax (no backticks)
`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data,
          mimeType,
        },
      },
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

// detectDisease (UNCHANGED)
export async function detectDisease(image: string): Promise<string> {
  try {
    const { data, mimeType } = processImageData(image);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      "Detect any plant diseases or problems visible in this image. Provide diagnosis and treatment suggestions.",
      {
        inlineData: {
          data,
          mimeType,
        },
      },
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

// chatWithAI (UNCHANGED)
export async function chatWithAI(
  message: string,
  history: Array<{ role: "user" | "model"; content: string }> = []
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });

    // Format and clean history
    const formattedHistory: any[] = [];
    let lastRole: "user" | "model" = "model";

    for (const msg of history) {
      if (!msg.role || !msg.content) continue;
      const currentRole = msg.role;
      if (currentRole === lastRole) continue;
      formattedHistory.push({
        role: currentRole,
        parts: [{ text: msg.content }],
      });
      lastRole = currentRole;
    }

    // Ensure conversation starts with user
    if (formattedHistory.length > 0 && formattedHistory[0].role !== "user") {
      formattedHistory.unshift({
        role: "user",
        parts: [{ text: "Start the conversation" }],
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
