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

    // Load from localStorage if available
    useEffect(() => {
        const saved = localStorage.getItem("verijoin_user_profile");
        if (saved) {
            setUserProfile(JSON.parse(saved));
        }
        setIsLoaded(true);
    }, []);

    const updateProfile = (newData) => {
        const updated = { ...userProfile, ...newData };
        setUserProfile(updated);
        localStorage.setItem("verijoin_user_profile", JSON.stringify(updated));
    };

    const resetProfile = () => {
        localStorage.removeItem("verijoin_user_profile");
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
