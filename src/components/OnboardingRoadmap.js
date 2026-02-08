"use client";

import { motion } from "framer-motion";
import { Flag, Target, TrendingUp, CheckCircle2 } from "lucide-react";

export default function OnboardingRoadmap() {
    const phases = [
        {
            title: "Day 0-30: The Foundation",
            goal: "Understand team workflows, tooling, and existing codebase.",
            tasks: ["Complete onboarding documentation", "Set up local dev environment", "Submit first 3 bug fixes"]
        },
        {
            title: "Day 31-60: Integration",
            goal: "Take ownership of a small feature and collaborate with stakeholders.",
            tasks: ["Lead one sub-task in a sprint", "Conduct 10+ code reviews", "Contribute to internal technical docs"]
        },
        {
            title: "Day 61-90: The Impact",
            goal: "Deploy a significant feature and propose internal improvements.",
            tasks: ["Full feature release", "Propose a process optimization", "Mentor a new joiner or peer"]
        }
    ];

    return (
        <div style={{ marginTop: '2rem', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '1.5rem', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '0.75rem', background: 'rgba(16, 185, 129, 0.1)' }}>
                    <Flag size={24} style={{ color: '#10b981' }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>Onboarding Roadmap</h3>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Your AI-generated **30-60-90 Day Plan** for long-term career success.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {phases.map((phase, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.01 }}
                        style={{
                            padding: '1.5rem',
                            background: 'var(--bg-primary)',
                            borderRadius: '1rem',
                            border: '1px solid var(--border-color)',
                            backgroundColor: idx === 0 ? 'rgba(16, 185, 129, 0.03)' : 'var(--bg-primary)'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: idx === 0 ? '#10b981' : 'var(--bg-secondary)',
                                color: idx === 0 ? 'white' : 'var(--text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.875rem',
                                fontWeight: '900',
                                border: '1px solid var(--border-color)'
                            }}>
                                {idx + 1}
                            </div>
                            <h4 style={{ fontSize: '1.125rem', fontWeight: '800', margin: 0 }}>{phase.title}</h4>
                            {idx === 0 && (
                                <span style={{ fontSize: '0.625rem', fontWeight: '900', textTransform: 'uppercase', background: '#10b981', color: 'white', padding: '2px 8px', borderRadius: '4px' }}>
                                    Current Focus
                                </span>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <Target size={16} style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }} />
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: 0, fontWeight: '600' }}>
                                Goal: <span style={{ fontWeight: '400', color: 'var(--text-secondary)' }}>{phase.goal}</span>
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                            {phase.tasks.map((task, tidx) => (
                                <div key={tidx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                    <CheckCircle2 size={14} style={{ color: '#10b981' }} />
                                    <span>{task}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button style={{
                    padding: '12px 24px',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: '8px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <TrendingUp size={18} /> EXPORT PDF ROADMAP
                </button>
            </div>
        </div>
    );
}
