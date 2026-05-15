import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Target, TrendingUp, Zap, Sparkles, ChevronRight, UserPlus, LogIn } from 'lucide-react';

interface LandingPageProps {
  onStart: (type: 'login' | 'register') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#1D1D1D] font-sans selection:bg-[#FF0032] selection:text-white overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-[#E5E7EB] z-50 flex items-center justify-between px-10 md:px-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#FF0032] flex items-center justify-center rounded-lg">
            <div className="w-5 h-5 border-2 border-white rounded-sm" />
          </div>
          <h1 className="text-xl font-black uppercase tracking-tightest">
            МТС <span className="text-[#FF0032]">Навигатор</span>
          </h1>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-black uppercase tracking-widest text-[#7A7A7A]">
          <a href="#features" className="hover:text-[#FF0032] transition-colors">Возможности</a>
          <a href="#how-it-works" className="hover:text-[#FF0032] transition-colors">Как это работает</a>
          <a href="#ecosystem" className="hover:text-[#FF0032] transition-colors">Экосистема</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onStart('login')}
            className="hidden sm:flex items-center gap-2 text-sm font-black uppercase tracking-widest hover:text-[#FF0032] transition-colors py-2 px-4"
          >
            <LogIn className="w-4 h-4" />
            Вход
          </button>
          <button 
            onClick={() => onStart('register')}
            className="bg-[#FF0032] text-white text-xs font-black uppercase tracking-[0.2em] px-6 py-3.5 rounded-full hover:bg-[#E6002D] transition-all shadow-lg shadow-[#FF0032]/20"
          >
            Стать Пилотом
          </button>
        </div>
      </nav>

      <section className="pt-40 pb-20 px-10 md:px-20 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 text-[#FF0032] mb-8"
        >
          <BrainCircuit className="w-6 h-6" />
          <span className="text-[12px] font-black uppercase tracking-[0.4em]">Система ИИ Навигации активна</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase max-w-5xl mb-10"
        >
          Твой путь к <span className="text-[#FF0032]">Прогрессу</span> в цифровой среде.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-[#7A7A7A] max-w-2xl font-bold leading-relaxed mb-12"
        >
          Персонализированный ИИ-навигатор, который строит твой карьерный маршрут в экосистеме МТС.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <button 
            onClick={() => onStart('register')}
            className="bg-[#FF0032] text-white text-sm font-black uppercase tracking-widest px-12 py-5 rounded-full hover:bg-[#E6002D] transition-all transform hover:scale-105 shadow-2xl shadow-[#FF0032]/40"
          >
            Построить маршрут
          </button>
          <button className="bg-white text-[#1D1D1D] text-sm font-black uppercase tracking-widest px-12 py-5 rounded-full border border-[#E5E7EB] hover:bg-[#F4F5F7] transition-all">
            Узнать больше
          </button>
        </motion.div>
      </section>

      <section id="features" className="px-10 md:px-20 py-20 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-350 mx-auto">
          <FeatureCard 
            icon={<Target className="w-10 h-10" />}
            title="Оценка навыков"
            description="ИИ анализирует твой текущий стек и подбирает идеальную цель в карьере."
            color="#FF0032"
          />
          <FeatureCard 
            icon={<TrendingUp className="w-10 h-10" />}
            title="Адаптивный трек"
            description="Маршрут меняется в зависимости от твоего прогресса и успехов в тестах."
            color="#00BFA5"
          />
          <FeatureCard 
            icon={<Zap className="w-10 h-10" />}
            title="Карьерный лифт"
            description="Каждый узел маршрута открывает реальные вакансии и стажировки в МТС."
            color="#1D1D1D"
          />
        </div>
      </section>

      <section className="px-10 md:px-20 py-32 bg-[#F4F5F7] overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-20 max-w-350 mx-auto">
          <div className="flex-1">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-8 decoration-[#FF0032] decoration-8 underline decoration-skip-ink">
              Больше чем обучение.
            </h2>
            <p className="text-xl font-bold leading-relaxed text-[#7A7A7A] mb-10">
              Мы объединили лучшие курсы, менторство и реальные проекты в единую систему профессионального взлета.
            </p>
            <div className="grid grid-cols-2 gap-10">
              <Stat value="12k+" label="Пилотов в системе" />
              <Stat value="450+" label="Активных маршрутов" />
              <Stat value="94%" label="Успешных переходов" />
              <Stat value="24/7" label="ИИ Поддержка" />
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="w-125 h-125 bg-white rounded-[64px] border border-[#E5E7EB] shadow-2xl flex items-center justify-center rotate-3">
               <div className="text-center p-12">
                  <Sparkles className="w-20 h-20 text-[#FF0032] mx-auto mb-6" />
                  <p className="text-2xl font-black uppercase text-[#1D1D1D]">Твой следующий шаг</p>
                  <div className="mt-8 space-y-4">
                    <div className="h-4 bg-[#F4F5F7] rounded-full w-full" />
                    <div className="h-4 bg-[#F4F5F7] rounded-full w-[80%]" />
                    <div className="h-4 bg-[#FF0032] rounded-full w-[40%]" />
                  </div>
               </div>
            </div>
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#FF0032] rounded-4xl -rotate-12 flex items-center justify-center text-white">
              <Zap className="w-12 h-12" />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#1D1D1D] text-white py-20 px-10 md:px-20">
        <div className="max-w-350 mx-auto flex flex-col md:flex-row justify-between gap-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-[#FF0032] flex items-center justify-center rounded-lg">
                <div className="w-5 h-5 border-2 border-white rounded-sm" />
              </div>
              <h1 className="text-xl font-black uppercase tracking-tightest">МТС Навигатор</h1>
            </div>
            <p className="text-[#7A7A7A] font-bold max-w-sm">
              Создаем будущее цифровой экосистемы МТС через рост каждого сотрудника.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            <FooterLinkGroup title="Продукт" links={['Маршруты', 'Навыки', 'ИИ Ассистент']} />
            <FooterLinkGroup title="Экосистема" links={['МТС Диджитал', 'Карьера', 'Блог']} />
            <FooterLinkGroup title="Поддержка" links={['Помощь', 'API', 'Правила']} />
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between text-[#7A7A7A] text-[11px] font-black uppercase tracking-widest">
           <span>© 2026 МТС Прогрессоры</span>
           <div className="flex gap-8">
             <span className="hover:text-white cursor-pointer transition-colors">Конфиденциальность</span>
             <span className="hover:text-white cursor-pointer transition-colors">Cookie</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: string }) => (
  <div className="p-10 bg-[#F4F5F7] rounded-[40px] border border-transparent hover:border-[#E5E7EB] hover:bg-white transition-all group cursor-default">
    <div className="mb-8 transition-transform group-hover:scale-110" style={{ color }}>
      {icon}
    </div>
    <h3 className="text-2xl font-black uppercase mb-4 leading-tight">{title}</h3>
    <p className="text-[#7A7A7A] font-bold leading-relaxed">{description}</p>
  </div>
);

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div>
    <p className="text-4xl font-black text-[#1D1D1D] mb-1">{value}</p>
    <p className="text-[10px] font-black uppercase text-[#7A7A7A] tracking-widest">{label}</p>
  </div>
);

const FooterLinkGroup = ({ title, links }: { title: string; links: string[] }) => (
  <div className="space-y-4">
    <h4 className="text-[11px] font-black uppercase text-[#FF0032] tracking-widest">{title}</h4>
    <ul className="space-y-2 text-sm font-bold text-[#7A7A7A]">
      {links.map(l => <li key={l} className="hover:text-white cursor-pointer transition-colors">{l}</li>)}
    </ul>
  </div>
);
