import { NextResponse } from 'next/server';
import { geminiService } from '@/services/GeminiService';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            );
        }

        // Convert file to Base64 for the AI Service
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Data = buffer.toString('base64');

        const filePart = {
            inlineData: {
                data: base64Data,
                mimeType: file.type || 'application/pdf', // Default to PDF if unknown, though better to grab from file
            },
        };

        // Call the service
        const result = await geminiService.analyzeOffer(filePart);

        return NextResponse.json(result);

    } catch (error) {
        console.error('Error processing verification:', error);
        return NextResponse.json(
            { error: 'Internal server error during verification' },
            { status: 500 }
        );
    }
}
