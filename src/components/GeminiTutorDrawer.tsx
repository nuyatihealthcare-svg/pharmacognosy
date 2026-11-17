import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BotanicalSample, AnatomicalFeature } from '../types';
import { Bot, Send, Sparkles, User, RefreshCw, BookOpen, AlertCircle } from 'lucide-react';

interface GeminiTutorDrawerProps {
  sample: BotanicalSample;
  selectedFeature: AnatomicalFeature | null;
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
}

export const GeminiTutorDrawer: React.FC<GeminiTutorDrawerProps> = ({
  sample,
  selectedFeature,
  isOpen,
  onClose
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'tutor',
      text: `Hello! I am your AI Pharmacognosy Lab Instructor. I am analyzing **${sample.name}** under the microscope. Ask me about histology, staining tests (Phloroglucinol/Iodine), chemical constituents, or adulterant identification!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (customPrompt?: string) => {
    const promptToSend = customPrompt || input;
    if (!promptToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: promptToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSend,
          sampleContext: sample,
          currentFeature: selectedFeature
        })
      });

      const data = await res.json();
      const tutorReply = data.reply || 'Sorry, I could not process that query.';

      const tutorMsg: ChatMessage = {
        id: `t-${Date.now()}`,
        sender: 'tutor',
        text: tutorReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, tutorMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'tutor',
          text: 'Error connecting to AI Tutor. Please check server connection.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="fixed inset-y-0 right-0 w-full sm:w-96 bg-[#12151B] border-l border-slate-800 shadow-2xl z-50 flex flex-col text-slate-300 font-sans"
      >
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-[#0A0C10] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100 flex items-center gap-1 uppercase tracking-wider">
              <span>AI Instructor</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </h3>
            <p className="text-[10px] text-slate-500 font-mono">GEMINI 2.5 FLASH</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-slate-500 hover:text-white p-1 rounded hover:bg-slate-800 text-sm font-mono"
        >
          ✕
        </button>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-2 bg-[#0A0C10] border-b border-slate-800 flex gap-1.5 overflow-x-auto text-[10px]">
        <button
          onClick={() => handleSend(`What is the key diagnostic feature to identify ${sample.name}?`)}
          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded whitespace-nowrap border border-slate-700 font-mono"
        >
          Key Feature
        </button>
        <button
          onClick={() => handleSend(`How does Phloroglucinol + HCl react with ${sample.name}?`)}
          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded whitespace-nowrap border border-slate-700 font-mono"
        >
          Staining Test
        </button>
        <button
          onClick={() => handleSend(`What are common adulterants for ${sample.name}?`)}
          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded whitespace-nowrap border border-slate-700 font-mono"
        >
          Adulterants
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-500 text-slate-950 font-semibold rounded-br-none'
                  : 'bg-[#0A0C10] text-slate-200 border border-slate-800 rounded-bl-none shadow-md'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
            <span className="text-[9px] text-slate-500 mt-1 px-1 font-mono">{msg.timestamp}</span>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-slate-800/60 p-2.5 rounded border border-slate-700/50 w-fit font-mono">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Consulting Pharmacognosy Database...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-slate-800 bg-[#0A0C10] flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask AI Tutor about this slide..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          className="p-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded disabled:opacity-50 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
    </>
  );
};
