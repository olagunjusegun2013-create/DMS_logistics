import React, { useState } from 'react';

interface CustomerSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerSupportModal: React.FC<CustomerSupportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'agent' | 'user'; text: string; time: string }>>([
    {
      sender: 'agent',
      text: 'Hello! This is Lagos Central Dispatch Desk (Ext. 402). How can we assist your consignment today?',
      time: '14:30',
    },
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: inputText.trim(),
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent' as const,
          text: 'Dispatch controller received your inquiry. Telemetry ping sent to the assigned corridor courier.',
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0c1d2c]/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-outline-variant/30 flex flex-col h-[560px] overflow-hidden animate-in fade-in zoom-in">
        {/* Header */}
        <div className="px-5 py-3.5 bg-[#142b45] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
            </div>
            <div>
              <h2 className="font-['Manrope'] font-bold text-sm">Lagos Central Dispatch Desk</h2>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Operator Online • Extension 402
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f8f9ff] text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-secondary text-white rounded-br-none'
                    : 'bg-white text-[#0c1d2c] border border-outline-variant/25 rounded-bl-none'
                }`}
              >
                <p className="leading-relaxed">{m.text}</p>
                <span className="text-[9px] opacity-70 block text-right mt-1 font-mono">
                  {m.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <form
          onSubmit={handleSend}
          className="p-3 bg-white border-t border-outline-variant/20 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your question or tracking reference..."
            className="flex-1 bg-[#f8f9ff] text-xs px-3 py-2 rounded-xl border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-secondary"
          />
          <button
            type="submit"
            className="w-9 h-9 rounded-xl bg-secondary text-white flex items-center justify-center hover:bg-secondary-container transition-colors cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
