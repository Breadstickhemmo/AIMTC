import React from 'react';
import { Layout, LogOut, Bell, Search, User, Menu } from 'lucide-react';
import { UserProfile } from '../../types';

interface ShellProps {
  children: React.ReactNode;
  profile: UserProfile | null;
  onLogout: () => void;
}

export const Shell: React.FC<ShellProps> = ({ children, profile, onLogout }) => {
  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#1D1D1D] font-sans">
      <header className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-[#E5E7EB] z-50 flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#FF0032] flex items-center justify-center rounded-lg">
            <div className="w-6 h-6 border-2 border-white rounded-sm" />
          </div>
          <h1 className="text-2xl font-black tracking-tightest uppercase text-[#FF0032]">
            МТС <span className="text-[#1D1D1D]">Навигатор</span>
          </h1>
        </div>
        
        <div className="flex-1 max-w-xl mx-8 relative hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A7A7A] w-5 h-5" />
          <input 
            type="text" 
            placeholder="Поиск навыков, курсов, ролей..." 
            className="w-full h-12 bg-[#F4F5F7] rounded-full pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FF0032]/20 transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-6">
          <button className="text-[#1D1D1D] hover:bg-[#F4F5F7] p-2.5 rounded-full transition-colors relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF0032] rounded-full border-2 border-white" />
          </button>
          <div className="h-10 w-px bg-[#E5E7EB]" />
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="text-right">
              <p className="text-sm font-bold leading-tight">{profile?.name || 'Пилот'}</p>
              <p className="text-[10px] text-[#7A7A7A] font-bold uppercase tracking-wider">Уровень {profile?.level || 1}</p>
            </div>
            <div className="w-11 h-11 bg-[#F4F5F7] rounded-2xl flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-[#FF0032] transition-all">
              <User className="text-[#7A7A7A] w-6 h-6" />
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20 lg:flex h-screen overflow-hidden">
        <nav className="w-24 bg-white border-r border-[#E5E7EB] flex-col items-center py-8 gap-8 hidden lg:flex">
          <NavItem icon={<Layout className="w-7 h-7" />} active />
          <NavItem icon={<Search className="w-7 h-7" />} />
          <NavItem icon={<Menu className="w-7 h-7" />} />
          <div className="mt-auto" onClick={onLogout} title="Выйти из системы">
            <NavItem icon={<LogOut className="w-7 h-7 text-[#7A7A7A]" />} />
          </div>
        </nav>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {children}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, active = false }: { icon: React.ReactNode; active?: boolean }) => (
  <button className={`p-4 rounded-2xl transition-all cursor-pointer ${
    active 
      ? 'bg-[#FF0032] text-white shadow-lg shadow-[#FF0032]/20' 
      : 'text-[#7A7A7A] hover:bg-[#F4F5F7] hover:text-[#1D1D1D]'
  }`}>
    {icon}
  </button>
);