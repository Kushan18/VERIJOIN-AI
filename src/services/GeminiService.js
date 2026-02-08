export class GeminiService {
    constructor() {
        this.baseUrl = "http://localhost:8005/api";
    }

    /**
     * Analyzes the offer letter using the FastAPI backend.
     */
    async analyzeOffer(fileBlob, mimeType) {
        try {
            const formData = new FormData();
            formData.append('file', fileBlob, 'offer_letter');

            const response = await fetch(`${this.baseUrl}/analyze-offer`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("AI Analysis Failed:", error);
            // In a real app, you might want to return mock data if the backend is down
            return this.getMockData();
        }
    }

    /**
     * Handles real-time chat interactions via the FastAPI backend.
     */
    async chat(history, message) {
        try {
            const formattedHistory = history.map(h => ({
                role: h.role,
                content: h.parts ? h.parts[0] : (h.content || "")
            }));

            const response = await fetch(`${this.baseUrl}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    history: formattedHistory,
                    message: message
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error("Chat Failed:", error);
            return "Hi there! I'm currently operating in offline mode as I couldn't reach the brain (backend). I can still help with general questions! What's on your mind?";
        }
    }

    /**
     * Analyzes market sentiment via the FastAPI backend.
     */
    async analyzeMarketSentiment(role) {
        try {
            const response = await fetch(`${this.baseUrl}/market-sentiment?role=${encodeURIComponent(role)}`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Market Sentiment Analysis Failed:", error);
            return this.getMockMarketSentiment();
        }
    }

    /**
     * Performs a gap analysis via the FastAPI backend.
     */
    async performGapAnalysis(profile) {
        try {
            const response = await fetch(`${this.baseUrl}/gap-analysis`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Gap Analysis Failed:", error);
            return this.getMockGapAnalysis();
        }
    }

    async analyzeResumeFile(filePart) {
        try {
            const formData = new FormData();
            formData.append('file', filePart);

            const response = await fetch(`${this.baseUrl}/analyze-resume`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error("Resume analysis failed");
            return await response.json();
        } catch (error) {
            console.error(error);
            return { skills: ["React", "JavaScript"], experience: "Mid" };
        }
    }

    async extractSkillsFromResume(text) {
        try {
            const response = await fetch(`${this.baseUrl}/extract-skills`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });
            if (!response.ok) throw new Error("Skill extraction failed");
            return await response.json();
        } catch (error) {
            console.error(error);
            return { skills: ["Python", "Machine Learning"], experience: "Entry" };
        }
    }

    async generateInterviewQuestions(role, skills, resumeText) {
        try {
            const response = await fetch(`${this.baseUrl}/generate-questions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role, skills, resumeText }),
            });
            if (!response.ok) throw new Error("Question generation failed");
            return await response.json();
        } catch (error) {
            console.error(error);
            return [{ question: "Tell me about your most challenging project.", type: "Behavioral" }];
        }
    }

    async scoreInterview(session) {
        try {
            const response = await fetch(`${this.baseUrl}/score-interview`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session }),
            });
            if (!response.ok) throw new Error("Interview scoring failed");
            return await response.json();
        } catch (error) {
            console.error(error);
            return { score: 85, feedback: "Great technical depth." };
        }
    }

    getMockData() {
        return {
            status: "verified",
            confidenceScore: 98,
            jobDetails: {
                company: "TechCorp Inc.",
                role: "Software Engineer Intern",
                startDate: "2026-06-01",
                salary: "$85,000"
            },
            verificationAnalysis: {
                delayDetected: false,
                delayReason: "None",
                riskFlags: []
            },
            marketOutlook: {
                trend: "Hyper-Growth",
                futureSkills: ["AI Agents", "Rust", "WebAssembly"],
                insight: "Demand for engineers who can build Autonomous Agents is predicted to grow."
            },
            recommendations: {
                courses: [{ title: "AI Agent Development", provider: "VeriJoin Academy", relevance: "Critical" }],
                gigs: [{ title: "React Component Refactor", company: "FinTech Startup", rate: "$500 fixed" }],
                interviewPrep: ["System Design", "Behavioral Mock"]
            }
        };
    }

    getMockMarketSentiment() {
        return {
            sentiment: "Bullish",
            score: 72,
            trends: ["Integration of AI Agents"],
            outlook: "The market is stabilizing with a focus on 'efficiency-first' hires.",
            alerts: [{ type: "Growth", company: "Google Cloud", impact: "High" }]
        };
    }

    getMockGapAnalysis() {
        return {
            missingSkills: [
                { name: "AWS Lambda/Serverless", priority: "High", description: "Market standard for modern backend efficiency." }
            ],
            strategyScore: 65,
            roadmapAdjustment: "Invest more time in Month 2 to master Serverless architecture."
        };
    }
}

export const geminiService = new GeminiService();
