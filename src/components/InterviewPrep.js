"use client";

import { motion } from "framer-motion";
import { MessageCircle, FileQuestion, Lightbulb, PlayCircle } from "lucide-react";

export default function InterviewPrep({ data, role }) {
    const steps = data && data.length > 0 ? data : [
        {
            step: "Behavioral Alignment",
            action: "Practice STAR method for leadership questions.",
            resource: "VeriJoin Behavioral Guide"
        },
        {
            step: "Technical Deep Dive",
            action: "Review system design patterns for your domain.",
            resource: "System Design Handbook"
        }
    ];

    return (
        <div style={{ marginTop: '2rem', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '1.5rem', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '0.75rem', background: 'rgba(59, 130, 246, 0.1)' }}>
                    <MessageCircle size={24} style={{ color: 'var(--accent-blue)' }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>Gemini 3 Prep Path</h3>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Tailored interview preparation for your role as a **{role}**.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {steps.map((item, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ x: 5 }}
                        style={{
                            padding: '1rem',
                            background: 'var(--bg-primary)',
                            borderRadius: '1rem',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'flex-start'
                        }}
                    >
                        <FileQuestion size={20} style={{ color: 'var(--accent-blue)', marginTop: '0.25rem' }} />
                        <div>
                            <p style={{ fontWeight: '700', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{item.step}</p>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{item.action}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#10b981' }}>
                                <Lightbulb size={14} /> <span>Resource: {item.resource}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <button style={{
                    padding: '10px 20px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid var(--accent-blue)',
                    color: 'var(--accent-blue)',
                    borderRadius: '8px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <PlayCircle size={18} /> START MOCK INTERVIEW
                </button>
            </div>
        </div>
    );
}
