"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, MessageCircle, Play, Sparkles, Code, Brain, Upload, CheckCircle, ArrowRight, Award, BookOpen, RotateCcw, BarChart3, Target, ShieldCheck, Zap, Clock } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { INTERVIEW_QUESTIONS } from "@/data/questions";
import FileUploader from "./FileUploader";

export default function InterviewSimulator() {
    const { userProfile } = useUser();
    const [state, setState] = useState("idle"); // idle, upload, loading, session, results
    const [selectedFile, setSelectedFile] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const startSetup = () => setState("upload");

    const handleResumeSubmit = async () => {
        if (!selectedFile) return;
        setIsLoading(true);
        setState("loading");
        try {
            // 1. Analyze Resume File
            const formData = new FormData();
            formData.append("action", "analyze_resume_file");
            formData.append("file", selectedFile);

            const analysisRes = await fetch("/api/interview", {
                method: "POST",
                body: formData
            });
            const profile = await analysisRes.json();

            // 2. Generate Real-time Questions from Backend
            const genRes = await fetch("/api/interview", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "generate_questions",
                    data: {
                        role: profile.role || userProfile.role || "Software Engineer",
                        skills: profile.skills || userProfile.skills || ["React"],
                        resumeText: "" // Text analysis is handled by backend file parsing if implemented, or we just pass the extracted profile
                    }
                })
            });

            const selected = await genRes.json();

            setQuestions(selected.map((q, idx) => ({
                id: idx,
                question: q.question,
                answer: "Technical response expected", // Model handles the actual reference scoring
                category: q.type || "Technical",
                difficulty: "Medium"
            })));
            setState("session");
        } catch (error) {
            console.error("Setup failed:", error);
            setState("upload");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnswerSubmission = (ans) => {
        setAnswers(prev => ({ ...prev, [questions[currentStep].id]: ans }));
        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            submitFinalInterview();
        }
    };

    const submitFinalInterview = async () => {
        setIsLoading(true);
        setState("loading");
        try {
            // Prepare matched data for AI evaluation
            const evaluationData = questions.map(q => ({
                question: q.question,
                referenceAnswer: q.answer,
                userAnswer: answers[q.id] || "[NO RESPONSE]"
            }));

            const res = await fetch("/api/interview", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "score_interview",
                    data: {
                        session: evaluationData
                    }
                })
            });
            const scoreData = await res.json();
            setResults(scoreData);
            setState("results");
        } catch (error) {
            console.error("Scoring failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setState("idle");
        setSelectedFile(null);
        setQuestions([]);
        setCurrentStep(0);
        setAnswers({});
        setResults(null);
    };

    return (
        <section id="interviews" style={{ padding: '80px 20px', background: 'var(--bg-primary)' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

                <AnimatePresence mode="wait">
                    {state === "idle" && <IdleView onStart={startSetup} />}
                    {state === "upload" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            style={{
                                background: 'var(--bg-secondary)',
                                padding: '3rem',
                                borderRadius: '2rem',
                                border: '1px solid var(--border-color)',
                                textAlign: 'center'
                            }}
                        >
                            <h3 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem' }}>Upload Professional Resume</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>We'll extract your professional profile to tailor the evaluation feedback.</p>

                            <FileUploader
                                onFileSelect={setSelectedFile}
                                title="Upload Your Resume"
                                id="resume-upload-simulator"
                            />

                            <button
                                onClick={handleResumeSubmit}
                                disabled={!selectedFile}
                                style={{
                                    marginTop: '3rem',
                                    padding: '20px 60px',
                                    background: selectedFile ? '#ed7d31' : 'var(--border-color)',
                                    color: 'white',
                                    borderRadius: '14px',
                                    fontWeight: '900',
                                    fontSize: '1.2rem',
                                    border: 'none',
                                    cursor: selectedFile ? 'pointer' : 'not-allowed',
                                    boxShadow: selectedFile ? '0 10px 30px rgba(237, 125, 49, 0.4)' : 'none',
                                    fontFamily: 'monospace'
                                }}
                            >
                                EXECUTE EXTRACTION_v1.0 <ArrowRight size={20} />
                            </button>
                        </motion.div>
                    )}
                    {state === "loading" && <LoadingView />}
                    {state === "session" && (
                        <SessionView
                            key={`step-${currentStep}`}
                            question={questions[currentStep]}
                            step={currentStep}
                            total={questions.length}
                            onAnswer={handleAnswerSubmission}
                        />
                    )}
                    {state === "results" && <ResultsView result={results} onReset={reset} />}
                </AnimatePresence>

            </div>
        </section>
    );
}

function IdleView({ onStart }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center' }}
        >
            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(237, 125, 49, 0.1)',
                padding: '8px 24px',
                borderRadius: '1rem',
                color: '#ed7d31',
                fontWeight: '900',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                marginBottom: '2rem',
                fontFamily: 'monospace',
                border: '1px solid rgba(237, 125, 49, 0.3)'
            }}>
                <ShieldCheck size={16} /> Technical Lab Verified
            </div>
            <h2 style={{ fontSize: '4.5rem', fontWeight: '900', marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>
                Technical <span style={{ color: '#ed7d31' }}>Examination</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.4rem', maxWidth: '750px', margin: '0 auto 4rem', lineHeight: 1.6 }}>
                Subjected to a high-stakes 10-challenge technical stress test. Binary scoring logic enabled. 1-minute expiration per node.
            </p>
            <button
                onClick={onStart}
                style={{
                    padding: '24px 64px',
                    background: '#ed7d31',
                    color: 'white',
                    borderRadius: '16px',
                    fontWeight: '900',
                    fontSize: '1.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 20px 40px rgba(237, 125, 49, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    margin: '0 auto',
                    fontFamily: 'monospace'
                }}
            >
                BOOT_LAB_SESSION <Play size={28} />
            </button>
        </motion.div>
    );
}

function LoadingView() {
    return (
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 3rem' }}>
                <Brain size={120} style={{ color: '#ed7d31' }} className="animate-pulse" />
                <div style={{ position: 'absolute', inset: -10, border: '2px dashed #ed7d31', borderRadius: '50%', animation: 'spin 4s linear infinite' }} />
                <div style={{ position: 'absolute', inset: 0, border: '4px solid #ed7d31', borderRadius: '50%', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
            </div>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '900', fontFamily: 'monospace' }}>NEURO_SCAN_IN_PROGRESS</h3>
            <p style={{ color: 'var(--text-secondary)', fontFamily: 'monospace' }}>[SUCCESS] Fetching elite technical vectors from bank_v150...</p>
        </div>
    );
}

function SessionView({ question, step, total, onAnswer }) {
    const [localAns, setLocalAns] = useState("");
    const [timeLeft, setTimeLeft] = useState(60);
    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    onAnswer(localAns || "[TIME EXPIRED - NO RESPONSE]");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [step]);

    const handleManualSubmit = () => {
        clearInterval(timerRef.current);
        onAnswer(localAns || "[SKIP]");
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
                background: '#0a0a0a',
                borderRadius: '3rem',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                boxShadow: '0 50px 100px -20px rgba(0,0,0,0.8)',
                position: 'relative'
            }}
        >
            {/* Top Timer Progress Bar */}
            <div style={{ width: '100%', height: '8px', background: '#111' }}>
                <motion.div
                    initial={{ width: '100%' }}
                    animate={{ width: `${(timeLeft / 60) * 100}%` }}
                    transition={{ duration: 1, ease: "linear" }}
                    style={{
                        height: '100%',
                        background: timeLeft <= 10 ? 'linear-gradient(90deg, #ef4444, #dc2626)' : 'linear-gradient(90deg, #ed7d31, #f97316)'
                    }}
                />
            </div>

            <div style={{ padding: '4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{
                            background: 'rgba(237, 125, 49, 0.1)',
                            color: '#ed7d31',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            fontWeight: '900',
                            fontSize: '1rem',
                            fontFamily: 'monospace',
                            border: '1px solid rgba(237, 125, 49, 0.2)'
                        }}>
                            NODE_{step + 1}_V{total}
                        </div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'monospace' }}>
                            <Zap size={18} /> TYPE: TECHNICAL_LOGIC
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        background: timeLeft <= 10 ? 'rgba(239, 68, 68, 0.1)' : '#111',
                        padding: '14px 28px',
                        borderRadius: '16px',
                        border: '1px solid var(--border-color)',
                        minWidth: '160px',
                        justifyContent: 'center'
                    }}>
                        <Clock size={24} style={{ color: timeLeft <= 10 ? '#ef4444' : '#ed7d31' }} />
                        <span style={{
                            fontSize: '1.8rem',
                            fontWeight: '900',
                            fontFamily: 'monospace',
                            color: timeLeft <= 10 ? '#ef4444' : '#ed7d31'
                        }}>
                            {timeLeft < 10 ? `00:0${timeLeft}` : `00:${timeLeft}`}
                        </span>
                    </div>
                </div>

                <div style={{
                    background: '#111',
                    padding: '3rem',
                    borderRadius: '24px',
                    borderLeft: '8px solid #ed7d31',
                    marginBottom: '4rem',
                    boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.5)'
                }}>
                    <h3 style={{ fontSize: '2rem', fontWeight: '800', lineHeight: 1.4, margin: 0, color: '#eee' }}>
                        {question?.question || "Initializing challenge..."}
                    </h3>
                </div>

                <div style={{ position: 'relative' }}>
                    <div style={{
                        position: 'absolute',
                        top: '18px',
                        left: '25px',
                        color: '#00ff00',
                        fontSize: '0.8rem',
                        fontWeight: '900',
                        fontFamily: 'monospace',
                        opacity: 0.7,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <Terminal size={14} /> USER_DERIVATION@VERIJOIN:~$
                    </div>
                    <textarea
                        autoFocus
                        value={localAns}
                        onChange={(e) => setLocalAns(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                                handleManualSubmit();
                            }
                        }}
                        placeholder="Type high-fidelity technical answer here..."
                        style={{
                            width: '100%',
                            height: '240px',
                            background: '#ffffff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '24px',
                            padding: '4rem 2.5rem 2.5rem',
                            color: '#1f2937',
                            fontFamily: 'monospace',
                            fontSize: '1.2rem',
                            marginBottom: '3rem',
                            resize: 'none',
                            outline: 'none',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: '600', fontFamily: 'monospace', opacity: 0.6 }}>
                        CMD: [CTRL] + [ENTER] _TO_COMMIT
                    </div>
                    <button
                        onClick={handleManualSubmit}
                        style={{
                            padding: '24px 56px',
                            background: '#ed7d31',
                            color: 'white',
                            borderRadius: '18px',
                            fontWeight: '900',
                            fontSize: '1.2rem',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            fontFamily: 'monospace',
                            boxShadow: '0 10px 30px rgba(237, 125, 49, 0.4)'
                        }}
                    >
                        {step === total - 1 ? 'FINAL_COMMIT' : 'NEXT_NODE'} <ArrowRight size={22} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

function ResultsView({ result, onReset }) {
    if (!result) return null;
    const isSuccess = result.score >= 50;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
                background: '#0a0a0a',
                padding: '6rem 4rem',
                borderRadius: '4rem',
                border: '1px solid var(--border-color)',
                textAlign: 'center',
                boxShadow: '0 50px 150px -30px rgba(0,0,0,0.9)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Pass/Fail Watermark */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(-15deg)',
                fontSize: '15rem',
                fontWeight: '900',
                color: isSuccess ? 'rgba(34, 197, 94, 0.03)' : 'rgba(239, 68, 68, 0.03)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                zIndex: 0,
                fontFamily: 'monospace'
            }}>
                {isSuccess ? 'QUALIFIED' : 'DISQUALIFIED'}
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    width: '14rem',
                    height: '14rem',
                    borderRadius: '50%',
                    border: `10px solid ${isSuccess ? '#22c55e' : '#ef4444'}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 4rem',
                    background: '#111',
                    boxShadow: `0 0 80px ${isSuccess ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
                }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: '900', color: isSuccess ? '#22c55e' : '#ef4444', fontFamily: 'monospace', padding: '0 20px', textAlign: 'center' }}>NICE TRUY BEETER LUCK NEXT</span>
                    <span style={{ fontSize: '1rem', fontWeight: '900', color: isSuccess ? '#22c55e' : '#ef4444', marginTop: '10px', fontFamily: 'monospace' }}>EXAM_SCORE</span>
                </div>

                <h3 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1rem', letterSpacing: '-0.02em', fontFamily: 'monospace' }}>
                    {isSuccess ? 'QUALIFICATION_NOTICE' : 'REJECTION_DEBRIEF'}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.4rem', marginBottom: '6rem', maxWidth: '700px', margin: '0 auto 6rem', fontFamily: 'monospace' }}>
                    STRICT_EXAMINER_PROTOCOL: Zero-tolerance accuracy evaluation completed.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '4rem', marginBottom: '6rem', textAlign: 'left' }}>
                    <div style={{ background: '#111', padding: '3.5rem', borderRadius: '2.5rem', border: '1px solid var(--border-color)' }}>
                        <h4 style={{ color: '#ed7d31', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '3rem', fontFamily: 'monospace' }}>
                            <BarChart3 size={24} /> CLINICAL_METRICS
                        </h4>
                        {Object.entries(result.breakdown).map(([key, val]) => (
                            <div key={key} style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: '800', marginBottom: '12px', fontFamily: 'monospace' }}>
                                    <span style={{ textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{key}</span>
                                    <span style={{ color: '#ed7d31' }}>{val}%</span>
                                </div>
                                <div style={{ height: '12px', background: '#050505', borderRadius: '6px', border: '1px solid #222' }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${(val / (key === 'correctness' ? 100 : 100)) * 100}%`,
                                        background: isSuccess ? '#22c55e' : '#ed7d31',
                                        borderRadius: '6px'
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ background: '#111', padding: '3.5rem', borderRadius: '2.5rem', border: '1px solid var(--border-color)' }}>
                        <h4 style={{ color: '#ed7d31', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '3rem', fontFamily: 'monospace' }}>
                            <Zap size={24} /> EXAMINER_REMARKS
                        </h4>
                        <p style={{ color: '#eee', lineHeight: 1.8, fontSize: '1.2rem', fontFamily: 'monospace' }}>{result.feedback}</p>
                    </div>
                </div>

                {/* Corrections Hub */}
                <div style={{ textAlign: 'left', marginTop: '8rem' }}>
                    <h4 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '4rem', display: 'flex', alignItems: 'center', gap: '20px', fontFamily: 'monospace' }}>
                        <BookOpen size={40} style={{ color: '#ed7d31' }} /> TECHNICAL_CORRECTION_HUB
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        {result.corrections?.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                style={{
                                    background: '#111',
                                    padding: '3rem',
                                    borderRadius: '2.5rem',
                                    border: `1px solid ${item.status === 'correct' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                                    borderLeft: `12px solid ${item.status === 'correct' ? '#22c55e' : '#ef4444'}`
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                                    <p style={{ fontWeight: '900', fontSize: '1.4rem', color: '#eee', margin: 0, flex: 1, fontFamily: 'monospace' }}>
                                        #{idx + 1} | {item.question}
                                    </p>
                                    <div style={{
                                        background: item.status === 'correct' ? '#22c55e' : '#ef4444',
                                        color: 'white',
                                        padding: '8px 24px',
                                        borderRadius: '12px',
                                        fontWeight: '900',
                                        fontSize: '0.9rem',
                                        textTransform: 'uppercase',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        fontFamily: 'monospace'
                                    }}>
                                        {item.status === 'correct' ? <CheckCircle size={16} /> : <X size={16} />}
                                        {item.status}
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                                    <div>
                                        <p style={{ fontSize: '0.9rem', fontWeight: '900', color: 'var(--text-secondary)', marginBottom: '15px', textTransform: 'uppercase', fontFamily: 'monospace' }}>CAPTURED_RESPONSE</p>
                                        <div style={{ background: '#050505', padding: '1.5rem', borderRadius: '16px', fontSize: '1.1rem', color: '#ed7d31', border: '1px solid #222', fontFamily: 'monospace', minHeight: '100px' }}>
                                            {item.userAnswer}
                                        </div>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.9rem', fontWeight: '900', color: '#ed7d31', marginBottom: '15px', textTransform: 'uppercase', fontFamily: 'monospace' }}>ENGINE_REFERENCE</p>
                                        <div style={{ background: '#0a0a0a', padding: '1.5rem', borderRadius: '16px', fontSize: '1.1rem', color: '#eee', border: '1px solid #333', fontFamily: 'monospace', minHeight: '100px' }}>
                                            {item.referenceAnswer}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginTop: '8rem' }}>
                    <button
                        onClick={onReset}
                        style={{
                            padding: '24px 72px',
                            background: '#ed7d31',
                            color: 'white',
                            borderRadius: '18px',
                            fontWeight: '900',
                            fontSize: '1.6rem',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 20px 40px rgba(237, 125, 49, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            fontFamily: 'monospace'
                        }}
                    >
                        <RotateCcw size={32} /> RE-INITIALIZE_SYSTEM
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
