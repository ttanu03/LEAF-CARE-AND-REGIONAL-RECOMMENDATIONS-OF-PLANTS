import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { message, history = [] } = await request.json();

    // Validate input
    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message cannot be empty" },
        { status: 400 }
      );
    }

    // Initialize the model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
        topP: 0.9,
        topK: 40
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    });

    // Format and validate chat history
    const formattedHistory = history
      .filter(item => item.content && item.content.trim().length > 0)
      .map(({ role, content }) => ({
        role: role === "model" ? "assistant" : "user",
        parts: [{ text: content.trim() }]
      }));

    // Ensure history starts with user message
    if (formattedHistory.length > 0 && formattedHistory[0].role !== "user") {
      return NextResponse.json(
        { error: "Conversation history must begin with a user message" },
        { status: 400 }
      );
    }

    // Start chat session
    const chat = model.startChat({ history: formattedHistory });

    // Send message - CORRECTED FORMAT
    const result = await chat.sendMessage(message.trim());

    const response = await result.response;
    const responseText = response.text();

    if (!responseText || responseText.trim().length === 0) {
      return NextResponse.json(
        { error: "Received empty response from model" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      response: responseText,
      history: [
        ...formattedHistory,
        { role: "user", content: message.trim() },
        { role: "assistant", content: responseText }
      ]
    });
    
  } catch (error) {
    console.error("Chat error:", error);
    
    if (error instanceof Error) {
      if (error.message.includes("429")) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      }
      if (error.message.includes("First content should be with role 'user'")) {
        return NextResponse.json(
          { error: "Invalid conversation history. First message must be from user." },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: `Chat failed: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Chat failed due to an unknown error." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
