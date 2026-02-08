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

        // Call the service with the file blob directly
        const result = await geminiService.analyzeOffer(file, file.type || 'application/pdf');

        return NextResponse.json(result);

    } catch (error) {
        console.error('Error processing verification:', error);
        return NextResponse.json(
            { error: 'Internal server error during verification' },
            { status: 500 }
        );
    }
}
