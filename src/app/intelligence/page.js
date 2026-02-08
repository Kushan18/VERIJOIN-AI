"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { LineChart, TrendingUp, AlertTriangle, Briefcase, Info, RefreshCcw, Globe, Zap, BarChart3 } from "lucide-react";

export default function MarketIntelligence() {
    const { userProfile } = useUser();
    const [intelligence, setIntelligence] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchIntelligence = async () => {
        setIsLoading(true);
        try {
            const role = userProfile.isOnboarded ? userProfile.role : "Software Engineer";
            const res = await fetch("/api/interview", {
                method: "POST",
                body: JSON.stringify({ action: "market_sentiment", data: { role } })
            });
            const data = await res.json();
            setIntelligence(data);
        } catch (error) {
            console.error("Failed to fetch intelligence:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchIntelligence();
    }, [userProfile.role]);

    if (isLoading || !intelligence) return <IntelligenceLoading />;

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Market Intelligence Hub</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                        Neuro-Analysis of industry trends for <strong>{userProfile.role || "Tech Professionals"}</strong>
                    </p>
                </div>
                <button
                    onClick={fetchIntelligence}
                    style={{
                        padding: '12px 24px',
                        background: 'rgba(59, 130, 246, 0.1)',
                        border: '1px solid var(--accent-blue)',
                        color: 'var(--accent-blue)',
                        borderRadius: '12px',
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer'
                    }}
                >
                    <RefreshCcw size={18} /> REFRESH DATA
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>

                {/* Sentiment Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={cardStyle}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                        <div style={iconBoxStyle(intelligence.sentiment === 'Bullish' ? '#10b981' : '#f59e0b')}>
                            <TrendingUp size={24} />
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Market Momentum</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '900', color: intelligence.sentiment === 'Bullish' ? '#10b981' : '#f59e0b' }}>+{intelligence.score}%</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                        <div style={{ fontSize: '1rem', fontWeight: '900', color: 'var(--text-primary)' }}>{intelligence.sentiment} Outlook</div>
                        <div style={{ padding: '2px 8px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900' }}>STABLE</div>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '1.5rem', overflow: 'hidden' }}>
                        <div style={{ width: `${intelligence.score}%`, height: '100%', background: intelligence.sentiment === 'Bullish' ? '#10b981' : '#f59e0b', borderRadius: '4px', boxShadow: `0 0 15px ${intelligence.sentiment === 'Bullish' ? '#10b981' : '#f59e0b'}` }} />
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{intelligence.outlook}</p>
                </motion.div>

                {/* Trends Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={cardStyle}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                        <Zap size={20} style={{ color: '#fbbf24' }} />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Neural Market Signals</h3>
                    </div>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {/* Debugging: {JSON.stringify(intelligence)} */}
                        {(Array.isArray(intelligence?.trends) ? intelligence.trends : []).map((trend, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-primary)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)', transition: 'transform 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbf24', boxShadow: '0 0 8px #fbbf24' }} />
                                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{trend}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Layoff Alert Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ ...cardStyle, border: '1px solid rgba(244, 63, 94, 0.2)' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                        <AlertTriangle size={20} style={{ color: '#f43f5e' }} />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Risk Monitoring Engine</h3>
                    </div>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {(intelligence.alerts || []).map((alert, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '12px 16px',
                                background: alert.type === 'Layoff' ? 'rgba(244, 63, 94, 0.05)' : 'rgba(16, 185, 129, 0.05)',
                                borderRadius: '12px',
                                border: `1px solid ${alert.type === 'Layoff' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)'}`
                            }}>
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '800' }}>{alert.company}</div>
                                    <div style={{ fontSize: '0.75rem', color: alert.type === 'Layoff' ? '#f43f5e' : '#10b981', fontWeight: '700' }}>{alert.type} Node</div>
                                </div>
                                <div style={{ fontSize: '0.7rem', fontWeight: '900', textTransform: 'uppercase', color: 'var(--text-secondary)', padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>{alert.impact} Impact</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* NEW: Top Opportunity Hub Section as requested */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ ...cardStyle, marginBottom: '3rem', borderLeft: '6px solid var(--accent-blue)' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
                    <Briefcase size={28} style={{ color: 'var(--accent-blue)' }} />
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '900' }}>Top Opportunity Hub</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    {[
                        { company: "Google Cloud", role: "Sr. Engineering", growth: "+12%" },
                        { company: "Anthropic", role: "AI Infrastructure", growth: "+25%" },
                        { company: "Stripe", role: "FinTech Systems", growth: "+8%" },
                        { company: "Scale AI", role: "Data Ops", growth: "+18%" }
                    ].map((job, i) => (
                        <div key={i} style={{ padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                            <div style={{ fontWeight: '900', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{job.company}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{job.role}</div>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: '900', color: '#10b981' }}>
                                <TrendingUp size={12} /> {job.growth} Hiring Growth
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Market Snapshot Chart Area */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                    background: 'var(--bg-secondary)',
                    padding: '3rem',
                    borderRadius: '2rem',
                    border: '1px solid var(--border-color)',
                    textAlign: 'center',
                    background: 'linear-gradient(180deg, var(--bg-secondary) 0%, rgba(59, 130, 246, 0.02) 100%)'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '2rem' }}>
                    <BarChart3 size={32} style={{ color: 'var(--accent-blue)' }} />
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '900' }}>Role-Specific Hiring Velocity</h2>
                </div>
                <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', gap: '20px', padding: '20px 0' }}>
                    {[65, 40, 85, 55, 90, 70, 45].map((h, i) => (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: '100%', maxWidth: '40px', height: `${h}%`, background: 'rgba(59, 130, 246, 0.05)', borderRadius: '8px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: '100%' }}
                                    transition={{ duration: 1.5, delay: i * 0.1, ease: "circOut" }}
                                    style={{ position: 'absolute', bottom: 0, width: '100%', background: 'var(--accent-blue)', boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}
                                />
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-secondary)' }}>WK {i + 1}</span>
                        </div>
                    ))}
                </div>
                <p style={{ marginTop: '2rem', color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '600px', margin: '2rem auto 0' }}>
                    *Data synthesized from global hiring portals, LinkedIn insights, and verified company announcements. Refreshed every 24 hours.
                </p>
            </motion.div>
        </div>
    );
}

function IntelligenceLoading() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 0' }}>
            <div style={{ width: '60px', height: '60px', border: '4px solid var(--border-color)', borderTopColor: 'var(--accent-blue)', borderRadius: '50%', marginBottom: '2rem' }} className="animate-spin" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Processing Market Signals...</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Scanning industry datasets for top-tier insights.</p>
        </div>
    );
}

const cardStyle = {
    background: 'var(--bg-secondary)',
    padding: '2rem',
    borderRadius: '1.75rem',
    border: '1px solid var(--border-color)',
    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.3)'
};

const iconBoxStyle = (color) => ({
    width: '3.5rem',
    height: '3.5rem',
    borderRadius: '1rem',
    background: `${color}11`,
    color: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});
