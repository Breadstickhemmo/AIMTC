import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Zap, Sparkles, LogIn } from 'lucide-react';

interface LandingPageProps {
  onStart: (type: 'login' | 'register') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#1D1D1D] font-sans selection:bg-[#FF0032] selection:text-white overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-[#E5E7EB] z-50 flex items-center justify-between px-6 md:px-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#FF0032] flex items-center justify-center rounded-lg shrink-0">
            <div className="w-4 h-4 border-2 border-white rounded-sm" />
          </div>
          <h1 className="text-lg md:text-xl font-black uppercase tracking-tightest">
            МТС <span className="text-[#FF0032]">Навигатор</span>
          </h1>
        </div>
        
        <div className="hidden lg:flex items-center gap-8 text-sm font-black uppercase tracking-widest text-[#7A7A7A]">
          <a href="#features" className="hover:text-[#FF0032] transition-colors">Возможности</a>
          <a href="#how-it-works" className="hover:text-[#FF0032] transition-colors">Механика</a>
          <a href="#ecosystem" className="hover:text-[#FF0032] transition-colors">Экосистема</a>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => onStart('login')}
            className="hidden sm:flex items-center gap-2 text-sm font-black uppercase tracking-widest hover:text-[#FF0032] transition-colors py-2 px-4"
          >
            <LogIn className="w-4 h-4" />
            Вход
          </button>
          <button 
            onClick={() => onStart('register')}
            className="bg-[#FF0032] text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] px-5 py-3 md:px-6 md:py-3.5 rounded-full hover:bg-[#E6002D] transition-all shadow-lg shadow-[#FF0032]/20 shrink-0"
          >
            Стать Пилотом
          </button>
        </div>
      </nav>

      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-20 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 md:gap-3 text-[#FF0032] mb-6 md:mb-8 bg-white px-4 py-2 rounded-full shadow-sm border border-[#E5E7EB]"
        >
          <BrainCircuit className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em]">Система ИИ Навигации активна</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase max-w-5xl mb-8 md:mb-10"
        >
          Твой путь к <span className="text-[#FF0032]">Прогрессу</span> в цифровой среде.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-2xl text-[#7A7A7A] max-w-2xl font-bold leading-relaxed mb-10 md:mb-12"
        >
          Персонализированный ИИ-навигатор, который строит твой карьерный маршрут в экосистеме МТС.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto"
        >
          <button 
            onClick={() => onStart('register')}
            className="w-full sm:w-auto bg-[#FF0032] text-white text-xs md:text-sm font-black uppercase tracking-widest px-8 md:px-12 py-4 md:py-5 rounded-full hover:bg-[#E6002D] transition-all transform hover:scale-105 shadow-2xl shadow-[#FF0032]/40"
          >
            Построить маршрут
          </button>
          <button className="w-full sm:w-auto bg-white text-[#1D1D1D] text-xs md:text-sm font-black uppercase tracking-widest px-8 md:px-12 py-4 md:py-5 rounded-full border border-[#E5E7EB] hover:bg-[#F4F5F7] transition-all">
            Узнать больше
          </button>
        </motion.div>
      </section>

      <section id="features" className="px-6 md:px-20 py-16 md:py-20 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-[1400px] mx-auto">
          <FeatureCard 
            title="Оценка навыков"
            description="ИИ анализирует твой текущий стек и подбирает идеальную цель в карьере."
            imageUrl="/images/card1.avif" 
          />
          <FeatureCard 
            title="Адаптивный трек"
            description="Маршрут меняется в зависимости от твоего прогресса и успехов в тестах."
            imageUrl="/images/card2.avif" 
          />
          <FeatureCard 
            title="Карьерный лифт"
            description="Каждый узел маршрута открывает реальные вакансии и стажировки в МТС."
            imageUrl="/images/card3.avif" 
          />
        </div>
      </section>

      <section className="px-6 md:px-20 py-20 md:py-32 bg-[#F4F5F7] overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-350 mx-auto">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 md:mb-8 decoration-[#FF0032] decoration-8 underline decoration-skip-ink">
              Больше чем обучение.
            </h2>
            <p className="text-lg md:text-xl font-bold leading-relaxed text-[#7A7A7A] mb-8 md:mb-10 max-w-2xl mx-auto lg:mx-0">
              Мы объединили лучшие курсы, менторство и реальные проекты в единую систему профессионального взлета.
            </p>
            <div className="grid grid-cols-2 gap-6 md:gap-10">
              <Stat value="12k+" label="Пилотов в системе" />
              <Stat value="450+" label="Активных маршрутов" />
              <Stat value="94%" label="Успешных переходов" />
              <Stat value="24/7" label="ИИ Поддержка" />
            </div>
          </div>
          <div className="flex-1 relative w-full max-w-md lg:max-w-none mt-10 lg:mt-0">
            <div className="aspect-square bg-white rounded-[40px] md:rounded-[64px] border border-[#E5E7EB] shadow-2xl flex items-center justify-center rotate-3 transform hover:rotate-0 transition-all duration-500">
               <div className="text-center p-8 md:p-12 w-full">
                  <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-[#FF0032] mx-auto mb-6" />
                  <p className="text-xl md:text-2xl font-black uppercase text-[#1D1D1D]">Твой следующий шаг</p>
                  <div className="mt-8 space-y-4">
                    <div className="h-3 md:h-4 bg-[#F4F5F7] rounded-full w-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 1 }} className="h-full bg-[#E5E7EB]" />
                    </div>
                    <div className="h-3 md:h-4 bg-[#F4F5F7] rounded-full w-[80%] overflow-hidden">
                       <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 1.2 }} className="h-full bg-[#E5E7EB]" />
                    </div>
                    <div className="h-3 md:h-4 bg-[#F4F5F7] rounded-full w-[40%] overflow-hidden">
                       <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 1.5 }} className="h-full bg-[#FF0032]" />
                    </div>
                  </div>
               </div>
            </div>
            <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 w-24 h-24 md:w-32 md:h-32 bg-[#FF0032] rounded-3xl md:rounded-4xl -rotate-12 flex items-center justify-center text-white shadow-xl">
              <Zap className="w-10 h-10 md:w-12 md:h-12" />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#1D1D1D] text-white py-16 md:py-20 px-6 md:px-20">
        <div className="max-w-350 mx-auto flex flex-col lg:flex-row justify-between gap-12 lg:gap-10">
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-[#FF0032] flex items-center justify-center rounded-lg">
                <div className="w-4 h-4 border-2 border-white rounded-sm" />
              </div>
              <h1 className="text-xl font-black uppercase tracking-tightest">МТС Навигатор</h1>
            </div>
            <p className="text-[#7A7A7A] font-bold">
              Создаем будущее цифровой экосистемы МТС через рост каждого сотрудника.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
            <FooterLinkGroup title="Продукт" links={['Маршруты', 'Навыки', 'ИИ Ассистент']} />
            <FooterLinkGroup title="Экосистема" links={['МТС Диджитал', 'Карьера', 'Блог']} />
            <FooterLinkGroup title="Поддержка" links={['Помощь', 'API', 'Правила']} />
          </div>
        </div>
        <div className="max-w-350 mx-auto mt-16 md:mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[#7A7A7A] text-[10px] md:text-[11px] font-black uppercase tracking-widest">
           <span>© 2026 МТС Прогрессоры</span>
           <div className="flex gap-6 md:gap-8">
             <span className="hover:text-white cursor-pointer transition-colors">Конфиденциальность</span>
             <span className="hover:text-white cursor-pointer transition-colors">Cookie</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, description, imageUrl }: { title: string; description: string; imageUrl: string }) => (
  <div className="p-3 sm:p-5 bg-[#F4F5F7] rounded-4xl sm:rounded-[40px] border border-transparent hover:border-[#E5E7EB] hover:bg-white transition-all group cursor-default flex flex-col h-full shadow-sm hover:shadow-xl">
    <div className="p-4 sm:p-6 flex-1">
      <h3 className="text-xl sm:text-2xl font-black uppercase mb-3 sm:mb-4 leading-tight text-[#1D1D1D]">{title}</h3>
      <p className="text-sm sm:text-base text-[#7A7A7A] font-bold leading-relaxed">{description}</p>
    </div>
    <div className="w-full h-40 sm:h-56 rounded-[20px] sm:rounded-[28px] overflow-hidden relative mt-auto">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
    </div>
  </div>
);

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div>
    <p className="text-3xl md:text-4xl font-black text-[#1D1D1D] mb-1">{value}</p>
    <p className="text-[9px] md:text-[10px] font-black uppercase text-[#7A7A7A] tracking-widest">{label}</p>
  </div>
);

const FooterLinkGroup = ({ title, links }: { title: string; links: string[] }) => (
  <div className="space-y-4">
    <h4 className="text-[10px] md:text-[11px] font-black uppercase text-[#FF0032] tracking-widest">{title}</h4>
    <ul className="space-y-2 text-xs md:text-sm font-bold text-[#7A7A7A]">
      {links.map(l => <li key={l} className="hover:text-white cursor-pointer transition-colors">{l}</li>)}
    </ul>
  </div>
);