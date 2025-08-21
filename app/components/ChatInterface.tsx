"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "coach";
  timestamp: Date;
}

interface ChatInterfaceProps {
  userId: string;
  context?: any;
}

export function ChatInterface({ userId, context }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there! I'm your FitFlow AI coach. How can I help with your fitness journey today?",
      sender: "coach",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    try {
      // Send message to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputValue,
          userId,
          context,
        }),
      });
      
      const data = await response.json();
      
      // Add coach response to chat
      const coachMessage: Message = {
        id: `coach-${Date.now()}`,
        content: data.message || "Sorry, I couldn't process that request.",
        sender: "coach",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, coachMessage]);
      
      // Handle function calls if any
      if (data.type === "function_call") {
        // Process function calls here
        console.log("Function call:", data.function_call);
      }
      
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "Sorry, there was an error processing your message. Please try again.",
        sender: "coach",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] border border-border-light rounded-lg overflow-hidden bg-surface">
      {/* Chat header */}
      <div className="bg-primary text-white p-4 flex items-center">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
          🤖
        </div>
        <div>
          <h3 className="font-medium">FitFlow Coach</h3>
          <p className="text-xs text-white/80">AI-powered fitness assistant</p>
        </div>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "user"
                  ? "bg-primary text-white rounded-tr-none"
                  : "bg-gray-100 text-text rounded-tl-none"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 rounded-tl-none">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="border-t border-border-light p-3 flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Ask your fitness coach..."
          className="flex-1 bg-transparent border-none outline-none text-text placeholder:text-text-muted"
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !inputValue.trim()}
          className={`ml-2 p-2 rounded-full ${
            isLoading || !inputValue.trim()
              ? "bg-gray-200 text-gray-400"
              : "bg-primary text-white hover:bg-primary-hover"
          } transition-colors`}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

