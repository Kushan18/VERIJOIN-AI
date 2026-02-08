"use client";

import { useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FileUploader({ onFileSelect, title = "Upload Your Offer Letter", description = "Supports PDF and Images", id = "file-upload" }) {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && (file.type === "application/pdf" || file.type.startsWith("image/"))) {
            setSelectedFile(file);
            onFileSelect(file);
        }
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            onFileSelect(file);
        }
    };

    const clearFile = () => {
        setSelectedFile(null);
    };

    return (
        <div style={{ maxWidth: '42rem', margin: '0 auto' }}>
            <AnimatePresence mode="wait">
                {!selectedFile ? (
                    <motion.div
                        key="uploader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        style={{
                            background: 'var(--bg-secondary)',
                            padding: '3rem',
                            borderRadius: '1.5rem',
                            border: '2px dashed',
                            borderColor: isDragging ? 'var(--accent-blue)' : 'var(--border-color)',
                            backgroundColor: isDragging ? 'rgba(59, 130, 246, 0.05)' : 'var(--bg-secondary)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }}
                    >
                        <input
                            type="file"
                            accept=".pdf,image/*"
                            onChange={handleFileInput}
                            style={{ display: 'none' }}
                            id={id}
                        />
                        <label htmlFor={id} style={{ cursor: 'pointer', display: 'block', textAlign: 'center' }}>
                            <div style={{
                                width: '4rem',
                                height: '4rem',
                                margin: '0 auto 1.5rem',
                                borderRadius: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'var(--accent-blue)'
                            }}>
                                <Upload size={32} style={{ color: 'white' }} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                                {isDragging ? "Drop it here" : title}
                            </h3>
                            <p style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                                Drag and drop or click to browse
                            </p>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                {description}
                            </p>
                        </label>
                    </motion.div>
                ) : (
                    <motion.div
                        key="selected"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            background: 'var(--bg-secondary)',
                            padding: '1.5rem',
                            borderRadius: '1rem',
                            border: '1px solid var(--border-color)'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                                <div style={{
                                    width: '3rem',
                                    height: '3rem',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'var(--accent-blue)'
                                }}>
                                    <FileText size={24} style={{ color: 'white' }} />
                                </div>
                                <div style={{ overflow: 'hidden' }}>
                                    <p style={{ fontWeight: '800', margin: 0, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                        {selectedFile.name}
                                    </p>
                                    <p style={{ fontSize: '0.875rem', margin: 0, color: 'var(--text-secondary)' }}>
                                        {(selectedFile.size / 1024).toFixed(2)} KB
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={clearFile}
                                style={{
                                    width: '2.5rem',
                                    height: '2.5rem',
                                    borderRadius: '0.5rem',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                    color: '#ef4444',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s',
                                    marginLeft: '1rem',
                                    flexShrink: 0
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
