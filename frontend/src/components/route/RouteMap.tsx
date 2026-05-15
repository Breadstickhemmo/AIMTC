import React from 'react';
import { motion } from 'motion/react';
import { Check, Play, FileText, HelpCircle, ArrowRight } from 'lucide-react';
import { RouteNode, NodeStatus } from '@/src/types';

interface RouteMapProps {
  nodes: RouteNode[];
  onNodeClick: (node: RouteNode) => void;
}

export const RouteMap: React.FC<RouteMapProps> = ({ nodes, onNodeClick }) => {
  return (
    <div className="relative w-full h-full min-h-150 overflow-hidden bg-white rounded-4xl p-12 border border-[#E5E7EB]">
      <div className="absolute top-8 left-10">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-[#1D1D1D]">Текущий трек: Архитектура UX</h2>
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path
          d={generateCurve(nodes)}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <motion.path
          d={generateCurve(nodes)}
          fill="none"
          stroke="#FF0032"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 0.34 }} // Mocking progress
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>

      {nodes.map((node, index) => (
        <motion.div
          id={`node-${node.id}`}
          key={node.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.15 }}
          className="absolute"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <div className="relative group cursor-pointer" onClick={() => onNodeClick(node)}>
            <div className={`w-11 h-11 rounded-full border-4 border-white flex items-center justify-center transition-all duration-300 z-10 relative ${
              node.status === NodeStatus.COMPLETED 
                ? 'bg-[#FF0032] text-white shadow-lg' 
                : node.status === NodeStatus.ACTIVE 
                  ? 'bg-[#FF0032] ring-8 ring-[#FF0032]/10' 
                  : 'bg-[#E5E7EB]'
            }`}>
              {node.status === NodeStatus.COMPLETED && (
                <Check className="w-5 h-5 stroke-4" />
              )}
              
              {node.status === NodeStatus.ACTIVE && (
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              )}
            </div>

            {node.status === NodeStatus.ACTIVE && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="absolute bottom-16 -left-24 w-64 bg-white rounded-4xl p-6 shadow-2xl z-20 border border-[#E5E7EB]"
              >
                <p className="text-[10px] font-black text-[#FF0032] uppercase mb-2 tracking-[0.2em]">Активное задание</p>
                <h3 className="text-sm font-black mb-1 text-[#1D1D1D] leading-tight-none">{node.title}</h3>
                <p className="text-xs font-bold text-[#7A7A7A] mb-5">{node.type} • осталось {node.estimatedTime}</p>
                <button className="w-full bg-[#FF0032] text-white font-black py-3 rounded-full text-[10px] uppercase tracking-widest hover:bg-[#E6002D] transition-colors">
                  ПРОДОЛЖИТЬ ОБУЧЕНИЕ
                </button>
              </motion.div>
            )}
            
            {node.status !== NodeStatus.ACTIVE && (
               <div className={`absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                 node.status === NodeStatus.COMPLETED 
                  ? 'bg-white text-[#1D1D1D] border-[#E5E7EB]' 
                  : 'bg-white/50 text-[#ADADAD] border-transparent'
               }`}>
                {node.title}
               </div>
            )}
          </div>
        </motion.div>
      ))}

      <div className="absolute bottom-10 right-10 bg-[#F4F5F7] p-6 rounded-4xl max-w-55 border border-transparent hover:border-[#E5E7EB] transition-all group">
        <p className="text-[10px] font-black uppercase opacity-40 mb-2 tracking-widest">Заблокированный бонус</p>
        <p className="text-xs font-bold leading-relaxed text-[#1D1D1D]">
          Пройди этот узел, чтобы открыть: <strong className="text-[#FF0032]">Стажировка в МТС</strong>
        </p>
      </div>
    </div>
  );
};

function generateCurve(nodes: RouteNode[]) {
  if (nodes.length < 2) return "";
  let d = `M ${nodes[0].x}% ${nodes[0].y}%`;
  for (let i = 1; i < nodes.length; i++) {
    d += ` L ${nodes[i].x}% ${nodes[i].y}%`;
  }
  return d;
}
