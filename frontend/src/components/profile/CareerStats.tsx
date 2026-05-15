import React from 'react';
import { Target, Trophy, TrendingUp, Zap } from 'lucide-react';
import { UserProfile } from '@/src/types';

interface CareerStatsProps {
  profile: UserProfile;
}

export const CareerStats: React.FC<CareerStatsProps> = ({ profile }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white rounded-4xl p-8 flex flex-col justify-between border border-[#E5E7EB]">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-black leading-none mb-3 uppercase">{profile.name.split(' ')[0]} {profile.name.split(' ')[1]?.[0]}.</h2>
            <p className="text-[#7A7A7A] font-bold uppercase text-xs tracking-[0.2em]">Уровень Пилота {profile.level} • {profile.role}</p>
          </div>
          <div className="bg-[#F4F5F7] px-5 py-2.5 rounded-full text-[10px] font-black tracking-widest text-[#1D1D1D]">
            {profile.progress}% ДО ЦЕЛИ
          </div>
        </div>
        <div className="mt-8">
          <div className="w-full h-3 bg-[#F4F5F7] rounded-full overflow-hidden">
            <div className="h-full bg-[#FF0032]" style={{ width: `${profile.progress}%` }} />
          </div>
          <div className="flex justify-between mt-3 text-[10px] font-black text-[#7A7A7A] uppercase tracking-wider">
            <span>Младший спец</span>
            <span className="text-[#FF0032]">{profile.targetRole}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-4xl p-8 flex flex-col items-center justify-center text-center border border-[#E5E7EB]">
        <div className="text-6xl font-black text-[#FF0032] mb-2">0{profile.skills.filter(s => s.level > 70).length}</div>
        <div className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-4">Навыков открыто</div>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i} 
              className={`w-8 h-1.5 rounded-full ${i <= 3 ? 'bg-[#FF0032]' : 'bg-[#E5E7EB]'}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};
