"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Zap, TrendingUp, CheckCircle, ArrowRight, MousePointer2, Briefcase, GraduationCap, ShieldCheck } from "lucide-react";

export default function AboutPage() {
    const sectionTitleStyle = {
        fontSize: '2.5rem',
        fontWeight: '900',
        marginBottom: '1rem',
        textAlign: 'center',
        color: 'var(--text-primary)'
    };

    const sectionSubtitleStyle = {
        fontSize: '1.25rem',
        textAlign: 'center',
        marginBottom: '4rem',
        color: 'var(--text-secondary)'
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingBottom: '80px' }}>
            {/* Header Narrative Section */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 20px', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'rgba(59, 130, 246, 0.1)',
                        padding: '10px 24px',
                        borderRadius: '2rem',
                        color: 'var(--accent-blue)',
                        fontWeight: '800',
                        marginBottom: '2rem'
                    }}>
                        <ShieldCheck size={20} /> THE VERIJOIN INTELLIGENCE SUITE
                    </div>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '2rem' }}>Comprehensive Feature Set</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
                        VeriJoin isn't just a verification tool—it's an AI-driven career trust ecosystem. We help you navigate the high-risk "Waiting Period" between receiving an offer and your first day on the job.
                    </p>
                </motion.div>
            </section>

            {/* Platform Modules (Moved from Home) */}
            <section style={{ background: 'var(--bg-secondary)', padding: '100px 20px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h2 style={sectionTitleStyle}>Modular Intelligence</h2>
                        <p style={sectionSubtitleStyle}>Four powerful keys to your professional future.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {[
                            {
                                title: "Adaptive Onboarding",
                                desc: "Synthesizes your professional identity, skills, and goals into a persistent profile that powers the entire platform.",
                                link: "/onboarding",
                                icon: UserIcon
                            },
                            {
                                title: "AI Interview Simulator",
                                desc: "A high-stakes, realistic environment with 20-second timers to practice FAANG-tier interviews with real-time scoring.",
                                link: "/verify#interviews",
                                icon: Zap
                            },
                            {
                                title: "Market Intelligence",
                                desc: "Real-time hiring sentiment analysis, layoff monitoring, and industry demand trends for your specific role.",
                                link: "/intelligence",
                                icon: TrendingUp
                            },
                            {
                                title: "Advanced Strategy",
                                desc: "Technical gap analysis comparing your skills against market standards with automated roadmap adjustments.",
                                link: "/strategy",
                                icon: Briefcase
                            }
                        ].map((module, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.02, y: -5 }}
                                style={{
                                    background: 'var(--bg-primary)',
                                    padding: '2.5rem',
                                    borderRadius: '1.5rem',
                                    border: '1px solid var(--border-color)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                }}
                            >
                                <h4 style={{ fontSize: '1.25rem', fontWeight: '900', marginBottom: '1rem', color: '#3b82f6' }}>{module.title}</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>{module.desc}</p>
                                <Link href={module.link} style={{ marginTop: 'auto', color: 'var(--text-primary)', fontWeight: '800', textDecoration: 'none', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    EXPLORE <ArrowRight size={14} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why VeriJoin? */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 20px' }}>
                <h2 style={sectionTitleStyle}>Why VeriJoin?</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginTop: '4rem' }}>
                    {[
                        {
                            icon: Shield,
                            color: '#3b82f6',
                            title: "AI Trust Protocol",
                            desc: "Leverage advanced neural networks to validate document authenticity and detect structural anomalies instantly."
                        },
                        {
                            icon: Zap,
                            color: '#fbbf24',
                            title: "Gap Bridging",
                            desc: "Don't just wait for your joining date. Get high-end gig recommendations and micro-internships tailored to your role."
                        },
                        {
                            icon: TrendingUp,
                            color: '#10b981',
                            title: "Future Proofing",
                            desc: "Get an AI-generated skills roadmap for your first 2 years in your new company based on current market trends."
                        }
                    ].map((feature, i) => (
                        <div key={i} style={{ textAlign: 'center', padding: '2rem' }}>
                            <div style={{ width: '4rem', height: '4rem', background: feature.color, borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                                <feature.icon size={28} color="white" />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>{feature.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section style={{ background: 'var(--bg-secondary)', padding: '100px 20px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={sectionTitleStyle}>Workflow</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '4rem auto' }}>
                        {[
                            { id: "01", title: "Upload & Verify", desc: "Our AI scans your offer letter for authenticity and benchmarks the company health." },
                            { id: "02", title: "Analyze Gaps", desc: "Compare your current skills against your future employer's tech stack requirements." },
                            { id: "03", title: "Scale Up", desc: "Use the mock interview simulator and roadmap to be ready for Day 1." }
                        ].map((step, i) => (
                            <div key={i} style={{ display: 'flex', gap: '2rem', alignItems: 'center', background: 'var(--bg-primary)', padding: '2rem', borderRadius: '1.5rem', border: '1px solid var(--border-color)' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: '900', opacity: 0.2 }}>{step.id}</div>
                                <div>
                                    <h4 style={{ fontWeight: '800', fontSize: '1.25rem' }}>{step.title}</h4>
                                    <p style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

function UserIcon({ size, color }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
    );
}
