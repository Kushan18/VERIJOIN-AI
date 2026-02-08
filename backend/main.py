from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uvicorn
import os
from services.gemini import GeminiService

app = FastAPI(title="VeriJoin Agent Backend")

@app.get("/")
async def root():
    return {"message": "VeriJoin Agent Backend is running"}

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

gemini_service = GeminiService()

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    history: List[ChatMessage]
    message: str

class ProfileData(BaseModel):
    role: str
    skills: List[str]
    experience: str

class ResumeTextRequest(BaseModel):
    text: str

class InterviewQuestionsRequest(BaseModel):
    role: str
    skills: List[str]
    resumeText: Optional[str] = None

class ScoreRequest(BaseModel):
    session: List[Dict[str, Any]]

@app.post("/api/analyze-offer")
async def analyze_offer(file: UploadFile = File(...)):
    try:
        content = await file.read()
        mime_type = file.content_type
        result = await gemini_service.analyze_offer(content, mime_type)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):
    try:
        content = await file.read()
        mime_type = file.content_type
        result = await gemini_service.analyze_resume_file(content, mime_type)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        history = [{"role": m.role, "parts": [m.content]} for m in request.history]
        response = await gemini_service.chat(history, request.message)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/market-sentiment")
async def market_sentiment(role: str):
    return await gemini_service.analyze_market_sentiment(role)

@app.post("/api/gap-analysis")
async def gap_analysis(profile: ProfileData):
    return await gemini_service.perform_gap_analysis(profile.dict())

@app.post("/api/extract-skills")
async def extract_skills(request: ResumeTextRequest):
    return await gemini_service.analyze_resume(request.text)

@app.post("/api/generate-questions")
async def generate_questions(request: InterviewQuestionsRequest):
    return await gemini_service.generate_interview_questions(request.role, request.skills, request.resumeText)

@app.post("/api/score-interview")
async def score_interview(request: ScoreRequest):
    return await gemini_service.score_interview(request.session)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8005)
