"use client";

import { motion } from "framer-motion";
import { Newspaper, TrendingUp, Users } from "lucide-react";

const MOCK_NEWS = [
    {
        id: 1,
        title: "TechCorp announces new AI Division targeting Gen Z markets",
        source: "TechCrunch",
        time: "2h ago",
        sentiment: "positive",
        category: "Strategy"
    },
    {
        id: 2,
        title: "Quarterly Earnings beat expectations by 15%",
        source: "Bloomberg",
        time: "5h ago",
        sentiment: "positive",
        category: "Finance"
    },
    {
        id: 3,
        title: "New Remote Work Benefit Policy for Interns",
        source: "LifeAtTechCorp",
        time: "1d ago",
        sentiment: "neutral",
        category: "Culture"
    }
];

export default function CompanyNews({ companyName }) {
    return (
        <div
            className="glass p-6 rounded-3xl mt-8"
            style={{ color: 'var(--text-primary)' }}
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl" style={{ background: 'rgba(237, 125, 49, 0.1)' }}>
                    <Newspaper size={24} style={{ color: '#ed7d31' }} />
                </div>
                <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0 }}>Intelligence Hub</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>Live signals for {companyName}</p>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {MOCK_NEWS.map((news, idx) => (
                    <motion.div
                        key={news.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        style={{
                            display: 'flex',
                            gap: '1rem',
                            padding: '1rem',
                            borderRadius: '0.75rem',
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-primary)',
                            cursor: 'pointer'
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', minWidth: '60px' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{news.time}</span>
                            {news.sentiment === 'positive' && <TrendingUp size={16} style={{ color: '#10b981' }} />}
                            {news.sentiment === 'neutral' && <Users size={16} style={{ color: '#3b82f6' }} />}
                        </div>

                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                <span style={{
                                    fontSize: '0.625rem',
                                    textTransform: 'uppercase',
                                    fontWeight: '900',
                                    letterSpacing: '0.05em',
                                    padding: '2px 8px',
                                    borderRadius: '9999px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    color: 'var(--text-secondary)',
                                    border: '1px solid var(--border-color)'
                                }}>
                                    {news.category}
                                </span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{news.source}</span>
                            </div>
                            <h4 style={{ fontSize: '1rem', fontWeight: '700', margin: 0, color: 'var(--text-primary)' }}>
                                {news.title}
                            </h4>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
                <button style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                }}>
                    View all 12 signals →
                </button>
            </div>
        </div>
    );
}
