import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Sparkles, Send, RefreshCw, ChevronRight } from 'lucide-react';
import { ChatMessage } from '@/src/types';

interface AINavigatorProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onRecalculate: () => void;
  isTyping?: boolean;
}

export const AINavigator: React.FC<AINavigatorProps> = ({ 
  messages, 
  onSendMessage, 
  onRecalculate,
  isTyping 
}) => {
  const [input, setInput] = React.useState('');
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-4xl border border-[#E5E7EB] overflow-hidden">
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 bg-[#FF0032] flex items-center justify-center rounded-lg">
            <div className="w-5 h-5 border-2 border-white rounded-sm" />
          </div>
          <h3 className="text-2xl font-black uppercase tracking-tight">НАВИГАТОР</h3>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 space-y-6">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col"
            >
              {msg.role === 'model' ? (
                <div className="bg-[#F4F5F7] p-5 rounded-2xl text-sm border border-transparent">
                  <p className="font-bold mb-2 opacity-60 text-[10px] uppercase tracking-widest">ИИ Ассистент</p>
                  <div className="leading-relaxed font-medium">
                    {msg.text}
                  </div>
                  {i === messages.length - 1 && !isTyping && (
                    <div className="mt-5 pt-5 border-t border-[#E5E7EB] flex flex-col gap-3">
                       <div className="bg-[#FF0032]/5 p-4 rounded-2xl border border-[#FF0032]/20">
                        <p className="text-[10px] font-black text-[#FF0032] uppercase mb-2 tracking-widest">Рекомендация</p>
                        <p className="text-xs font-bold leading-tight mb-4 text-[#1D1D1D]">Добавь в маршрут <strong className="text-[#FF0032]">React для дизайнеров</strong>, чтобы открыть доступ к Senior позициям.</p>
                        <button 
                         onClick={onRecalculate}
                         className="w-full bg-[#FF0032] text-white font-bold py-3 rounded-full text-[10px] tracking-widest uppercase hover:bg-[#E6002D] transition-all"
                        >
                          ПЕРЕСЧИТАТЬ МАРШРУТ
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="self-end max-w-[90%] bg-[#1D1D1D] text-white p-4 rounded-2xl rounded-tr-none text-sm font-bold">
                  {msg.text}
                </div>
              )}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-[#F4F5F7] p-4 rounded-2xl flex gap-1.5">
                <div className="w-1.5 h-1.5 bg-[#FF0032]/40 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-[#FF0032]/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-[#FF0032]/40 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-8 pb-10 mt-auto">
        <form onSubmit={handleSubmit} className="bg-[#F4F5F7] rounded-full px-6 py-4 flex items-center gap-3">
          <div className="w-2 h-2 bg-[#FF0032] rounded-full" />
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Спроси Навигатора..." 
            className="bg-transparent border-none text-sm w-full outline-none font-black uppercase tracking-wider placeholder:text-[#ADADAD]"
          />
        </form>
      </div>
    </div>
  );
};
