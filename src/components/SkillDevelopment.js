"use client";

import { motion } from "framer-motion";
import { BookOpen, Code2, Globe, Database, Cpu, ArrowRight, Star } from "lucide-react";
import { useUser } from "@/context/UserContext";

const COURSES = [
    {
        title: "Mastering C Programming",
        category: "Low-Level",
        icon: Cpu,
        color: "#94a3b8",
        duration: "6 Weeks",
        level: "Beginner"
    },
    {
        title: "Enterprise Java Development",
        category: "Backend",
        icon: Database,
        color: "#f59e0b",
        duration: "10 Weeks",
        level: "Intermediate"
    },
    {
        title: "Full-Stack Django & Python",
        category: "Web",
        icon: Globe,
        color: "#059669",
        duration: "8 Weeks",
        level: "Intermediate"
    },
    {
        title: "Modern React & Next.js",
        category: "Frontend",
        icon: Code2,
        color: "#3b82f6",
        duration: "12 Weeks",
        level: "Advanced"
    }
];

export default function SkillDevelopment() {
    const { userProfile } = useUser();

    // Logic to check if course is relevant to user skills
    const isRecommended = (course) => {
        if (!userProfile.isOnboarded) return false;
        const skillKeywords = {
            "Frontend": ["React", "JavaScript", "HTML", "CSS"],
            "Backend": ["Node.js", "Java", "Node", "Python"],
            "Web": ["Django", "Python", "Web", "Next.js"],
            "Low-Level": ["C", "C++", "Hardware", "Python"]
        };
        const keywords = skillKeywords[course.category] || [];
        return userProfile.skills.some(skill => keywords.includes(skill));
    };
    return (
        <section id="courses" style={{ padding: '100px 20px', background: 'var(--bg-primary)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        Skill Development Hub
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem' }}>
                        Premium learning paths to bridge your career gap
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {COURSES.map((course, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            style={{
                                background: 'var(--bg-secondary)',
                                border: isRecommended(course) ? '2px solid #ed7d31' : '1px solid var(--border-color)',
                                borderRadius: '1.5rem',
                                padding: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                boxShadow: isRecommended(course) ? '0 10px 30px rgba(237, 125, 49, 0.15)' : 'none'
                            }}
                        >
                            {isRecommended(course) && (
                                <div style={{
                                    position: 'absolute',
                                    top: '-12px',
                                    right: '20px',
                                    background: '#ed7d31',
                                    color: 'white',
                                    padding: '4px 12px',
                                    borderRadius: '2rem',
                                    fontSize: '0.7rem',
                                    fontWeight: '900',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    boxShadow: '0 4px 10px rgba(237, 125, 49, 0.3)'
                                }}>
                                    <Star size={10} fill="white" /> RECOMMENDED
                                </div>
                            )}
                            <div style={{
                                width: '3.5rem',
                                height: '3.5rem',
                                borderRadius: '1rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem'
                            }}>
                                <course.icon size={28} style={{ color: course.color }} />
                            </div>

                            <div style={{
                                fontSize: '0.75rem',
                                fontWeight: '900',
                                color: course.color,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                marginBottom: '0.5rem'
                            }}>
                                {course.category}
                            </div>

                            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                {course.title}
                            </h3>

                            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                    {course.duration} • {course.level}
                                </div>
                                <button style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--accent-blue)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    fontWeight: '700'
                                }}>
                                    ENROLL <ArrowRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <button style={{
                        padding: '12px 30px',
                        background: 'rgba(59, 130, 246, 0.1)',
                        border: '1px solid var(--accent-blue)',
                        color: 'var(--accent-blue)',
                        borderRadius: '10px',
                        fontWeight: '800',
                        cursor: 'pointer'
                    }}>
                        EXPLORE ALL 50+ COURSES
                    </button>
                </div>
            </div>
        </section>
    );
}
