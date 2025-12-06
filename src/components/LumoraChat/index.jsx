import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import { llmClient } from './LLMClient';

const LumoraChat = ({ context, embedded = false }) => {
    const [isOpen, setIsOpen] = useState(embedded); // Always open if embedded
    const [isExpanded, setIsExpanded] = useState(!embedded); // Default collapsed if embedded
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isModelLoading, setIsModelLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Mock user ID for now
    const userId = "user_123";

    useEffect(() => {
        llmClient.loadHistory(userId);
        setMessages(llmClient.history);
    }, []);

    useEffect(() => {
        // If embedded, we treat it as open.
        // We only load model if it's not loaded and we are not using fallback.
        // Load when expanded or if it was already open
        if ((isOpen || embedded) && isExpanded && !llmClient.isModelLoaded && !llmClient.useFallback && !isModelLoading) {
            setIsModelLoading(true);
            llmClient.initModel((progress) => {
                setLoadingProgress(progress);
            }).then(() => {
                setIsModelLoading(false);
            });
        }
    }, [isOpen, embedded, isExpanded, isModelLoading]);

    useEffect(() => {
        // Only scroll if we have messages and the view is expanded
        if (isExpanded && messages.length > 0) {
            scrollToBottom();
        }
    }, [messages, isTyping, isExpanded]);

    const scrollToBottom = () => {
        // Scroll the container instead of the page
        const container = document.querySelector('.lumora-messages');
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    };

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        if (!isExpanded) setIsExpanded(true);

        const userMsg = { role: 'user', content: inputValue };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        let currentBotMsg = { role: 'assistant', content: "" };
        // Add placeholder for streaming
        setMessages(prev => [...prev, currentBotMsg]);

        await llmClient.sendMessage(
            userMsg.content,
            context,
            (token) => {
                currentBotMsg.content += token;
                setMessages(prev => {
                    const newMsgs = [...prev];
                    newMsgs[newMsgs.length - 1] = { ...currentBotMsg };
                    return newMsgs;
                });
            },
            () => {
                setIsTyping(false);
                llmClient.saveHistory(userId);
            }
        );
    };

    const handleClear = () => {
        llmClient.clearHistory(userId);
        setMessages([]);
    };

    const handleDownload = () => {
        const text = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join("\n\n");
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lumora_transcript_${new Date().toISOString()}.txt`;
        a.click();
    };

    return (
        <div className={`lumora-widget ${embedded ? 'lumora-embedded' : ''} ${embedded && !isExpanded ? 'lumora-collapsed' : ''}`}>
            {!isOpen && !embedded && (
                <button className="lumora-toggle" onClick={() => setIsOpen(true)}>
                    🧙‍♂️
                </button>
            )}

            {(isOpen || embedded) && (
                <div className={`lumora-window ${(!isOpen && !embedded) ? 'closed' : ''}`}>
                    <div className="lumora-header">
                        <div className="lumora-avatar">🧙‍♂️</div>
                        <div className="lumora-header-content">
                            <h3>Doubts Panel</h3>
                            <p>Have questions? Ask here!</p>
                        </div>
                        <div className="lumora-controls">
                            <button onClick={handleClear} title="Clear History">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </button>
                            <button onClick={handleDownload} title="Download Transcript">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            </button>
                            {!embedded && <button onClick={() => setIsOpen(false)} title="Close">✕</button>}
                            {embedded && isExpanded && <button onClick={() => setIsExpanded(false)} title="Minimize">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>}
                        </div>
                    </div>

                    {/* Only show messages/progress if expanded or not embedded (normal mode) */}
                    {(isExpanded || !embedded) && (
                        <>
                            {isModelLoading ? (
                                <div className="lumora-progress">
                                    <p>Summoning the Wizard... {Math.round(loadingProgress)}%</p>
                                    <div className="lumora-progress-bar">
                                        <div
                                            className="lumora-progress-fill"
                                            style={{ width: `${loadingProgress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="lumora-messages">
                                    {messages.length === 0 && (
                                        <div style={{ textAlign: 'center', color: 'var(--lumora-text-secondary)', marginTop: '40px' }}>
                                            <p>👋 Hi! I'm Lumora.</p>
                                            <p>Ask me anything about your course!</p>
                                        </div>
                                    )}
                                    {messages.map((msg, idx) => (
                                        <div key={idx} className={`lumora-message ${msg.role === 'assistant' ? 'bot' : 'user'}`}>
                                            {msg.content}
                                        </div>
                                    ))}
                                    {isTyping && (
                                        <div className="lumora-message bot typing-indicator">
                                            <span></span><span></span><span></span>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            )}
                        </>
                    )}

                    <div className="lumora-input-area">
                        <div className="lumora-input-wrapper">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onFocus={() => {
                                    if (embedded) setIsExpanded(true);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSend();
                                    }
                                }}
                                placeholder="Type your question..."
                            />
                        </div>
                        <button
                            className="lumora-send-btn"
                            onClick={handleSend}
                            disabled={isTyping || !inputValue.trim()}
                        >
                            Ask
                        </button>
                    </div>

                    {(isExpanded || !embedded) && (
                        <div className="lumora-footer">
                            Runs locally in your browser.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LumoraChat;
