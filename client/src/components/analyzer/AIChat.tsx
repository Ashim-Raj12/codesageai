import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, HelpCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
}

interface AIChatProps {
  languageContext: string;
}

export const AIChat: React.FC<AIChatProps> = ({
  languageContext,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      content:
        'I am your AI review assistant, fully context-aware of the script inside the active editor console. Ask me any design pattern questions, optimization techniques, or bug explanations.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const presetQuestions = [
    'Explain this function',
    'Why is this bug happening?',
    'How to optimize?',
    'Alternative approach?',
    'Best practices?',
  ];

  const generateDummyResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('explain')) {
      return `Here is a step-by-step breakdown of the active **${languageContext}** block:
1. **Control Flow**: Renders lookups to match search indices.
2. **Resource Consumption**: Execution constraints are linear O(N) check speeds.
3. **Data Integrity**: Checks array find parameters but doesn't handle optionals safety checks.`;
    }
    if (q.includes('optimize')) {
      return `To optimize the code, we should map arrays into key indexes for constant time lookup:
\`\`\`${languageContext}
// Recommended optimization:
const lookupMap = new Map(items.map(i => [i.id, i]));
const result = lookupMap.get(searchId);
\`\`\`
This shifts lookup execution speeds from linear O(N) to constant O(1).`;
    }
    if (q.includes('bug')) {
      return `We detected 2 logical warning triggers:
- **Index Lookup Error**: Recursive array search arrays loops within queries.
- **Reference Hazard**: Reading properties on nullable objects without checks.`;
    }
    return `Regarding your instruction: "${query}", here is the recommended design:
- **Architecture**: Enforce decoupling of logic.
- **Testing**: Integrate mocks inside test profiles.
- **Complexity**: Keep function lengths short.`;
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and typing response
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'ai',
        content: generateDummyResponse(text),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-72 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 rounded-xl overflow-hidden shadow-xs font-sans">
      
      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-150 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950/40">
        <Sparkles className="h-4.5 w-4.5 text-violet-500" />
        <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">AI Workspace Assistant</span>
        <span className="text-[9px] font-semibold text-zinc-400 bg-zinc-200 dark:bg-zinc-900 px-1.5 py-0.5 rounded ml-2">
          {languageContext.toUpperCase()} CONTEXT ON
        </span>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-[85%] ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-xs font-bold leading-none ${
                msg.sender === 'user'
                  ? 'bg-zinc-100 border-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:border-zinc-750 dark:text-zinc-300'
                  : 'bg-violet-50 border-violet-100 text-violet-600 dark:bg-violet-950/20 dark:border-violet-900/30 dark:text-violet-400'
              }`}
            >
              {msg.sender === 'user' ? <User className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
            </div>

            <div
              className={`p-3 rounded-xl border text-xs leading-relaxed font-sans whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-zinc-100/50 border-zinc-200 text-zinc-800 dark:bg-zinc-900 dark:border-zinc-850 dark:text-zinc-200 rounded-tr-none'
                  : 'bg-zinc-50 dark:bg-zinc-900/10 border-zinc-150 dark:border-zinc-900/60 text-zinc-700 dark:text-zinc-300 rounded-tl-none font-sans'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 max-w-[85%]">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-violet-100 bg-violet-50 text-violet-600 dark:bg-violet-950/20 dark:border-violet-900/30 dark:text-violet-400">
              <Sparkles className="h-3.5 w-3.5 animate-spin" />
            </div>
            <div className="p-3 rounded-xl border border-zinc-150 bg-zinc-50 dark:bg-zinc-900/10 dark:border-zinc-900/60 text-xs text-zinc-400 dark:text-zinc-500 italic rounded-tl-none">
              Typing response...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Preset Qs panel */}
      {messages.length === 1 && !isTyping && (
        <div className="px-4 py-2 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/20 dark:bg-zinc-900/5 flex flex-wrap gap-1.5 items-center">
          <HelpCircle className="h-3.5 w-3.5 text-zinc-400 mr-1 shrink-0" />
          {presetQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-[10px] font-semibold text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input panel */}
      <div className="p-3 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950/80 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
          placeholder="Ask workspace assistant about active editor code..."
          className="flex-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3.5 py-1.5 text-xs text-zinc-950 dark:text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
        />
        <button
          onClick={() => handleSend(input)}
          className="p-1.5 rounded-lg bg-violet-600 text-white hover:bg-violet-500 shadow-sm transition-colors cursor-pointer"
          title="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>

    </div>
  );
};
