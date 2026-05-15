import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shell } from './components/layout/Shell';
import { CareerStats } from './components/profile/CareerStats';
import { RouteMap } from './components/route/RouteMap';
import { AINavigator } from './components/chat/AINavigator';
import { UserProfile, RouteNode, NodeStatus, ChatMessage } from './types';
import { ChevronRight, LayoutGrid, Map, BrainCircuit } from 'lucide-react';

const MOCK_PROFILE: UserProfile = {
  name: "Дмитрий Анохин",
  role: "Младший Frontend разработчик",
  targetRole: "Middle Frontend разработчик",
  level: 12,
  progress: 34,
  skills: [
    { name: "React Query", level: 85 },
    { name: "Node.js", level: 60 },
    { name: "Typescript", level: 75 },
    { name: "Дизайн МТС", level: 90 },
    { name: "UX Стратегия", level: 45 }
  ]
};

const MOCK_NODES: RouteNode[] = [
  { id: '1', title: 'Основы JS Фреймворков', type: 'курс', description: 'Основы современных фреймворков', estimatedTime: '2ч', status: NodeStatus.COMPLETED, x: 10, y: 50 },
  { id: '2', title: 'Глубокое погружение в React Hooks', type: 'видео', description: 'Продвинутое управление состоянием', estimatedTime: '45м', status: NodeStatus.COMPLETED, x: 25, y: 30 },
  { id: '3', title: 'Тест по управлению состоянием', type: 'тест', description: 'Проверьте свои знания', estimatedTime: '15м', status: NodeStatus.COMPLETED, x: 40, y: 50 },
  { id: '4', title: 'Продвинутые паттерны React', type: 'курс', description: 'Render props, HOCs, signals', estimatedTime: '4ч', status: NodeStatus.ACTIVE, x: 55, y: 70 },
  { id: '5', title: 'Обзор архитектуры', type: 'статья', description: 'Масштабируемая архитектура фронтенда', estimatedTime: '20м', status: NodeStatus.LOCKED, x: 75, y: 50 },
  { id: '6', title: 'Финальная сертификация', type: 'тест', description: 'Карьерный прорыв: Middle Dev', estimatedTime: '1ч', status: NodeStatus.LOCKED, x: 90, y: 50 },
];

import { LandingPage } from './components/auth/LandingPage';
import { AuthForm } from './components/auth/AuthForm';

export default function App() {
  const [authState, setAuthState] = useState<'landing' | 'login' | 'register' | 'authenticated'>('landing');
  const [profile, setProfile] = useState<UserProfile>(MOCK_PROFILE);
  const [nodes, setNodes] = useState<RouteNode[]>(MOCK_NODES);
  const [activeTab, setActiveTab] = useState<'route' | 'chat'>('route');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Я проанализировал твой прогресс. Ты освоил JS Фреймворки быстрее чем 85% других пилотов. Готов перейти к Продвинутым Паттернам?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (text: string) => {
    const newMessages: ChatMessage[] = [...messages, { role: 'user', text }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const res = await fetch('/api/navigate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          history: messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
          currentProfile: profile
        })
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'model', text: data.text }]);
    } catch (e) {
      console.error(e);
      setMessages([...newMessages, { role: 'model', text: "У меня проблемы с подключением к облаку МТС. Пожалуйста, попробуй еще раз." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRecalculate = () => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages([...messages, { role: 'model', text: "Анализирую рынок труда... Маршрут пересчитан! Я добавил 'React для дизайнеров' в твой путь, чтобы сократить разрыв до уровня Middle." }]);
      setIsTyping(false);
    }, 2000);
  };

  if (authState === 'landing') {
    return <LandingPage onStart={(type) => setAuthState(type)} />;
  }

  if (authState === 'login' || authState === 'register') {
    return (
      <AuthForm 
        type={authState} 
        onBack={() => setAuthState('landing')} 
        onSuccess={() => setAuthState('authenticated')} 
      />
    );
  }

  return (
    <Shell>
      <div className="min-h-screen bg-[#F4F5F7] text-[#1D1D1D] font-sans overflow-hidden flex flex-col">
        {/* Mobile Tab Switcher */}
        <div className="lg:hidden flex border-b border-[#E5E7EB] bg-white sticky top-0 z-50 px-6 pt-4 gap-6 shrink-0">
          <TabItem 
            active={activeTab === 'route'} 
            onClick={() => setActiveTab('route')}
            icon={<Map className="w-5 h-5" />} 
            label="Маршрут" 
          />
          <TabItem 
            active={activeTab === 'chat'} 
            onClick={() => setActiveTab('chat')}
            icon={<BrainCircuit className="w-5 h-5" />} 
            label="Навигатор" 
          />
        </div>

        <div className="flex-1 flex flex-col lg:flex-row h-full lg:max-h-[calc(100vh-5rem)] gap-6 p-4 lg:p-6 overflow-hidden">
          {/* SIDEBAR: AI NAVIGATOR (Visible on desktop or when chat active on mobile) */}
          <aside className={`w-full lg:w-87.5 shrink-0 h-150 lg:h-full ${activeTab === 'chat' ? 'flex' : 'hidden lg:flex'}`}>
             <AINavigator 
               messages={messages} 
               onSendMessage={handleSendMessage} 
               onRecalculate={handleRecalculate}
               isTyping={isTyping}
             />
          </aside>

          {/* MAIN CONTENT AREA (Visible on desktop or when route active on mobile) */}
          <main className={`flex-1 flex flex-col gap-6 overflow-y-auto pr-2 scrollbar-hide mb-20 lg:mb-0 ${activeTab === 'route' ? 'flex' : 'hidden lg:flex'}`}>
            {/* Header info */}
            <div className="flex items-center justify-between px-4">
               <div className="flex items-center gap-2 text-[#FF0032]">
                 <BrainCircuit className="w-5 h-5" />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em]">Система Активна</span>
               </div>
               <div className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-[#7A7A7A]">
                 Личность Пилота Экосистемы Подтверждена
               </div>
            </div>

            {/* TOP BENTO BAR */}
            <CareerStats profile={profile} />

            {/* VISUAL ROUTE SECTION */}
            <section className="flex-1 min-h-150 overflow-x-auto overflow-y-hidden scrollbar-hide rounded-4xl">
               <div className="min-w-250 lg:min-w-0 h-full">
                  <RouteMap nodes={nodes} onNodeClick={(n) => console.log(n)} />
               </div>
            </section>
          </main>
        </div>
      </div>
    </Shell>
  );
}

const TabItem = ({ icon, label, onClick, active = false }: { icon: React.ReactNode; label: string; onClick: () => void; active?: boolean }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 pb-4 px-2 transition-all relative ${
    active ? 'text-[#FF0032]' : 'text-[#7A7A7A] hover:text-[#1D1D1D]'
  }`}>
    {icon}
    <span className="text-xs font-black uppercase tracking-wider">{label}</span>
    {active && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF0032] rounded-t-full" />}
  </button>
);
