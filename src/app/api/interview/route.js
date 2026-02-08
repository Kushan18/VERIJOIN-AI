import { geminiService } from "@/services/GeminiService";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // Check if it's a file upload (FormData) or a JSON request
        const contentType = req.headers.get("content-type") || "";

        if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();
            const action = formData.get("action");
            const file = formData.get("file");

            if (action === "analyze_resume_file" && file) {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const base64Data = buffer.toString("base64");

                const filePart = {
                    inlineData: {
                        data: base64Data,
                        mimeType: file.type || "application/pdf",
                    },
                };

                const result = await geminiService.analyzeResumeFile(filePart);
                return NextResponse.json(result);
            }
        }

        // Standard JSON handling
        const body = await req.json();
        const { action, data } = body;

        if (action === "analyze_resume") {
            const result = await geminiService.extractSkillsFromResume(data.text);
            return NextResponse.json(result);
        }

        if (action === "generate_questions") {
            const { role, skills, resumeText } = data;
            const result = await geminiService.generateInterviewQuestions(role, skills, resumeText);
            return NextResponse.json(result);
        }

        if (action === "score_interview") {
            const result = await geminiService.scoreInterview(data.session);
            return NextResponse.json(result);
        }

        if (action === "market_sentiment") {
            const result = await geminiService.analyzeMarketSentiment(data.role);
            return NextResponse.json(result);
        }

        if (action === "gap_analysis") {
            const result = await geminiService.performGapAnalysis(data.profile);
            return NextResponse.json(result);
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    } catch (error) {
        console.error("Interview API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
