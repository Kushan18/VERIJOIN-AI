"use client";

import { motion } from "framer-motion";
import { History, FileText, CheckCircle, AlertTriangle, Calendar, ExternalLink, ShieldCheck, DollarSign, Users } from "lucide-react";

export default function OfferHistory() {
    const history = [
        {
            id: 1,
            company: "TechCorp Inc.",
            role: "Software Engineer Intern",
            date: "2026-02-06",
            status: "Verified",
            confidence: 98,
            salaryTrend: "Top 10% in India",
            cultureScore: "4.8/5 (Elite)"
        },
        {
            id: 2,
            company: "Unknown LLC",
            role: "Data Analyst",
            date: "2026-01-15",
            status: "Suspicious",
            confidence: 45,
            salaryTrend: "N/A - Risk Detected",
            cultureScore: "No Data"
        },
        {
            id: 3,
            company: "Global Systems",
            role: "Frontend Developer",
            date: "2025-12-20",
            status: "Verified",
            confidence: 95,
            salaryTrend: "Average for Bengaluru",
            cultureScore: "4.2/5 (Good)"
        }
    ];

    const containerStyle = {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 20px',
        color: 'var(--text-primary)'
    };

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '3rem'
    };

    const cardStyle = {
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '1.5rem',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        marginBottom: '1rem',
        transition: 'all 0.3s ease'
    };

    return (
        <div style={containerStyle}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div style={headerStyle}>
                    <div style={{ padding: '0.75rem', borderRadius: '1rem', background: 'rgba(59, 130, 246, 0.1)' }}>
                        <History size={32} style={{ color: 'var(--accent-blue)' }} />
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '900', margin: 0 }}>Offer History</h1>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {history.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            style={cardStyle}
                        >
                            {/* Main Info Row */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
                                    <div style={{
                                        width: '3.5rem',
                                        height: '3.5rem',
                                        borderRadius: '1rem',
                                        background: 'var(--bg-primary)',
                                        border: '1px solid var(--border-color)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {item.status === 'Verified' ? (
                                            <ShieldCheck size={24} style={{ color: '#10b981' }} />
                                        ) : (
                                            <AlertTriangle size={24} style={{ color: '#ef4444' }} />
                                        )}
                                    </div>

                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 0.25rem 0' }}>{item.company}</h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <FileText size={14} /> {item.role}
                                            </span>
                                            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <Calendar size={14} /> {item.date}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{
                                            fontSize: '0.75rem',
                                            fontWeight: '900',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                            color: item.status === 'Verified' ? '#10b981' : '#ef4444',
                                            marginBottom: '0.25rem'
                                        }}>
                                            {item.status}
                                        </div>
                                        <div style={{ fontSize: '1.125rem', fontWeight: '800' }}>
                                            {item.confidence}% <span style={{ fontSize: '0.75rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Trust</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Intelligence Row (Added 1, 4) */}
                            {item.status === 'Verified' && (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '1rem',
                                    paddingTop: '1rem',
                                    borderTop: '1px solid var(--border-color)'
                                }}>
                                    <div style={{
                                        background: 'rgba(16, 185, 129, 0.05)',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '0.75rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        border: '1px solid rgba(16, 185, 129, 0.1)'
                                    }}>
                                        <DollarSign size={18} style={{ color: '#10b981' }} />
                                        <div>
                                            <div style={{ fontSize: '0.65rem', fontWeight: '900', textTransform: 'uppercase', opacity: 0.6 }}>Salary Benchmark</div>
                                            <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>{item.salaryTrend}</div>
                                        </div>
                                    </div>

                                    <div style={{
                                        background: 'rgba(59, 130, 246, 0.05)',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '0.75rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        border: '1px solid rgba(59, 130, 246, 0.1)'
                                    }}>
                                        <Users size={18} style={{ color: '#3b82f6' }} />
                                        <div>
                                            <div style={{ fontSize: '0.65rem', fontWeight: '900', textTransform: 'uppercase', opacity: 0.6 }}>Company Culture</div>
                                            <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>{item.cultureScore}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* View Details Button (Bottom right of the whole card) */}
                            <div style={{ alignSelf: 'flex-end', marginTop: '-0.5rem' }}>
                                <button style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--accent-blue)',
                                    fontSize: '0.875rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem'
                                }}>
                                    FULL ANALYSIS <ExternalLink size={14} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {history.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-secondary)' }}>
                        <FileText size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                        <p>No verification history found.</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
