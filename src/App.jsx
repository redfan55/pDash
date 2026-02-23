import React, { useState, useEffect } from 'react';
import {
  Activity, Shield, Cpu, Truck, Camera, Stethoscope, Search, Car,
  X, Server, Layers, Network, Database, Terminal, ChevronRight, Info, Menu, Zap
} from 'lucide-react';

// --- Configuration Data ---
const STACK_LAYERS = [
  { id: 'software', title: "NVIDIA AI Software", subtitle: "NVIDIA AI Enterprise, NeMo, NIMs", color: "bg-green-500", glow: "shadow-[0_0_15px_rgba(34,197,94,0.3)]", borderColor: "border-green-500/50", icon: Terminal },
  { id: 'k8s', title: "Kubernetes Platform", subtitle: "Red Hat OpenShift / Rafay", color: "bg-blue-500", glow: "shadow-[0_0_15px_rgba(59,130,246,0.3)]", borderColor: "border-blue-500/50", icon: Layers },
  { id: 'networking', title: "Cisco AI Networking & Optics", subtitle: "Nexus Hyperfabric, Silicon One, 400G BiDi", color: "bg-purple-500", glow: "shadow-[0_0_15px_rgba(168,85,247,0.3)]", borderColor: "border-purple-500/50", icon: Network },
  { id: 'compute', title: "Cisco Compute with NVIDIA", subtitle: "UCS C885A / C845A M8 Servers", color: "bg-cyan-500", glow: "shadow-[0_0_15px_rgba(6,182,212,0.3)]", borderColor: "border-cyan-500/50", icon: Server },
  { id: 'storage', title: "Partner Storage", subtitle: "NetApp, Pure Storage, VAST Data", color: "bg-slate-400", glow: "shadow-[0_0_15px_rgba(148,163,184,0.3)]", borderColor: "border-slate-400/50", icon: Database }
];

const USE_CASES = [
  { id: 'healthcare', title: 'Personalized Healthcare', side: 'left', icon: Stethoscope, color: 'blue', desc: 'AI-driven patient diagnostics and personalized treatment plans using edge-to-cloud computing.' },
  { id: 'safety', title: 'Safety & Security', side: 'left', icon: Shield, color: 'cyan', desc: 'Real-time threat detection and automated emergency response powered by intelligent computer vision.' },
  { id: 'physical-ai', title: 'Physical AI', side: 'left', icon: Cpu, color: 'indigo', desc: 'Integrating machine learning into industrial robotics for autonomous manufacturing and assembly.' },
  { id: 'self-driving', title: 'Self Driving Vehicles', side: 'left', icon: Car, color: 'sky', desc: 'Processing massive sensor data at ultra-low latency for autonomous fleet navigation and safety.' },
  { id: 'drug-research', title: 'Drug Research', side: 'right', icon: Search, color: 'teal', desc: 'Accelerating molecular discovery through high-performance GPU-dense AI model training.' },
  { id: 'retail', title: 'Retail', side: 'right', icon: Activity, color: 'purple', desc: 'Optimizing supply chains and customer experiences with predictive behavioral analytics.' },
  { id: 'warehouse', title: 'Intelligent Warehouse', side: 'right', icon: Truck, color: 'violet', desc: 'Autonomous logistics and inventory management using computer vision and edge AI nodes.' },
  { id: 'defect-detection', title: 'Defect Detection', side: 'right', icon: Camera, color: 'blue', desc: 'Zero-tolerance quality control using high-speed visual inspection and real-time inference.' },
];

const SidebarItem = ({ label, active = false }) => (
  <div className={`group flex items-center gap-3 py-3 px-4 text-[10px] font-bold tracking-[0.2em] cursor-pointer transition-all duration-200 border-l-2 ${active ? 'bg-blue-600/10 text-blue-400 border-blue-500' : 'text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/5'}`}>
    {label.toUpperCase()}
  </div>
);

const UseCaseNode = ({ item, isSelected, onClick }) => {
  const isLeft = item.side === 'left';
  const Icon = item.icon;
  return (
    <div className={`group flex items-center gap-4 cursor-pointer pointer-events-auto transition-all duration-300 ${isLeft ? 'flex-row-reverse text-right' : 'flex-row text-left'}`} onClick={onClick}>
      <div className="hidden sm:block">
        <div className={`text-[10px] md:text-[11px] font-black tracking-widest transition-colors ${isSelected ? 'text-blue-400' : 'text-gray-500 group-hover:text-white'}`}>{item.title.toUpperCase()}</div>
      </div>
      <div className="relative">
        <div className={`absolute -inset-2 rounded-full border border-blue-500/0 transition-all duration-500 ${isSelected ? 'border-blue-500/40 scale-110 opacity-100' : 'group-hover:border-blue-500/20 opacity-0'}`} />
        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 transition-all duration-300 flex items-center justify-center bg-[#0a0f1d] z-10 ${isSelected ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-105' : 'border-gray-800 group-hover:border-gray-600'}`}>
          <div className="relative p-3 text-gray-400 group-hover:text-blue-300 transition-colors">
             <Icon className={`w-6 h-6 md:w-7 md:h-7 ${isSelected ? 'text-blue-400' : ''}`} />
             {isSelected && <div className="absolute inset-0 border border-blue-400/30 rounded-full animate-ping opacity-20" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [selectedUseCase, setSelectedUseCase] = useState(null);
  const [hoveredLayer, setHoveredLayer] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') setSelectedUseCase(null); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="flex h-screen bg-[#020617] text-slate-100 font-sans overflow-hidden select-none">
      <aside className={`relative z-40 bg-[#0a0f1d] border-r border-blue-900/20 transition-all duration-500 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-0 opacity-0 overflow-hidden'}`}>
        <div className="p-8 flex-1 flex flex-col min-w-[256px]">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-1 shadow-xl shadow-blue-500/10">
               <Zap className="w-6 h-6 text-blue-900" />
            </div>
            <span className="text-2xl font-black italic tracking-tighter text-white">CISCO</span>
          </div>
          <div className="space-y-4 mb-8">
            <button className="w-full flex items-center justify-between py-3 px-4 rounded-lg bg-[#111827] border border-blue-900/30 text-[10px] font-bold tracking-widest text-slate-400 hover:border-blue-500/50 transition-all">
              AI USE CASES <ChevronRight className="w-3 h-3 opacity-40" />
            </button>
            <button className="w-full py-3 px-4 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-[10px] font-bold tracking-widest text-white shadow-lg shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
              SECURE AI FACTORY
            </button>
          </div>
          <nav className="flex-1 space-y-1">
            {["Cisco Compute", "Nvidia AI Software", "Kubernetes Platform", "Cisco AI Networking", "Partner Storage", "Security", "Observability"].map((name, i) => (
              <SidebarItem key={i} label={name} active={i === 0} />
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 relative flex flex-col items-center justify-center p-4">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="absolute top-8 left-8 p-2 text-slate-500 hover:text-white transition-colors z-50 bg-[#0a0f1d] border border-white/10 rounded-lg">
          <Menu className="w-5 h-5" />
        </button>

        <div className="absolute top-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight">Cisco Secure AI Factory</h1>
          <p className="text-blue-400/60 font-mono text-[10px] tracking-[0.4em] uppercase mt-2 font-bold">High-Performance AI Infrastructure</p>
        </div>

        <div className="relative w-full max-w-7xl h-full flex items-center justify-center">
          <div className="absolute left-4 lg:left-16 flex flex-col justify-around h-[75%] z-20">
            {USE_CASES.filter(u => u.side === 'left').map(item => (
              <UseCaseNode key={item.id} item={item} isSelected={selectedUseCase?.id === item.id} onClick={() => setSelectedUseCase(item)} />
            ))}
          </div>

          <div className="relative z-10">
            <div className="w-72 sm:w-80 h-[520px] bg-[#0f172a] rounded-2xl border border-blue-500/30 p-3 flex flex-col gap-2 relative">
              {STACK_LAYERS.map((layer, idx) => {
                const LayerIcon = layer.icon;
                return (
                  <div key={layer.id} onMouseEnter={() => setHoveredLayer(idx)} onMouseLeave={() => setHoveredLayer(null)}
                    className={`flex-1 relative flex flex-col justify-center px-5 rounded-xl border transition-all duration-300 ${hoveredLayer === idx ? 'bg-[#1e293b] ' + layer.borderColor + ' ' + layer.glow + ' scale-[1.02]' : 'bg-[#1e293b]/40 border-white/5'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center border border-white/5"><LayerIcon className="w-4 h-4 text-blue-400" /></div>
                      <div>
                        <h4 className="text-[11px] font-black text-white tracking-widest uppercase">{layer.title}</h4>
                        <p className="text-[9px] text-slate-500 font-medium mt-1">{layer.subtitle}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="absolute right-4 lg:right-16 flex flex-col justify-around h-[75%] z-20">
            {USE_CASES.filter(u => u.side === 'right').map(item => (
              <UseCaseNode key={item.id} item={item} isSelected={selectedUseCase?.id === item.id} onClick={() => setSelectedUseCase(item)} />
            ))}
          </div>
        </div>

        {selectedUseCase && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-6">
            <div className="bg-[#0f172a] border border-blue-500/30 rounded-3xl w-full max-w-3xl overflow-hidden">
              <div className="p-8 border-b border-white/5 flex justify-between items-start">
                <h3 className="text-3xl font-black text-white">{selectedUseCase.title}</h3>
                <button onClick={() => setSelectedUseCase(null)} className="p-2 text-slate-400 hover:text-white"><X /></button>
              </div>
              <div className="p-10 text-slate-300 text-lg">{selectedUseCase.desc}</div>
              <div className="p-8 bg-[#0a0f1d] flex justify-end gap-4">
                 <button onClick={() => setSelectedUseCase(null)} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold">Close</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
