"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";

export default function ChatAgent() {
    const { userProfile } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const messagesEndRef = useRef(null);

    // Initialize greeting on open or when profile changes
    useEffect(() => {
        if (messages.length === 0) {
            const userName = userProfile.name ? userProfile.name.split(" ")[0] : "there";
            setMessages([
                { id: 1, text: `Hi ${userName}! I'm your VeriJoin Career Assistant. 🚀`, sender: "bot" },
                { id: 2, text: "VeriJoin is built to help you bridge the gap between your offer and your first day. We verify your career status and recommend skills to keep you ahead.", sender: "bot" },
                { id: 3, text: "I'd love to learn more about you. What are your current career goals? (Also, have you checked out our 'Mastering AI Agents' course in the Skill Hub?)", sender: "bot" }
            ]);
        }
    }, [userProfile, messages.length]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isThinking) return;

        const userMessage = { id: Date.now(), text: input, sender: "user" };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsThinking(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: input,
                    history: messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'model', parts: [{ text: m.text }] }))
                })
            });

            const data = await response.json();

            if (data.response) {
                setMessages(prev => [...prev, { id: Date.now() + 1, text: data.response, sender: "bot" }]);
            } else {
                setMessages(prev => [...prev, { id: Date.now() + 1, text: "I'm having a bit of trouble. Could you try that again?", sender: "bot" }]);
            }
        } catch (error) {
            console.error("Chat failed:", error);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: "Wait, something went wrong. Connectivity issues!", sender: "bot" }]);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999 }}>
            {/* Chat Bubble Toggle */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: '#ed7d31', // Brand Orange
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    cursor: 'pointer',
                    boxShadow: '0 10px 25px rgba(237, 125, 49, 0.4)'
                }}
            >
                {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.5 }}
                        style={{
                            position: 'absolute',
                            bottom: '80px',
                            right: 0,
                            width: '350px',
                            height: '500px',
                            background: '#000000', // Total Black
                            border: '1px solid #333',
                            borderRadius: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '1.25rem',
                            background: '#111',
                            borderBottom: '1px solid #333',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}>
                            <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#ed7d31', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Bot size={20} color="white" />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'white' }}>VeriJoin AI</div>
                                <div style={{ fontSize: '0.7rem', color: '#10b981' }}>● Online & Ready to help</div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {messages.map((msg) => (
                                <div key={msg.id} style={{
                                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '80%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                                }}>
                                    <div style={{
                                        padding: '0.75rem 1rem',
                                        borderRadius: '1rem',
                                        background: msg.sender === 'user' ? '#ed7d31' : '#222',
                                        color: 'white',
                                        fontSize: '0.85rem',
                                        lineHeight: '1.4',
                                        border: msg.sender === 'bot' ? '1px solid #333' : 'none'
                                    }}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isThinking && (
                                <div style={{ alignSelf: 'flex-start', background: '#222', padding: '0.75rem 1rem', borderRadius: '1rem', border: '1px solid #333', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}>
                                        AI is thinking...
                                    </motion.span>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div style={{ padding: '1rem', borderTop: '1px solid #333', background: '#111' }}>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type your message..."
                                    style={{
                                        flex: 1,
                                        background: '#000',
                                        border: '1px solid #444',
                                        borderRadius: '0.75rem',
                                        padding: '0.6rem 1rem',
                                        color: 'white',
                                        fontSize: '0.85rem',
                                        outline: 'none'
                                    }}
                                />
                                <button
                                    onClick={handleSend}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '0.75rem',
                                        background: '#ed7d31',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
