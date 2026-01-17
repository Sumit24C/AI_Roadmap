import { NextResponse } from "next/server";
import { generateAndStoreNodes } from "@/lib/ai/generators/generateAndStoreNodes";
import { UserInput } from "@/types/userInput";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userId, userInput } = body as {
      userId: string;
      userInput: UserInput;
    };

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    if (!userInput) {
      return NextResponse.json(
        { error: "userInput is required" },
        { status: 400 }
      );
    }

    const result = await generateAndStoreNodes(userId, userInput);

    return NextResponse.json(
      {
        message: "Roadmap generated successfully",
        ...result,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Roadmap generation failed:", error);

    return NextResponse.json(
      {
        error: "Failed to generate roadmap",
        details: error.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}
