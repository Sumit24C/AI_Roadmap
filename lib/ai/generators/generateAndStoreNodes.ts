import { GoogleGenAI } from "@google/genai";
import { UserInput } from "@/types/userInput";
import { buildNodePrompt } from "@/lib/ai/prompts/node";
import { adminDb } from "@/firebase/admin";

const GEMINI_API_KEY = process.env.NEXT_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined");
}

const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
});

export async function generateAndStoreNodes(
    userId: string,
    userInput: UserInput
) {
    const prompt = buildNodePrompt(userInput);
    console.log(prompt)
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
    });
    const rawText = response.text;

    if (!rawText) {
        throw new Error("Gemini returned an empty response");
    }

    let nodes: any[];
    try {
        nodes = JSON.parse(rawText);
    } catch {
        console.error("Gemini raw output:", rawText);
        throw new Error("Gemini output is not valid JSON");
    }

    if (!Array.isArray(nodes)) {
        throw new Error("Gemini output is not a JSON array");
    }
    const bulkWriter = adminDb.bulkWriter();

    bulkWriter.onWriteError((error) => {
        console.error("Bulk write failed:", error.documentRef.path);
        return error.failedAttempts < 3;
    });

    for (const node of nodes) {
        if (!node.id) {
            throw new Error("Node is missing required id");
        }

        const ref = adminDb.collection("nodes").doc(node.id);

        bulkWriter.set(ref, {
            ...node,
            userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    await bulkWriter.close();

    return {
        success: true,
        nodeCount: nodes.length,
    };
}
