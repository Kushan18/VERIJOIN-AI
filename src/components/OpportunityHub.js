"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Zap, TrendingUp, Clock, DollarSign } from "lucide-react";

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
                        Opportunity Hub
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>Turn your waiting time into assets.</p>
                </div>

                <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.05)', padding: '4px', borderRadius: '0.75rem' }}>
                    {["gigs", "internships", "future"].map((tab) => (
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
                    ) : (
                        <OpportunitiesList type={activeTab} items={data.recommendations[activeTab]} variants={item} />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

function FutureInsightView({ market }) {
    if (!market) return <p style={{ color: 'var(--text-secondary)' }}>No market data available.</p>;

    const cardStyle = {
        padding: '1.5rem',
        borderRadius: '1rem',
        background: 'rgba(59, 130, 246, 0.05)',
        border: '1px solid var(--border-color)'
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <TrendingUp size={32} style={{ color: '#a78bfa' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0 }}>2027 Outlook</h3>
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '0.5rem', background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {market.trend}
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {market.insight}
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem', margin: 0 }}>Recommended Skills to Acquire</h4>
                {market.futureSkills?.map((skill, idx) => (
                    <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border-color)'
                    }}>
                        <span style={{ fontWeight: '600' }}>{skill}</span>
                        <span style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa' }}>High Demand</span>
                    </div>
                ))}
            </div>
        </div>
    );
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
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>{opp.company}</p>
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
