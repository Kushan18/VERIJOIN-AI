import { NextResponse } from "next/server";
import { geminiService } from "@/services/GeminiService";

export async function POST(req) {
    try {
        const profile = await req.json();
        const result = await geminiService.performGapAnalysis(profile);
        return NextResponse.json(result);
    } catch (error) {
        console.error("Strategy API Error:", error);
        return NextResponse.json({ error: "Failed to perform gap analysis" }, { status: 500 });
    }
}
