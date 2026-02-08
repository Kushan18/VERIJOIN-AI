"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Zap, TrendingUp, Clock, DollarSign, Brain } from "lucide-react";

export default function OpportunityHub({ data }) {
    const [activeTab, setActiveTab] = useState("gigs"); // gigs, internships, future

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    const hubStyle = {
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        padding: '2rem',
        borderRadius: '1.5rem',
        marginTop: '2rem',
        color: 'var(--text-primary)'
    };

    return (
        <div style={hubStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                        <Zap size={24} style={{ color: '#fbbf24' }} />
                        Gemini 3 Opportunity Hub
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>Tailored agent-driven career recommendations.</p>
                </div>

                <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.05)', padding: '4px', borderRadius: '0.75rem' }}>
                    {["gigs", "courses", "future"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '0.5rem',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                textTransform: 'capitalize',
                                background: activeTab === tab ? 'var(--accent-blue)' : 'transparent',
                                color: activeTab === tab ? '#ffffff' : 'var(--text-secondary)'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    variants={container}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, y: -10 }}
                    style={{ display: 'grid', gap: '1rem' }}
                >
                    {activeTab === "future" ? (
                        <FutureInsightView market={data.marketOutlook} />
                    ) : activeTab === "courses" ? (
                        <CoursesList items={data.recommendations.courses} variants={item} />
                    ) : (
                        <OpportunitiesList type={activeTab} items={data.recommendations.gigs} variants={item} />
                    )}
                </motion.div>
            </AnimatePresence>

            {data.agentReasoning && (
                <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '1rem', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '4px', background: 'var(--accent-blue)' }}></div>
                    <h4 style={{ color: 'var(--accent-blue)', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
                        <Brain size={18} /> Gemini Reasoning
                    </h4>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6', margin: 0, fontStyle: 'italic', color: 'var(--text-primary)' }}>"{data.agentReasoning}"</p>
                </div>
            )}

            {data.verificationAnalysis?.delayDetected && (
                <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '1rem' }}>
                    <h4 style={{ color: '#ef4444', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={18} /> Verification Delay Detected
                    </h4>
                    <p style={{ fontSize: '0.875rem', margin: 0 }}>{data.verificationAnalysis.delayReason}</p>
                </div>
            )}
        </div>
    );
}

function CoursesList({ items, variants }) {
    if (!items?.length) return <p style={{ color: 'var(--text-secondary)' }}>No recommended courses.</p>;

    return items.map((course, idx) => (
        <motion.div
            key={idx}
            variants={variants}
            style={{
                padding: '1.25rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--border-color)',
                background: 'rgba(255, 255, 255, 0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                    <Zap size={20} style={{ color: '#60a5fa' }} />
                </div>
                <div>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: '800', margin: 0 }}>{course.title}</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: '0.25rem 0' }}>{course.provider} • Relevance: {course.relevance}</p>
                    {course.reason && <p style={{ fontSize: '0.75rem', color: '#10b981', margin: 0 }}>Why: {course.reason}</p>}
                </div>
            </div>
            <button style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'var(--accent-blue)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600' }}>
                Enroll
            </button>
        </motion.div>
    ));
}

function OpportunitiesList({ items, variants }) {
    if (!items?.length) return <p style={{ color: 'var(--text-secondary)' }}>No active opportunities.</p>;

    return items.map((opp, idx) => (
        <motion.div
            key={idx}
            variants={variants}
            style={{
                padding: '1.25rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--border-color)',
                background: 'rgba(255, 255, 255, 0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                    <Briefcase size={20} style={{ color: '#67e8f9' }} />
                </div>
                <div>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: '800', margin: 0 }}>{opp.title}</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: '0.25rem 0' }}>{opp.company}</p>
                    {opp.description && <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>{opp.description}</p>}
                </div>
            </div>

            <div style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'flex-end', color: '#34d399', fontWeight: '800' }}>
                    <DollarSign size={16} /> {opp.rate || opp.stipend}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'flex-end', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    <Clock size={12} /> {opp.duration}
                </div>
            </div>
        </motion.div>
    ));
}
