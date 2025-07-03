// app/api/disease/route.ts
import { NextResponse } from 'next/server';
import { detectDisease } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const { image } = await req.json();
    
    if (!image) {
      return NextResponse.json(
        { error: "Image is required" },
        { status: 400 }
      );
    }
    
    const result = await detectDisease(image);
    return NextResponse.json(result, { status: 200 });
    
  } catch (error: unknown) {
    console.error("Detection error:", error);
    
    let errorMessage = "Detection failed";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: "Detection failed", details: errorMessage },
      { status: 500 }
    );
  }
}