"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Zap, TrendingUp, CheckCircle, ArrowRight, MousePointer2, Briefcase, GraduationCap, Globe, Users, Award } from "lucide-react";
import SkillDevelopment from "@/components/SkillDevelopment";

export default function Home() {
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
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            {/* Hero Section */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 20px', textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div style={{
                        display: 'inline-block',
                        marginBottom: '1.5rem',
                        padding: '6px 20px',
                        background: 'rgba(59, 130, 246, 0.1)',
                        borderRadius: '9999px',
                        border: '1px solid rgba(59, 130, 246, 0.2)'
                    }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#3b82f6' }}>AI-Powered Professional Verification</span>
                    </div>

                    <h1 style={{ fontSize: '4.5rem', fontWeight: '900', lineHeight: 1.1, marginBottom: '2rem', letterSpacing: '-0.03em' }}>
                        Bridge the Gap
                        <br />
                        <span style={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>From Offer to Day 1</span>
                    </h1>

                    <p style={{ fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        The transition period between an offer and your start date is high-risk. <strong>VeriJoin</strong> provides the intelligence you need to monitor company health, bridge skill gaps, and prepare for Day 1 with confidence.
                    </p>

                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/verify" style={{
                            padding: '18px 40px',
                            background: '#3b82f6',
                            color: 'white',
                            borderRadius: '12px',
                            fontWeight: '800',
                            textDecoration: 'none',
                            boxShadow: '0 10px 20px rgba(59, 130, 246, 0.2)',
                            fontSize: '1.1rem'
                        }}>
                            Verify Offer <ArrowRight size={20} style={{ verticalAlign: 'middle', marginLeft: '8px' }} />
                        </Link>
                        <Link href="/about" style={{
                            padding: '18px 40px',
                            background: '#10b981',
                            color: 'white',
                            borderRadius: '12px',
                            fontWeight: '800',
                            textDecoration: 'none',
                            boxShadow: '0 10px 20px rgba(16, 185, 129, 0.2)',
                            transition: 'all 0.3s ease',
                            fontSize: '1.1rem'
                        }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            Learn More
                        </Link>
                    </div>

                    {/* Simple Stats Display */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '5rem',
                        marginTop: '6rem',
                        flexWrap: 'wrap',
                        opacity: 0.8
                    }}>
                        {[
                            { value: "98%", label: "Accuracy" },
                            { value: "<3s", label: "Latency" },
                            { value: "50k+", label: "Data Points" }
                        ].map((stat, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{
                                    fontSize: '2rem',
                                    fontWeight: '900',
                                    color: 'var(--text-primary)'
                                }}>{stat.value}</div>
                                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Why VeriJoin? Section - RESTORED & ENHANCED */}
            <section id="features" style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 20px' }}>
                <h2 style={sectionTitleStyle}>Why VeriJoin?</h2>
                <p style={sectionSubtitleStyle}>The next-generation career trust platform for the AI-era workforce.</p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {[
                        {
                            icon: Shield,
                            color: '#3b82f6',
                            title: "AI Trust Protocol",
                            desc: "Leverage advanced neural networks to validate document authenticity and detect structural anomalies instantly."
                        },
                        {
                            icon: Award,
                            color: '#fbbf24',
                            title: "Industry Credentialing",
                            desc: "Don't just wait for your joining date. Get high-end gig recommendations and micro-internships tailored to your role."
                        },
                        {
                            icon: TrendingUp,
                            color: '#10b981',
                            title: "Growth Accelaration",
                            desc: "Get an AI-generated skills roadmap for your first 2 years in your new company based on current market trends."
                        }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            style={{
                                background: 'var(--bg-secondary)',
                                padding: '3rem 2rem',
                                borderRadius: '2rem',
                                border: '1px solid var(--border-color)',
                                textAlign: 'center',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{
                                width: '4rem',
                                height: '4rem',
                                borderRadius: '1rem',
                                margin: '0 auto 2rem',
                                background: feature.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: `0 10px 20px ${feature.color}33`
                            }}>
                                <feature.icon size={28} style={{ color: 'white' }} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>{feature.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Courses Section - INTEGRATED */}
            <SkillDevelopment />

            {/* Global Market Pulse - NEW STUFF */}
            <section style={{ background: 'var(--bg-secondary)', padding: '100px 20px', borderY: '1px solid var(--border-color)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <div style={{ color: '#ed7d31', fontWeight: '900', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Global Market Pulse</div>
                            <h2 style={{ fontSize: '3rem', fontWeight: '900', lineHeight: 1.1, marginBottom: '2rem' }}>Scaling with the Speed of Innovation.</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                                We monitor over 500+ global enterprises and 10k+ hiring signals daily to ensure your career transition is backed by the most current data.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-primary)' }}>12.4k</div>
                                    <div style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Active Candidates</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-primary)' }}>4.8/5</div>
                                    <div style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Success Rating</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                                padding: '3rem',
                                borderRadius: '2.5rem',
                                border: '1px solid #334155',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
                                    <Globe style={{ color: '#3b82f6' }} size={32} />
                                    <div style={{ fontSize: '1.25rem', fontWeight: '800' }}>Live Network Activity</div>
                                </div>
                                <div style={{ display: 'grid', gap: '1.5rem' }}>
                                    {[
                                        { user: "Frontend Eng.", company: "Google", status: "Verified" },
                                        { user: "Product Manager", company: "Meta", status: "Benchmarked" },
                                        { user: "Data Scientist", company: "Amazon", status: "Strategy Set" }
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <Users size={16} color="#94a3b8" />
                                                <span style={{ fontWeight: '700' }}>{item.user}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{item.company}</span>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Simple Footer */}
            <footer style={{ padding: '60px 20px', textAlign: 'center', borderTop: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
                <p style={{ color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '1px' }}>
                    VERIJOIN CAREER TRUST
                </p>
                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Protecting professional futures in the AI era. © 2026
                </div>
            </footer>
        </div>
    );
}

// Simple Icon fallback since BrainCircuit was used in item list
function BrainCircuit({ size, style }) {
    return <Zap size={size} style={style} />;
}
