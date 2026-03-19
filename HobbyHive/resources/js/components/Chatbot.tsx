import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hi! I'm your HobbyHive assistant. Ask me about our products, shipping, or anything else!" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');

        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);

        try {
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();

            if (data.reply) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
            } else {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: 'Sorry, I encountered an error. Please try again or contact support@hobbyhive.com'
                }]);
            }
        } catch (error) {
            console.error('Chatbot error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, I could not process your request. Please check your connection.'
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 bg-[#FFC300] text-[#2C2C2C] p-4 rounded-full shadow-2xl hover:bg-yellow-400 hover:scale-110 transition-all duration-200 z-50"
                    aria-label="Open chat"
                >
                    <MessageCircle className="w-7 h-7" />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">

                    {/* Header */}
                    <div className="bg-[#FFC300] text-[#2C2C2C] p-5 rounded-t-2xl flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white/40 p-2 rounded-full">
                                <MessageCircle className="w-5 h-5 text-[#2C2C2C]" />
                            </div>
                            <div>
                                <h3 className="font-slab font-bold text-lg text-[#2C2C2C]">HobbyHive Assistant</h3>
                                <p className="text-xs text-[#2C2C2C]/70">Powered by Claude AI</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-black/10 p-2 rounded-full transition"
                            aria-label="Close chat"
                        >
                            <X className="w-5 h-5 text-[#2C2C2C]" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fff8dc]">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] p-3 rounded-2xl shadow-sm text-sm whitespace-pre-wrap leading-relaxed ${
                                        message.role === 'user'
                                            ? 'bg-[#FFC300] text-[#2C2C2C] rounded-br-sm font-slab'
                                            : 'bg-white text-[#2C2C2C] border border-gray-200 rounded-bl-sm'
                                    }`}
                                >
                                    <ReactMarkdown>{message.content}</ReactMarkdown>
                                </div>
                            </div>
                        ))}

                        {/* Loading */}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-bl-sm shadow-sm flex items-center space-x-2">
                                    <Loader2 className="w-4 h-4 animate-spin text-[#FFC300]" />
                                    <span className="text-sm text-[#2C2C2C]">Thinking...</span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                        <div className="flex items-end space-x-2">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask about products, shipping, etc..."
                                disabled={loading}
                                rows={1}
                                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFC300] focus:border-transparent disabled:bg-gray-100 resize-none text-sm text-[#2C2C2C]"
                                style={{ minHeight: '48px', maxHeight: '120px' }}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={loading || !input.trim()}
                                className="bg-[#FFC300] text-[#2C2C2C] p-3 rounded-xl hover:bg-yellow-400 disabled:bg-gray-200 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                                aria-label="Send message"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-center">Press Enter to send</p>
                    </div>
                </div>
            )}
        </>
    );
}