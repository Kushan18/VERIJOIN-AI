"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Monitor, Moon, Sun, Lock, Eye, Bell } from "lucide-react";

export default function Settings() {
    const [theme, setTheme] = useState("light");
    const [publicProfile, setPublicProfile] = useState(false);
    const [courseAlarms, setCourseAlarms] = useState(true);

    // Initialize theme from document body
    useEffect(() => {
        if (document.body.classList.contains('dark-mode')) {
            setTheme('dark');
        }
    }, []);

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        if (newTheme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    };

    const containerStyle = {
        color: 'var(--text-primary)',
        transition: 'color 0.3s ease'
    };

    const sectionStyle = {
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        padding: '2rem',
        borderRadius: '1.5rem',
        marginBottom: '2rem',
        color: 'var(--text-primary)'
    };

    const cardStyle = {
        background: 'var(--bg-primary)',
        border: '1px solid var(--border-color)',
        padding: '1rem',
        borderRadius: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'var(--text-primary)'
    };

    return (
        <div style={containerStyle} className="container mx-auto px-8 pt-20 pb-20 max-w-2xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 style={{ color: 'var(--text-primary)', marginBottom: '2rem' }}>Settings</h1>

                {/* Appearance Section */}
                <section style={sectionStyle}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                        <Monitor className="w-5 h-5" style={{ color: 'var(--accent-blue)' }} /> Appearance
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <button
                            onClick={() => handleThemeChange('light')}
                            style={{
                                padding: '1rem',
                                borderRadius: '0.75rem',
                                border: '1px solid',
                                borderColor: theme === 'light' ? 'var(--accent-blue)' : 'var(--border-color)',
                                background: theme === 'light' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.75rem',
                                transition: 'all 0.2s ease',
                                color: 'var(--text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            <Sun className="w-8 h-8" />
                            <span style={{ fontWeight: '500' }}>Light Mode</span>
                        </button>
                        <button
                            onClick={() => handleThemeChange('dark')}
                            style={{
                                padding: '1rem',
                                borderRadius: '0.75rem',
                                border: '1px solid',
                                borderColor: theme === 'dark' ? 'var(--accent-blue)' : 'var(--border-color)',
                                background: theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.75rem',
                                transition: 'all 0.2s ease',
                                color: 'var(--text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            <Moon className="w-8 h-8" />
                            <span style={{ fontWeight: '500' }}>Dark Mode</span>
                        </button>
                    </div>
                </section>

                {/* Privacy Section */}
                <section style={sectionStyle}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                        <Lock className="w-5 h-5" style={{ color: 'var(--accent-blue)' }} /> Privacy & Data
                    </h2>

                    <div style={cardStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Eye className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                            <div>
                                <p style={{ fontWeight: '500', margin: 0, color: 'var(--text-primary)' }}>Recruiter Visibility</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Allow verified companies to see your waiting status.</p>
                            </div>
                        </div>
                        <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={publicProfile}
                                onChange={() => setPublicProfile(!publicProfile)}
                                style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                            />
                            <div style={{
                                width: '2.75rem',
                                height: '1.5rem',
                                background: publicProfile ? 'var(--accent-blue)' : '#d1d5db',
                                borderRadius: '9999px',
                                transition: 'background 0.2s ease',
                                position: 'relative'
                            }}>
                                <div style={{
                                    content: "''",
                                    position: 'absolute',
                                    top: '2px',
                                    left: publicProfile ? 'calc(100% - 22px)' : '2px',
                                    background: 'white',
                                    borderRadius: '50%',
                                    height: '20px',
                                    width: '20px',
                                    transition: 'left 0.2s ease'
                                }}></div>
                            </div>
                        </label>
                    </div>
                </section>

                {/* Notifications Section */}
                <section style={sectionStyle}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                        <Bell className="w-5 h-5" style={{ color: '#ed7d31' }} /> Notifications & Alarms
                    </h2>

                    <div style={cardStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Bell className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                            <div>
                                <p style={{ fontWeight: '500', margin: 0, color: 'var(--text-primary)' }}>Course Alarms</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Get notified when new relevant courses are recommended.</p>
                            </div>
                        </div>
                        <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={courseAlarms}
                                onChange={() => setCourseAlarms(!courseAlarms)}
                                style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                            />
                            <div style={{
                                width: '2.75rem',
                                height: '1.5rem',
                                background: courseAlarms ? '#ed7d31' : '#d1d5db',
                                borderRadius: '9999px',
                                transition: 'background 0.2s ease',
                                position: 'relative'
                            }}>
                                <div style={{
                                    content: "''",
                                    position: 'absolute',
                                    top: '2px',
                                    left: courseAlarms ? 'calc(100% - 22px)' : '2px',
                                    background: 'white',
                                    borderRadius: '50%',
                                    height: '20px',
                                    width: '20px',
                                    transition: 'left 0.2s ease'
                                }}></div>
                            </div>
                        </label>
                    </div>
                </section>

            </motion.div>
        </div>
    );
}
