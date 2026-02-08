"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Shield, Zap, TrendingUp, CheckCircle, ArrowRight, Brain,
    Briefcase, GraduationCap, ShieldCheck, Heart, Cpu, Target,
    Rocket, Lightbulb, GitBranch
} from "lucide-react";

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

    const cardStyle = {
        background: 'var(--bg-secondary)',
        padding: '2.5rem',
        borderRadius: '1.5rem',
        border: '1px solid var(--border-color)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingBottom: '100px' }}>
            {/* Hero Narrative Section */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 20px 80px', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
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
                        marginBottom: '2.5rem'
                    }}>
                        <Brain size={20} /> THE VERIJOIN STORY
                    </div>
                    <h1 style={{ fontSize: '4.5rem', fontWeight: '900', marginBottom: '2rem', letterSpacing: '-0.04em' }}>
                        Bridging the <span style={{ color: 'var(--accent-blue)' }}>Gap</span>
                    </h1>
                    <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', maxWidth: '900px', margin: '0 auto', lineHeight: 1.6 }}>
                        VeriJoin is an AI-powered career trust platform that verifies offer letters and actively guides users while verification is in progress.
                    </p>
                </motion.div>
            </section>

            {/* Inspiration Section */}
            <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: '#f472b6' }}>
                            <Heart size={24} />
                            <span style={{ fontWeight: '800', fontSize: '1.1rem', letterSpacing: '0.1em' }}>INSPIRATION</span>
                        </div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: 1.2 }}>Helping people during moments of <span style={{ color: '#f472b6' }}>uncertainty</span>.</h2>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Students and early-career professionals increasingly receive job and internship offers online, but many face uncertainty: fake offer letters, delayed verification, and financial pressure.
                            </p>
                            <p>
                                We noticed that most platforms either verify documents or list jobs, but none support users during the waiting period. VeriJoin was inspired by the idea that AI should actively help people when anxiety and risk are highest.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        style={{ background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)', borderRadius: '2rem', padding: '3rem', border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            {[
                                { icon: Shield, label: "Trust First" },
                                { icon: Rocket, label: "Career Gaps" },
                                { icon: Target, label: "Skill Focus" },
                                { icon: Zap, label: "Instant Value" }
                            ].map((item, idx) => (
                                <div key={idx} style={{ textAlign: 'center' }}>
                                    <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                                        <item.icon size={24} color="#f472b6" />
                                    </div>
                                    <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* How We Built It Section */}
            <section style={{ background: 'var(--bg-secondary)', padding: '100px 20px', margin: '80px 0' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent-blue)' }}>
                            <Cpu size={24} />
                            <span style={{ fontWeight: '800', fontSize: '1.1rem', letterSpacing: '0.1em' }}>ARCHITECTURE</span>
                        </div>
                        <h2 style={sectionTitleStyle}>Powered by Gemini 3</h2>
                        <p style={{ ...sectionSubtitleStyle, maxWidth: '800px', margin: '0 auto 4rem' }}>
                            An agent-driven workflow orchestration that makes AI central to decision-making, not just content generation.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {[
                            {
                                title: "Multimodal Analysis",
                                desc: "Gemini 3 API analyzes offer letters for structural and meta-data authenticity while detecting hiring risks.",
                                icon: Brain
                            },
                            {
                                title: "Workflow Orchestration",
                                desc: "Python (FastAPI) backend handles complex logic, adapting guidance based on roles, skills, and waiting time.",
                                icon: GitBranch
                            },
                            {
                                title: "Adaptive Recommender",
                                desc: "Dynamically identifies verification delays to recommend courses, interview paths, and trusted part-time jobs.",
                                icon: Lightbulb
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                style={cardStyle}
                            >
                                <div style={{ width: '48px', height: '48px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                    <item.icon size={24} color="var(--accent-blue)" />
                                </div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Challenges & Accomplishments Card Grid */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2.5rem' }}>
                    <div style={{ ...cardStyle, background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.1)' }}>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#ef4444' }}>
                            <Shield size={24} /> Challenges
                        </h3>
                        <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
                            <li>Designing a single flow combining verification, learning, and job discovery.</li>
                            <li>Ensuring recommendations felt relevant and contextual to the user's career path.</li>
                            <li>Avoiding feature overload while showcasing real-world usefulness.</li>
                            <li>Maintaining public accessibility while feeling enterprise-professional.</li>
                        </ul>
                    </div>
                    <div style={{ ...cardStyle, background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.1)' }}>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#10b981' }}>
                            <CheckCircle size={24} /> Accomplishments
                        </h3>
                        <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
                            <li>Built a system that supports users *during* verification delays, not just after.</li>
                            <li>Integrated learning, earning (gigs), and prep into a single agentic flow.</li>
                            <li>Designed VeriJoin to feel empathetic, practical, and career-focused.</li>
                            <li>Executed a high-end Next.js 15 & FastAPI architecture in record time.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Future Section */}
            <section style={{ maxWidth: '1000px', margin: '100px auto 0', padding: '80px 40px', background: 'var(--bg-secondary)', borderRadius: '3rem', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <div style={{ color: 'var(--accent-blue)', fontWeight: '800', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>WHAT'S NEXT</div>
                <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '3rem' }}>The Future of <span style={{ color: 'var(--accent-blue)' }}>Trust</span></h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                    {[
                        "Real-time Gig APIs", "University Partnerships",
                        "Gemini Voice Coaching", "Full Dashboard Evolution",
                        "Placement Cell Integration"
                    ].map((item, idx) => (
                        <div key={idx} style={{ padding: '12px 24px', background: 'var(--bg-primary)', borderRadius: '1rem', border: '1px solid var(--border-color)', fontWeight: '700', fontSize: '0.9rem' }}>
                            {item}
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: '4rem' }}>
                    <Link href="/verify">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ padding: '16px 40px', background: 'var(--accent-blue)', color: 'white', borderRadius: '1rem', border: 'none', fontWeight: '800', cursor: 'pointer', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                        >
                            START VERIFYING <ArrowRight size={20} />
                        </motion.button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
