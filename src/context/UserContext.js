"use client";

import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [userProfile, setUserProfile] = useState({
        name: "",
        role: "",
        experience: "Entry",
        skills: [],
        projects: [],
        goals: [],
        isOnboarded: false
    });

    // Load from localStorage if available (client-side only)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem("verijoin_user_profile");
                if (saved) {
                    const parsed = JSON.parse(saved);
                    // Simple schema validation
                    if (parsed && typeof parsed === 'object' && Array.isArray(parsed.skills)) {
                        setUserProfile(parsed);
                    } else {
                        console.warn("Invalid profile data found, resetting.");
                        localStorage.removeItem("verijoin_user_profile");
                    }
                }
            } catch (e) {
                console.error("Failed to parse user profile:", e);
                localStorage.removeItem("verijoin_user_profile");
            }
        }
        setIsLoaded(true);
    }, []);

    const updateProfile = (newData) => {
        const updated = { ...userProfile, ...newData };
        setUserProfile(updated);
        if (typeof window !== 'undefined') {
            localStorage.setItem("verijoin_user_profile", JSON.stringify(updated));
        }
    };

    const resetProfile = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem("verijoin_user_profile");
        }
        setUserProfile({
            name: "",
            role: "",
            experience: "Entry",
            skills: [],
            projects: [],
            goals: [],
            isOnboarded: false
        });
    };

    return (
        <UserContext.Provider value={{ userProfile, updateProfile, resetProfile, isLoaded }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
