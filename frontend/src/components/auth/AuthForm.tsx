import React from 'react';
import { motion } from 'motion/react';
import { User, Lock, Mail, ChevronRight, ArrowLeft } from 'lucide-react';

interface AuthFormProps {
  type: 'login' | 'register';
  onBack: () => void;
  onSuccess: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ type, onBack, onSuccess }) => {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-[48px] p-10 md:p-14 shadow-2xl border border-[#E5E7EB] relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FF0032]/5 rounded-full blur-3xl" />
        
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#7A7A7A] hover:text-[#FF0032] transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-[10px] font-black uppercase tracking-widest">Назад</span>
        </button>

        <div className="mb-12">
          <div className="w-12 h-12 bg-[#FF0032] flex items-center justify-center rounded-xl mb-6 shadow-lg shadow-[#FF0032]/20">
            <div className="w-6 h-6 border-2 border-white rounded-sm" />
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tightest leading-none mb-4">
            {type === 'login' ? 'С ВОЗВРАЩЕНИЕМ' : 'НОВЫЙ ПИЛОТ'}
          </h2>
          <p className="text-[#7A7A7A] font-bold">
            {type === 'login' ? 'Твой маршрут ждет тебя. Продолжим?' : 'Начни свой путь в экосистеме МТС прямо сейчас.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {type === 'register' && (
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#ADADAD] ml-4">Имя</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ADADAD]" />
                <input 
                  type="text" 
                  placeholder="Дмитрий Анохин"
                  className="w-full bg-[#F4F5F7] border-none rounded-2xl py-4 pl-14 pr-6 font-bold outline-none focus:ring-2 focus:ring-[#FF0032]/20 transition-all"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#ADADAD] ml-4">Email</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ADADAD]" />
              <input 
                type="email" 
                placeholder="pilot@mts.ru"
                className="w-full bg-[#F4F5F7] border-none rounded-2xl py-4 pl-14 pr-6 font-bold outline-none focus:ring-2 focus:ring-[#FF0032]/20 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#ADADAD] ml-4">Пароль</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ADADAD]" />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-[#F4F5F7] border-none rounded-2xl py-4 pl-14 pr-6 font-bold outline-none focus:ring-2 focus:ring-[#FF0032]/20 transition-all"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF0032] text-white font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-[#E6002D] transition-all shadow-xl shadow-[#FF0032]/20 relative overflow-hidden"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Загрузка</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span>{type === 'login' ? 'Войти' : 'Зарегистрироваться'}</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm font-bold text-[#7A7A7A]">
            {type === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
            <button className="text-[#FF0032] ml-2 hover:underline">
               {type === 'login' ? 'Создать' : 'Войти'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
