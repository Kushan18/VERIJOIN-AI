import google.generativeai as genai
import os
import json
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv

load_dotenv()

class GeminiService:
    def __init__(self):
        self.api_key = os.getenv("GOOGLE_API_KEY")
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel("gemini-2.0-flash-exp") # Updated to latest experimental model for Hackathon requirements
        else:
            self.model = None

    async def analyze_offer(self, file_content: bytes, mime_type: str) -> Dict[str, Any]:
        if not self.model:
            return self.get_mock_data()

        prompt = """
        You are VeriJoin's Trust Agent powered by Gemini 3. Analyze this job offer letter.
        
        Detect:
        1. Verification Delays (Are there gaps or suspicious timelines?)
        2. Offer details (Company, Role, Salary, Date)
        3. Risks and Authenticity signals.
        
        Tailor Recommendations:
        - Specific courses for the role and skills.
        - Interview preparation paths.
        - Trusted part-time jobs/gigs for the bridge period.
        
        Return a strict JSON object:
        {
          "status": "verified" | "suspicious" | "processing",
          "confidenceScore": number (0-100),
          "jobDetails": {
            "company": "string",
            "role": "string",
            "startDate": "YYYY-MM-DD",
            "salary": "string"
          },
          "verificationAnalysis": {
            "delayDetected": boolean,
            "delayReason": "string",
            "riskFlags": ["string"]
          },
          "marketOutlook": {
            "trend": "string",
            "futureSkills": ["string"],
            "insight": "string"
          },
          "recommendations": {
            "courses": [{"title": "string", "provider": "string", "relevance": "string", "reason": "string"}],
            "gigs": [{"title": "string", "company": "string", "rate": "string", "description": "string"}],
            "interviewPrep": [{"step": "string", "action": "string", "resource": "string"}]
          },
          "agentReasoning": "Summarize why you recommended these specific items based on the candidate's situation and hiring wait time."
        }
        
        Return JSON only.
        """

        try:
            response = self.model.generate_content([
                prompt,
                {"mime_type": mime_type, "data": file_content}
            ])
            text = response.text
            cleaned_text = text.replace("```json", "").replace("```", "").strip()
            return json.loads(cleaned_text)
        except Exception as e:
            print(f"AI Analysis Failed: {e}")
            return self.get_mock_data()

    async def chat(self, history: List[Dict[str, Any]], message: str) -> str:
        if not self.model:
            return "I am currently in mock mode. How can I help with your career today?"

        chat = self.model.start_chat(history=history)
        system_context = "You are VeriJoin's AI Career Assistant (Gemini 3). You help users with offer verification, career gaps, and upskilling. Be professional, supportive, and concise. Adapt guidance based on role, skills, and waiting time."
        
        try:
            response = chat.send_message(f"{system_context}\n\nUser: {message}")
            return response.text
        except Exception as e:
            print(f"Chat failed: {e}")
            return "I'm having trouble thinking. Please try again."

    async def analyze_market_sentiment(self, role: str) -> Dict[str, Any]:
        if not self.model:
            return {
                "sentiment": "Neutral", 
                "score": 50, 
                "trends": ["AI Integration", "Cloud Native"], 
                "outlook": "Moderate growth requiring upskilling.",
                "alerts": [{"company": "Tech Giant Inc", "type": "Layoff", "impact": "High"}]
            }
        
        prompt = f"Analyze market sentiment for the role: {role}. Return JSON with sentiment (Bullish/Bearish/Neutral), score (0-100), trends (list), outlook (string)."
        try:
            response = self.model.generate_content(prompt)
            return json.loads(response.text.replace("```json", "").replace("```", "").strip())
        except:
            return {
                "sentiment": "Neutral", 
                "score": 50, 
                "trends": ["Market Stability", "Remote Work"], 
                "outlook": "Steady demand expected.",
                "alerts": [{"company": "Pending Analysis", "type": "Monitoring", "impact": "Low"}]
            }

    async def perform_gap_analysis(self, profile: Dict[str, Any]) -> Dict[str, Any]:
        if not self.model:
            return {"strategyScore": 50, "missingSkills": []}
            
        prompt = f"Perform gap analysis for {profile['role']} with skills {profile['skills']}. Return JSON with missingSkills (named, priority, description), strategyScore (0-100), and roadmapAdjustment."
        try:
            response = self.model.generate_content(prompt)
            data = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(data)
        except:
            return {"strategyScore": 50, "missingSkills": []}

    async def analyze_resume(self, resume_content: str) -> Dict[str, Any]:
        if not self.model:
            return {"skills": [], "experience": "Entry"}
        
        prompt = f"Analyze this resume content and extract skills and experience level. Return JSON: {{'skills': ['string'], 'experience': 'Entry' | 'Mid' | 'Senior'}}\n\nResume: {resume_content}"
        try:
            response = self.model.generate_content(prompt)
            data = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(data)
        except:
            return {"skills": [], "experience": "Entry"}

    async def analyze_resume_file(self, file_content: bytes, mime_type: str) -> Dict[str, Any]:
        if not self.model:
            return {"skills": [], "experience": "Entry"}
        
        prompt = "Analyze this resume file and extract skills and experience level. Return JSON: {'skills': ['string'], 'experience': 'Entry' | 'Mid' | 'Senior'}"
        try:
            response = self.model.generate_content([
                prompt,
                {"mime_type": mime_type, "data": file_content}
            ])
            data = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(data)
        except:
            return {"skills": [], "experience": "Entry"}

    async def generate_interview_questions(self, role: str, skills: List[str], resume_text: Optional[str] = None) -> List[Dict[str, Any]]:
        if not self.model:
            return [{"question": "Tell me about yourself.", "type": "Behavioral"}]
        
        prompt = f"Generate 5 interview questions for a {role} with skills: {', '.join(skills)}. Consider resume if provided: {resume_text}. Return JSON list: [{{'question': 'string', 'type': 'Technical' | 'Behavioral' | 'Situational'}}]"
        try:
            response = self.model.generate_content(prompt)
            data = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(data)
        except:
            return [{"question": "Tell me about yourself.", "type": "Behavioral"}]

    async def score_interview(self, session_data: List[Dict[str, Any]]) -> Dict[str, Any]:
        if not self.model:
            return {"score": 75, "feedback": "Good job."}
        
        prompt = f"Analyze this interview session and provide a score (0-100) and detailed feedback. Session: {json.dumps(session_data)}. Return JSON: {{'score': number, 'feedback': 'string', 'strengths': ['string'], 'improvements': ['string']}}"
        try:
            response = self.model.generate_content(prompt)
            data = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(data)
        except:
            return {"score": 75, "feedback": "Nice effort. Focus on technical specifics."}

    def get_mock_data(self):
        return {
            "status": "verified",
            "confidenceScore": 95,
            "jobDetails": {
                "company": "MockTech",
                "role": "Engineer",
                "startDate": "2026-07-01",
                "salary": "$90,000"
            },
            "verificationAnalysis": {
                "delayDetected": False,
                "delayReason": "None",
                "riskFlags": []
            },
            "marketOutlook": {
                "trend": "Stable",
                "futureSkills": ["AI"],
                "insight": "Positive outlook."
            },
            "recommendations": {
                "courses": [{"title": "Advanced Python for AI", "provider": "VeriJoin Academy", "relevance": "High", "reason": "Your role requires rapid prototyping of AI agents."}],
                "gigs": [{"title": "AI Agent Reviewer", "company": "Agentic Co", "rate": "$45/hr", "description": "Validate LLM outputs for technical accuracy."}],
                "interviewPrep": [
                    {"step": "Architecture Review", "action": "Deep dive into system design for LLMs", "resource": "VeriJoin Interview Handbook"},
                    {"step": "Behavioral Mock", "action": "Practice STAR method for technical leadership", "resource": "AI Mock Simulator"}
                ]
            },
            "agentReasoning": "Given your start date is 2 months away, I recommend focusing on AI orchestration skills which are trending for your role at MockTech."
        }
