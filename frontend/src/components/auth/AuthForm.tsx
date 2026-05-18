import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Lock, Mail, ChevronRight, ArrowLeft } from 'lucide-react';
import { UserProfile } from '../../types';

interface AuthFormProps {
  type: 'login' | 'register';
  onBack: () => void;
  onSuccess: (user: UserProfile) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ type, onBack, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const endpoint = type === 'login' ? '/api/login' : '/api/register';
    const body = type === 'login' ? { email, password } : { name, email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Произошла ошибка при авторизации');
      }

      localStorage.setItem('mts_token', data.token);
      onSuccess(data.user);
      
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center p-4 sm:p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-[40px] sm:rounded-[48px] p-8 sm:p-12 shadow-2xl border border-[#E5E7EB] relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FF0032]/5 rounded-full blur-3xl" />
        
        <button onClick={onBack} className="flex items-center gap-2 text-[#7A7A7A] hover:text-[#FF0032] transition-colors mb-8 sm:mb-10 group relative z-10">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-[10px] font-black uppercase tracking-widest">Назад</span>
        </button>

        <div className="mb-8 relative z-10">
          <div className="w-12 h-12 bg-[#FF0032] flex items-center justify-center rounded-xl mb-6 shadow-lg shadow-[#FF0032]/20 shrink-0">
            <div className="w-5 h-5 border-2 border-white rounded-sm" />
          </div>
          <h2 className="text-3xl sm:text-[34px] font-black uppercase tracking-tight leading-[1.1] mb-2 break-words">
            {type === 'login' ? 'С ВОЗВРАЩЕНИЕМ' : 'НОВЫЙ ПИЛОТ'}
          </h2>
          <p className="text-[#7A7A7A] font-bold text-sm sm:text-base mt-3">
            {type === 'login' ? 'Твой маршрут ждет тебя. Продолжим?' : 'Начни свой путь в экосистеме МТС прямо сейчас.'}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 text-[#FF0032] rounded-2xl text-sm font-bold border border-red-100 relative z-10">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {type === 'register' && (
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#ADADAD] ml-4">Имя</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ADADAD]" />
                <input 
                  type="text" value={name} onChange={e => setName(e.target.value)} required
                  placeholder="Дмитрий Анохин"
                  className="w-full bg-[#F4F5F7] border-none rounded-2xl py-4 pl-14 pr-6 font-bold outline-none focus:ring-2 focus:ring-[#FF0032]/20 transition-all"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#ADADAD] ml-4">Email</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ADADAD]" />
              <input 
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="pilot@mts.ru"
                className="w-full bg-[#F4F5F7] border-none rounded-2xl py-4 pl-14 pr-6 font-bold outline-none focus:ring-2 focus:ring-[#FF0032]/20 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#ADADAD] ml-4">Пароль</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ADADAD]" />
              <input 
                type="password" value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="••••••••"
                className="w-full bg-[#F4F5F7] border-none rounded-2xl py-4 pl-14 pr-6 font-bold outline-none focus:ring-2 focus:ring-[#FF0032]/20 transition-all"
              />
            </div>
          </div>

          <button disabled={loading} type="submit" className="w-full bg-[#FF0032] text-white font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-[#E6002D] transition-all shadow-xl shadow-[#FF0032]/20 mt-4 relative overflow-hidden group">
            <div className="flex items-center justify-center gap-2">
              <span>{loading ? 'ЗАГРУЗКА...' : type === 'login' ? 'ВОЙТИ' : 'ЗАРЕГИСТРИРОВАТЬСЯ'}</span>
              {!loading && <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
            </div>
          </button>
        </form>

        <div className="mt-8 text-center relative z-10">
          <p className="text-sm font-bold text-[#7A7A7A]">
            {type === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
            <button onClick={() => window.location.reload()} type="button" className="text-[#FF0032] ml-2 hover:underline">
               {type === 'login' ? 'Создать' : 'Войти'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};