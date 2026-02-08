"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { User, Code, Target, ArrowRight, ArrowLeft, CheckCircle, Sparkles } from "lucide-react";

export default function Onboarding() {
    const { updateProfile } = useUser();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        experience: "Entry",
        skills: [],
        goals: []
    });

    const steps = [
        { id: 1, title: "Identity", icon: User },
        { id: 2, title: "Expertise", icon: Code },
        { id: 3, title: "Ambition", icon: Target }
    ];

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleComplete = () => {
        updateProfile({ ...formData, isOnboarded: true });
        router.push("/verify"); // Redirect to verify page after onboarding
    };

    const containerVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
            {/* Progress Header */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '4rem' }}>
                {steps.map((s) => (
                    <div key={s.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: step >= s.id ? 1 : 0.3 }}>
                        <div style={{
                            width: '3rem',
                            height: '3rem',
                            borderRadius: '1rem',
                            background: step >= s.id ? '#ed7d31' : 'var(--bg-secondary)',
                            color: step >= s.id ? 'white' : 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: `1px solid ${step >= s.id ? '#ed7d31' : 'var(--border-color)'}`,
                            boxShadow: step >= s.id ? '0 10px 20px rgba(237, 125, 49, 0.2)' : 'none',
                            transition: 'all 0.3s ease'
                        }}>
                            <s.icon size={20} />
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.title}</span>
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div key="step1" variants={containerVariants} initial="hidden" animate="visible" exit="exit" style={stepStyle}>
                        <h2 style={titleStyle}>Tell us about yourself</h2>
                        <p style={subtitleStyle}>Your identity drives your personalized career roadmap.</p>

                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Full Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Alex Rivera"
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Preferred Role</label>
                            <input
                                type="text"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                placeholder="e.g. Software Engineer"
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Experience Level</label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                                {['Entry', 'Mid', 'Senior'].map(lvl => (
                                    <button
                                        key={lvl}
                                        onClick={() => setFormData({ ...formData, experience: lvl })}
                                        style={{
                                            ...toggleButtonStyle,
                                            background: formData.experience === lvl ? 'var(--accent-blue)' : 'var(--bg-primary)',
                                            color: formData.experience === lvl ? 'white' : 'var(--text-primary)',
                                            borderColor: formData.experience === lvl ? 'var(--accent-blue)' : 'var(--border-color)'
                                        }}
                                    >
                                        {lvl}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button onClick={nextStep} disabled={!formData.name || !formData.role} style={primaryButtonStyle}>
                            CONTINUE <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div key="step2" variants={containerVariants} initial="hidden" animate="visible" exit="exit" style={stepStyle}>
                        <h2 style={titleStyle}>What are your superpowers?</h2>
                        <p style={subtitleStyle}>Select the skills you want to refine during your wait time.</p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '3rem' }}>
                            {['React', 'Node.js', 'Python', 'Java', 'Django', 'AWS', 'Docker', 'AI Agents', 'SQL'].map(skill => (
                                <button
                                    key={skill}
                                    onClick={() => {
                                        const skills = formData.skills.includes(skill)
                                            ? formData.skills.filter(s => s !== skill)
                                            : [...formData.skills, skill];
                                        setFormData({ ...formData, skills });
                                    }}
                                    style={{
                                        ...tagStyle,
                                        background: formData.skills.includes(skill) ? 'rgba(237, 125, 49, 0.1)' : 'var(--bg-primary)',
                                        borderColor: formData.skills.includes(skill) ? '#ed7d31' : 'var(--border-color)',
                                        color: formData.skills.includes(skill) ? '#ed7d31' : 'var(--text-primary)'
                                    }}
                                >
                                    {skill} {formData.skills.includes(skill) && <CheckCircle size={14} />}
                                </button>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button onClick={prevStep} style={secondaryButtonStyle}><ArrowLeft size={20} /> BACK</button>
                            <button onClick={nextStep} disabled={formData.skills.length === 0} style={primaryButtonStyle}>
                                CONTINUE <ArrowRight size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div key="step3" variants={containerVariants} initial="hidden" animate="visible" exit="exit" style={stepStyle}>
                        <h2 style={titleStyle}>What is your primary goal?</h2>
                        <p style={subtitleStyle}>We'll prioritize your roadmap based on your selection.</p>

                        <div style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }}>
                            {[
                                { id: 'upskill', label: 'Upskill for the role', desc: 'Focus on technical courses and certifications.' },
                                { id: 'interview', label: 'Ace the final interview', desc: 'Prioritize AI Mock Interviews and behavioral prep.' },
                                { id: 'network', label: 'Network & Market Research', desc: 'Focus on intelligence hub and company insights.' }
                            ].map(goal => (
                                <button
                                    key={goal.id}
                                    onClick={() => {
                                        const goals = formData.goals.includes(goal.id)
                                            ? formData.goals.filter(g => g !== goal.id)
                                            : [...formData.goals, goal.id];
                                        setFormData({ ...formData, goals });
                                    }}
                                    style={{
                                        ...optionCardStyle,
                                        borderColor: formData.goals.includes(goal.id) ? 'var(--accent-blue)' : 'var(--border-color)',
                                        background: formData.goals.includes(goal.id) ? 'rgba(59, 130, 246, 0.05)' : 'var(--bg-primary)'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ textAlign: 'left' }}>
                                            <div style={{ fontWeight: '800', marginBottom: '0.25rem' }}>{goal.label}</div>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{goal.desc}</div>
                                        </div>
                                        {formData.goals.includes(goal.id) && <CheckCircle size={24} style={{ color: 'var(--accent-blue)' }} />}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button onClick={prevStep} style={secondaryButtonStyle}><ArrowLeft size={20} /> BACK</button>
                            <button onClick={handleComplete} disabled={formData.goals.length === 0} style={{ ...primaryButtonStyle, background: '#10b981' }}>
                                COMPLETE SETUP <Sparkles size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const stepStyle = {
    background: 'var(--bg-secondary)',
    padding: '3rem',
    borderRadius: '2.5rem',
    border: '1px solid var(--border-color)',
    boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.4)',
    textAlign: 'center'
};

const titleStyle = {
    fontSize: '2.25rem',
    fontWeight: '900',
    marginBottom: '1rem',
    letterSpacing: '-0.02em'
};

const subtitleStyle = {
    color: 'var(--text-secondary)',
    fontSize: '1.1rem',
    marginBottom: '3rem'
};

const inputGroupStyle = {
    textAlign: 'left',
    marginBottom: '2rem'
};

const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '800',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '0.75rem'
};

const inputStyle = {
    width: '100%',
    padding: '1.25rem',
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: '1rem',
    color: 'var(--text-primary)',
    fontSize: '1.1rem',
    outline: 'none',
    transition: 'border-color 0.2s ease'
};

const toggleButtonStyle = {
    padding: '1rem',
    borderRadius: '0.75rem',
    border: '1px solid',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
};

const tagStyle = {
    padding: '0.75rem 1.5rem',
    borderRadius: '1rem',
    border: '1px solid',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s ease'
};

const optionCardStyle = {
    width: '100%',
    padding: '1.5rem',
    borderRadius: '1.25rem',
    border: '1px solid',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: 'var(--text-primary)'
};

const primaryButtonStyle = {
    width: '100%',
    padding: '1.25rem',
    background: '#ed7d31',
    color: 'white',
    borderRadius: '1rem',
    fontWeight: '900',
    fontSize: '1.1rem',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    boxShadow: '0 10px 20px rgba(237, 125, 49, 0.2)',
    transition: 'transform 0.2s ease'
};

const secondaryButtonStyle = {
    padding: '1.25rem 2.5rem',
    background: 'transparent',
    color: 'var(--text-primary)',
    borderRadius: '1rem',
    fontWeight: '800',
    border: '1px solid var(--border-color)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
};
