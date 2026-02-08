"use client";

import FileUploader from "@/components/FileUploader";
import CompanyNews from "@/components/CompanyNews";
import OpportunityHub from "@/components/OpportunityHub";
import InterviewPrep from "@/components/InterviewPrep";
import OnboardingRoadmap from "@/components/OnboardingRoadmap";
import SkillDevelopment from "@/components/SkillDevelopment";
import InterviewSimulator from "@/components/InterviewSimulator";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, CheckCircle } from "lucide-react";

export default function VerifyPage() {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("idle");
    const [result, setResult] = useState(null);

    const handleFileSelect = async (selectedFile) => {
        setFile(selectedFile);
        setStatus("analyzing");

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);

            const response = await fetch("/api/verify", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Verification failed");
            }

            const data = await response.json();
            setResult(data);
            setStatus("complete");
        } catch (error) {
            console.error(error);
            setStatus("idle");
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="container mx-auto px-8 pt-20 pb-20">
            <AnimatePresence mode="wait">

                {status === "idle" && (
                    <motion.div
                        key="upload"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center"
                    >
                        <h1 className="mb-4">Start Verification</h1>
                        <p className="text-xl mb-12" style={{ color: 'var(--text-secondary)' }}>Upload your offer letter to get instant AI-powered insights.</p>
                        <FileUploader onFileSelect={handleFileSelect} id="offer-letter-upload" />
                    </motion.div>
                )}

                {status === "analyzing" && (
                    <motion.div
                        key="analyzing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center min-h-[400px]"
                    >
                        <div className="relative">
                            <BrainCircuit className="w-24 h-24 animate-pulse relative z-10" style={{ color: 'var(--accent-blue)' }} />
                        </div>
                        <h2 className="mt-8 mb-2">AI is Reasoning...</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Analyzing document structure, headers, and language patterns.</p>

                        <div className="w-64 h-2 rounded-full mt-8 overflow-hidden relative" style={{ background: 'var(--bg-secondary)' }}>
                            <motion.div
                                className="absolute top-0 left-0 h-full w-1/2"
                                style={{ background: 'linear-gradient(90deg, #3b82f6, #60a5fa)' }}
                                animate={{ x: [-100, 300] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                    </motion.div>
                )}

                {status === "complete" && result && (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="glass p-8 rounded-3xl border-green-500/30" style={{ background: 'rgba(16, 185, 129, 0.05)' }}>
                            <div className="flex items-center gap-4 mb-6">
                                <CheckCircle className="w-12 h-12 text-green-500" />
                                <div>
                                    <h2>Offer Verified</h2>
                                    <p style={{ color: '#10b981' }}>Confidence Score: {result.confidenceScore}%</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-4 rounded-xl glass">
                                    <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Company</h4>
                                    <p className="text-xl font-semibold">{result.jobDetails.company}</p>
                                </div>
                                <div className="p-4 rounded-xl glass">
                                    <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Role</h4>
                                    <p className="text-xl font-semibold">{result.jobDetails.role}</p>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
                                <OpportunityHub data={result} />
                            </div>

                            <CompanyNews companyName={result.jobDetails.company} />

                            {/* AI Post-Verification Toolkit */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                                <InterviewPrep role={result.jobDetails.role} />
                                <OnboardingRoadmap />
                            </div>
                        </div>

                        <div className="text-center mt-8">
                            <button onClick={() => { setStatus("idle"); setResult(null); }} className="hover:text-blue-500 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                                Upload another document
                            </button>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>

            {/* Always visible components at the bottom of Verify page */}
            <div style={{ marginTop: '5rem', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '5rem' }}>
                <InterviewSimulator />
                <SkillDevelopment />
            </div>
        </div>
    );
}
