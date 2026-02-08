"use client";

import Link from 'next/link';
import { ShieldCheck, LayoutDashboard, LineChart, Target, History, Settings as SettingsIcon, Sparkles, User as UserIcon } from 'lucide-react';
import { useUser } from "@/context/UserContext";

export default function Navbar() {
    const { userProfile, isLoaded } = useUser();

    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                width: '100%',
                height: '80px',
                background: '#ed7d31', // Vibrant Orange
                boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 40px' // Generous side padding
            }}
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between', // Pushes brand left, others right
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>

                {/* Brand Logo & Name Group - LEFT SIDE */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexShrink: 0 }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '8px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <ShieldCheck size={28} style={{ color: '#ed7d31' }} />
                    </div>
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <span style={{
                            fontSize: '24px',
                            fontWeight: '900',
                            color: 'white',
                            letterSpacing: '1px',
                            textTransform: 'uppercase'
                        }}>
                            VeriJoin
                        </span>
                    </Link>
                </div>

                {/* Navigation Links Group - RIGHT SIDE */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>

                    <NavLink href="/verify" icon={<LayoutDashboard size={18} />} label="Dash" />
                    <NavLink href="/intelligence" icon={<LineChart size={18} />} label="Market" />
                    <NavLink href="/strategy" icon={<Target size={18} />} label="Strategy" />
                    <NavLink href="/history" icon={<History size={18} />} label="Vault" />
                    <NavLink href="/settings" icon={<SettingsIcon size={18} />} label="Account" />

                    {/* Action Button - Dynamic based on Onboarding & Hydration */}
                    {isLoaded ? (
                        !userProfile.isOnboarded ? (
                            <Link href="/onboarding" style={{ textDecoration: 'none' }}>
                                <button
                                    style={{
                                        backgroundColor: 'white',
                                        color: '#ed7d31',
                                        border: 'none',
                                        padding: '12px 24px',
                                        borderRadius: '8px',
                                        fontWeight: '900',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        fontSize: '14px',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                        textTransform: 'uppercase',
                                        transition: 'transform 0.2s ease'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <Sparkles size={18} /> Get Started
                                </button>
                            </Link>
                        ) : (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: 'rgba(255, 255, 255, 0.2)',
                                padding: '8px 16px',
                                borderRadius: '12px',
                                color: 'white',
                                fontWeight: '800',
                                fontSize: '0.9rem',
                                border: '1px solid rgba(255, 255, 255, 0.3)'
                            }}>
                                <UserIcon size={16} /> PROFILE
                            </div>
                        )
                    ) : (
                        <div style={{ width: '130px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} /> // Loading Placeholder
                    )}
                </div>

            </div>
        </nav>
    );
}

// Sub-component for clean links
function NavLink({ href, icon, label }) {
    return (
        <Link href={href} style={{
            textDecoration: 'none',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '700',
            opacity: 0.9,
            transition: 'opacity 0.2s ease'
        }}
            onMouseOver={(e) => e.currentTarget.style.opacity = 1}
            onMouseOut={(e) => e.currentTarget.style.opacity = 0.9}
        >
            {icon}
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
        </Link>
    );
}
