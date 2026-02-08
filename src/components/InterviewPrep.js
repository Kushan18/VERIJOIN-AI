"use client";

import { motion } from "framer-motion";
import { MessageCircle, FileQuestion, Lightbulb, PlayCircle } from "lucide-react";

export default function InterviewPrep({ role }) {
    const questions = [
        {
            q: "How would you handle a production bug in your first week?",
            hint: "Focus on communication and following established procedures."
        },
        {
            q: "What technical problem have you solved that you're most proud of?",
            hint: "Explain the 'Why' and 'How' behind your solution."
        },
        {
            q: "Tell us about a time you disagreed with a team member.",
            hint: "Highlight your empathy and conflict resolution skills."
        }
    ];

    return (
        <div style={{ marginTop: '2rem', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '1.5rem', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '0.75rem', background: 'rgba(59, 130, 246, 0.1)' }}>
                    <MessageCircle size={24} style={{ color: 'var(--accent-blue)' }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>AI Interview Prep</h3>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Tailored questions for your new role as a **{role}**.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {questions.map((item, idx) => (
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
                            <p style={{ fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{item.q}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#10b981' }}>
                                <Lightbulb size={14} /> <span>Pro Tip: {item.hint}</span>
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
