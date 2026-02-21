'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, User as UserIcon, Bot, Info, Mic, MicOff, Globe, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface ChatViewProps {
    userId: string;
    userName?: string | null;
    userImage?: string | null;
}

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    createdAt: Date;
}

// Add types for Web Speech API
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

export default function ChatView({ userId, userName, userImage }: ChatViewProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: "Hello! I'm your AI Todo Assistant. I can help you manage your tasks.",
            createdAt: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [recognitionLang, setRecognitionLang] = useState('en-US');
    const scrollRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);
    const isListeningRef = useRef(false);

    // Function to initialize and attach handlers
    const setupRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return null;

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = recognitionLang;

        recognition.onstart = () => {
            setIsListening(true);
            isListeningRef.current = true;
        };

        recognition.onresult = (event: any) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }

            if (finalTranscript) {
                setInputValue(prev => {
                    const separator = prev && !prev.endsWith(' ') ? ' ' : '';
                    return prev + separator + finalTranscript;
                });
            }
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            // Don't stop state on simple timeouts if we want continuous
            if (event.error !== 'no-speech' && event.error !== 'aborted') {
                setIsListening(false);
                isListeningRef.current = false;
                if (event.error === 'not-allowed') {
                    toast.error('Microphone access denied. Please enable it in settings.');
                }
            }
        };

        recognition.onend = () => {
            // Keep listening if intentionally active
            if (isListeningRef.current) {
                try {
                    recognitionRef.current.start();
                } catch (e) {
                    console.error("Failed to restart recognition:", e);
                    setIsListening(false);
                    isListeningRef.current = false;
                }
            } else {
                setIsListening(false);
            }
        };

        return recognition;
    };

    // Initialize Speech Recognition
    useEffect(() => {
        const recognition = setupRecognition();
        if (recognition) {
            recognitionRef.current = recognition;
        }
    }, []);

    // Update language when state changes
    useEffect(() => {
        if (recognitionRef.current) {
            const wasListening = isListeningRef.current;
            if (wasListening) recognitionRef.current.stop();
            recognitionRef.current.lang = recognitionLang;
            if (wasListening) {
                // Short timeout to let it stop before restarting
                setTimeout(() => {
                    if (isListeningRef.current) recognitionRef.current.start();
                }, 100);
            }
        }
    }, [recognitionLang]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isLoading]);

    const toggleListening = () => {
        if (!recognitionRef.current) {
            toast.error('Voice features are not supported in your browser.');
            return;
        }

        if (isListening) {
            isListeningRef.current = false;
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            try {
                recognitionRef.current.start();
            } catch (err) {
                console.error('Failed to start recognition, re-initializing:', err);
                recognitionRef.current = setupRecognition();
                recognitionRef.current?.start();
            }
        }
    };

    const handleSendMessage = async (explicitValue?: string) => {
        const textToSend = explicitValue || inputValue;
        if (!textToSend.trim() || isLoading) return;

        const newMessage: Message = {
            id: crypto.randomUUID(),
            role: 'user',
            content: textToSend,
            createdAt: new Date()
        };

        if (isListening && recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }

        setMessages(prev => [...prev, newMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
            const response = await fetch(`${backendUrl}/api/chat/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    message: newMessage.content
                })
            });

            if (!response.ok) throw new Error('Failed to send message');

            const data = await response.json();

            const assistantMessage: Message = {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: data.response,
                createdAt: new Date()
            };

            setMessages(prev => [...prev, assistantMessage]);

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: "Sorry, I encountered an error. Please try again later.",
                createdAt: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Card className="flex flex-col h-full overflow-hidden border bg-background shadow-sm rounded-xl">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b bg-muted/30">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                    <Bot size={18} />
                </div>
                <div>
                    <h3 className="font-semibold text-sm">AI Assistant</h3>
                    <p className="text-xs text-orange-500 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        Online
                    </p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                        <Avatar className="w-8 h-8 border">
                            {message.role === 'user' ? (
                                <>
                                    <AvatarImage src={userImage || undefined} />
                                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                        {userName?.charAt(0).toUpperCase() || <UserIcon size={14} />}
                                    </AvatarFallback>
                                </>
                            ) : (
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                    <Bot size={14} />
                                </AvatarFallback>
                            )}
                        </Avatar>

                        <div
                            className={`flex flex-col gap-1 max-w-[80%] ${message.role === 'user' ? 'items-end' : 'items-start'
                                }`}
                        >
                            <div
                                className={`px-4 py-2.5 rounded-2xl text-sm ${message.role === 'user'
                                    ? 'bg-primary text-primary-foreground rounded-tr-none shadow-sm'
                                    : 'bg-muted/50 border rounded-tl-none'
                                    }`}
                            >
                                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                            </div>
                            <span className="text-[10px] text-orange-500 px-1">
                                {message.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-3">
                        <Avatar className="w-8 h-8 border">
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                <Bot size={14} />
                            </AvatarFallback>
                        </Avatar>
                        <div className="bg-muted/50 border px-4 py-3 rounded-2xl rounded-tl-none">
                            <div className="flex gap-1.5">
                                <span className="w-1.5 h-1.5 bg-orange-500/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-orange-500/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-orange-500/40 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={scrollRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t bg-background">
                <div className="flex gap-2 items-end">
                    <div className="flex flex-col gap-1 items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    disabled={isLoading}
                                    className="h-6 px-2 text-[10px] font-bold text-orange-600 bg-orange-50/80 border border-orange-100 hover:bg-orange-100 hover:text-orange-700 rounded-md uppercase flex items-center gap-1 shadow-sm transition-colors disabled:opacity-50"
                                >
                                    <Globe size={12} />
                                    {recognitionLang === 'en-US' ? 'EN' : 'UR'}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-32">
                                <DropdownMenuLabel className="text-[10px] uppercase text-muted-foreground">Language</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => setRecognitionLang('en-US')}
                                    className="text-xs flex items-center justify-between"
                                >
                                    English
                                    {recognitionLang === 'en-US' && <Check size={12} className="text-orange-500" />}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setRecognitionLang('ur-PK')}
                                    className="text-xs flex items-center justify-between"
                                >
                                    Urdu (اردو)
                                    {recognitionLang === 'ur-PK' && <Check size={12} className="text-orange-500" />}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={toggleListening}
                            disabled={isLoading}
                            className={`h-11 w-11 rounded-xl shrink-0 transition-all active:scale-95 disabled:opacity-50 ${isListening
                                ? "bg-red-50 border-red-200 text-red-600 animate-pulse-slow"
                                : "bg-muted/30 border-orange-500/20 text-muted-foreground hover:text-orange-500"
                                }`}
                        >
                            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                        </Button>
                    </div>
                    <Input
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            if (isListening && recognitionRef.current) {
                                recognitionRef.current.stop();
                            }
                        }}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                        placeholder={isLoading ? "AI is thinking..." : isListening ? "Listening continuously... Click mic to stop" : "Type a message..."}
                        className="min-h-[44px] bg-muted/30 border-orange-500/20 focus-visible:ring-1 focus-visible:ring-offset-0 rounded-xl disabled:opacity-50"
                        autoFocus
                    />
                    <Button
                        onClick={() => handleSendMessage()}
                        disabled={isLoading || !inputValue.trim()}
                        size="icon"
                        className="h-11 w-11 rounded-xl shrink-0 transition-all active:scale-95"
                    >
                        <Send size={18} className={isLoading ? "opacity-0" : "scale-100"} />
                        {isLoading && (
                            <span className="absolute w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        )}
                    </Button>
                </div>
                <p className="text-[10px] text-center text-orange-500 mt-2 flex items-center justify-center gap-1">
                    <Info size={10} />
                    AI can make mistakes. Verify important information.
                </p>
            </div>
        </Card>
    );
}

