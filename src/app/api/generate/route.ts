"use server";
import { generateResponse } from "@/app/services/openaiService";

const handleError = (error: unknown): Response => {
  if (error instanceof Error) {
    if (
      error.message.includes("Quota exceeded") ||
      error.message.includes("RESOURCE_EXHAUSTED")
    ) {
      console.error("Rate limit exceeded or quota exhausted:", error);
      return Response.json(
        { error: "Rate limit exceeded, please try again later." },
        { status: 429 }
      );
    }

    console.error("API error:", error);
    return Response.json(
      { error: "Failed to generate response due to API error." },
      { status: 500 }
    );
  }

  console.error("Unknown error:", error);
  return Response.json(
    { error: "Failed to generate response due to an unknown error." },
    { status: 500 }
  );
};

export async function POST(request: Request): Promise<Response> {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return Response.json(
        { error: "Prompt is required and must be a string." },
        { status: 400 }
      );
    }

    const response = await generateResponse(prompt);
    return Response.json({ response });
  } catch (error) {
    return handleError(error);
  }
}
