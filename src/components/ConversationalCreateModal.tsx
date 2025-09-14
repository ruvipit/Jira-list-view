// Animated Nebula SVG Component
function AIAnimatedNebula() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" className="mb-2 animate-spin-slow" style={{ filter: 'blur(1px)' }}>
      <defs>
        <radialGradient id="nebulaGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#818cf8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      <ellipse cx="40" cy="40" rx="30" ry="18" fill="url(#nebulaGradient)">
        <animateTransform attributeName="transform" type="rotate" from="0 40 40" to="360 40 40" dur="8s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="40" cy="40" rx="18" ry="30" fill="url(#nebulaGradient)" opacity="0.7">
        <animateTransform attributeName="transform" type="rotate" from="360 40 40" to="0 40 40" dur="10s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="40" cy="40" rx="24" ry="12" fill="url(#nebulaGradient)" opacity="0.5">
        <animateTransform attributeName="transform" type="rotate" from="0 40 40" to="360 40 40" dur="6s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  );
}

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";


// (Removed duplicate AIAnimatedNebula)

export interface ConversationalCreateModalProps {
  open: boolean;
  onClose: () => void;
}

export function ConversationalCreateModal({ open, onClose }: ConversationalCreateModalProps) {
  const [messages, setMessages] = useState([
    { role: "system", content: "How can I help you create or manage work?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setLoading(true);
    setInput("");
    // Mimic AI response locally
    setTimeout(() => {
      let reply = "Here's a summary of this quarter's progress:"
      if (input.toLowerCase().includes("summary")) {
        reply += "\n- 12 projects completed\n- 3 new initiatives started\n- Revenue up 18%\n- Team engagement at all-time high.";
      } else if (input.toLowerCase().includes("create")) {
        reply = "Work item created! You can now track and manage it in the board.";
      } else {
        reply = "I'm here to help you manage work. Try asking for a summary or to create a new item.";
      }
      setMessages((msgs) => [...msgs, { role: "assistant", content: reply }]);
      setLoading(false);
    }, 1000);
  }

  return (
    <Dialog open={open}>
      <DialogContent className="backdrop-blur-lg bg-white/80 border-none shadow-2xl rounded-2xl p-0">
        <div className="flex flex-col items-center justify-center mt-4 mb-2">
          <AIAnimatedNebula />
          <DialogTitle className="text-center text-2xl font-bold text-blue-700 mt-2 tracking-tight">Neural Create</DialogTitle>
        </div>
        <div className="flex flex-col gap-4 min-h-[350px] px-6 pb-6">
          <div className="flex-1 overflow-y-auto rounded-xl p-4 bg-gradient-to-br from-gray-50/80 via-white/80 to-blue-50/60 border border-gray-200 shadow-inner">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-base shadow ${msg.role === "user" ? "bg-blue-600 text-white" : "bg-white text-gray-800 border border-gray-200"}`} style={{wordBreak: 'break-word'}}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 items-center mt-2">
            <input
              className="flex-1 border-none rounded-xl px-4 py-3 text-base bg-white/70 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your request..."
              disabled={loading}
              onKeyDown={e => { if (e.key === "Enter") sendMessage(); }}
            />
            <Button onClick={sendMessage} disabled={loading || !input.trim()} className="rounded-xl px-6 py-3 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow">
              {loading ? "..." : "Send"}
            </Button>
          </div>
        </div>
// ...existing code up to the end of the ConversationalCreateModal function...
      </DialogContent>
    </Dialog>
  );
}
