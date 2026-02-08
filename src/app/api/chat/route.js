import { NextResponse } from "next/server";
import { geminiService } from "@/services/GeminiService";

export async function POST(req) {
    try {
        const { message, history } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const response = await geminiService.chat(history, message);

        return NextResponse.json({ response });
    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: "Failed to process chat" }, { status: 500 });
    }
}
