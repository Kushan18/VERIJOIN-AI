"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { Target, Search, CheckCircle2, AlertCircle, Compass, Rocket, Calendar, ChevronRight, BrainCircuit } from "lucide-react";

// Mock gap analysis data
const MOCK_GAP_DATA = {
    missingSkills: [
        { name: "AWS Lambda/Serverless", priority: "High", description: "Market standard for modern backend efficiency." },
        { name: "TypeScript", priority: "High", description: "Critical for enterprise-grade React codebases." },
        { name: "System Design Patterns", priority: "Medium", description: "Required for mid-level scalability discussions." }
    ],
    strategyScore: 65,
    marketStandard: ["React 19 Hooks", "Kubernetes", "GraphQL", "Agile Leadership"],
    roadmapAdjustment: "Invest more time in Month 2 to master Serverless architecture as local demand is spiking."
};

export default function StrategyEngine() {
    const { userProfile } = useUser();
    const [gapData, setGapData] = useState(MOCK_GAP_DATA);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Data is loaded immediately with mock data
        setIsLoading(false);
    }, []);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
            <div style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(59, 130, 246, 0.1)', padding: '8px 20px', borderRadius: '2rem', color: 'var(--accent-blue)', fontWeight: '800', fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                    <BrainCircuit size={18} /> Intelligent Strategy Engine
                </div>
                <h1 style={{ fontSize: '3rem', fontWeight: '900', letterSpacing: '-0.03em', marginBottom: '1rem' }}>Gap Analysis & Execution</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px' }}>
                    Comparing your profile against modern industry requirements for <strong>{userProfile.role || "Target Role"}</strong>.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2.5rem', alignItems: 'start' }}>

                {/* Left: Strategy Score & Standards */}
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={panelStyle}
                    >
                        <h3 style={panelTitleStyle}><Compass size={20} /> Readiness Score</h3>
                        <div style={{ position: 'relative', width: '150px', height: '150px', margin: '1.5rem auto' }}>
                            <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                                <circle cx="50" cy="50" r="45" fill="none" stroke="var(--accent-blue)" strokeWidth="10" strokeDasharray="283" strokeDashoffset={283 - (283 * gapData.strategyScore / 100)} style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
                            </svg>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '2.5rem', fontWeight: '900' }}>
                                {gapData.strategyScore}%
                            </div>
                        </div>
                        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Based on {userProfile?.skills?.length || 0} verified technical signals.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        style={panelStyle}
                    >
                        <h3 style={panelTitleStyle}><Target size={20} /> Market Standard</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                            {gapData.marketStandard.map((std, i) => (
                                <span key={i} style={chipStyle}>{std}</span>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right: Detected Gaps & Roadmap Adjustments */}
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ ...panelStyle, borderLeft: '6px solid #ed7d31' }}
                    >
                        <h3 style={{ ...panelTitleStyle, color: '#ed7d31' }}><AlertCircle size={20} /> Identity Gaps (Priority Fixes)</h3>
                        <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1.5rem' }}>
                            {gapData.missingSkills.map((skill, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1.25rem', padding: '1.25rem', background: 'var(--bg-primary)', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                                    <div style={{ padding: '8px', background: skill.priority === 'High' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(251, 191, 36, 0.1)', borderRadius: '8px', height: 'fit-content' }}>
                                        <AlertCircle size={20} style={{ color: skill.priority === 'High' ? '#f43f5e' : '#fbbf24' }} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{skill.name}</div>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{skill.description}</p>
                                        <div style={{ display: 'inline-block', marginTop: '10px', fontSize: '0.75rem', fontWeight: '900', color: skill.priority === 'High' ? '#f43f5e' : '#fbbf24', textTransform: 'uppercase' }}>
                                            Priority: {skill.priority}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{ ...panelStyle, background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ ...panelTitleStyle, marginBottom: 0 }}><Calendar size={20} /> Roadmap Adjustment</h3>
                            <div style={{ padding: '6px 12px', background: '#10b981', color: 'white', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '900' }}>AUTO-UPDATED</div>
                        </div>
                        <p style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                            "{gapData.roadmapAdjustment}"
                        </p>
                        <button
                            style={{
                                width: '100%',
                                padding: '1.25rem',
                                background: 'white',
                                color: 'black',
                                borderRadius: '1rem',
                                fontWeight: '900',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                            }}
                        >
                            SYNC WITH ONBOARDING ROADMAP <Rocket size={20} />
                        </button>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}

function StrategyLoading() {
    return (
        <div style={{ textAlign: 'center', padding: '120px 0' }}>
            <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 3rem' }}>
                <div style={{ position: 'absolute', width: '80px', height: '80px', border: '5px solid var(--border-color)', borderRadius: '50%' }} />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    style={{ position: 'absolute', width: '80px', height: '80px', border: '5px solid transparent', borderTopColor: 'var(--accent-blue)', borderRadius: '50%' }}
                />
                <Target size={32} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--accent-blue)' }} />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: '900' }}>Neuro-Gap Analysis In Progress</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Comparing your profile against 50k+ market data points...</p>
        </div>
    );
}

const panelStyle = {
    background: 'var(--bg-secondary)',
    padding: '2.5rem',
    borderRadius: '2rem',
    border: '1px solid var(--border-color)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
};

const panelTitleStyle = {
    fontSize: '1.1rem',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '1.5rem',
    color: 'var(--text-primary)'
};

const chipStyle = {
    padding: '6px 14px',
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--text-secondary)'
};
