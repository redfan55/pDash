import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Activity, Shield, Cpu, Truck, Camera, Stethoscope, Search, Car,
  X, Server, Layers, Network, Database, Terminal, Zap, ArrowRight,
  Lock, Eye, Box
} from 'lucide-react';

// --- Configuration Data ---

const STACK_LAYERS = [
  {
    id: 'software',
    title: "NVIDIA AI Software",
    subtitle: "NVIDIA AI Enterprise, NeMo, NIMs",
    color: "bg-green-500",
    glow: "shadow-[0_0_15px_rgba(34,197,94,0.3)]",
    borderColor: "border-green-500/50",
    icon: <Terminal className="w-4 h-4 text-green-400" />
  },
  {
    id: 'k8s',
    title: "Kubernetes Platform",
    subtitle: "Red Hat OpenShift / Rafay",
    color: "bg-blue-500",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    borderColor: "border-blue-500/50",
    icon: <Layers className="w-4 h-4 text-blue-400" />
  },
  {
    id: 'networking',
    title: "Cisco AI Networking & Optics",
    subtitle: "Nexus Hyperfabric, Silicon One, 400G BiDi",
    color: "bg-purple-500",
    glow: "shadow-[0_0_15px_rgba(168,85,247,0.3)]",
    borderColor: "border-purple-500/50",
    icon: <Network className="w-4 h-4 text-purple-400" />
  },
  {
    id: 'compute',
    title: "Cisco Compute with NVIDIA",
    subtitle: "UCS C885A / C845A M8 Servers",
    color: "bg-cyan-500",
    glow: "shadow-[0_0_15px_rgba(6,182,212,0.3)]",
    borderColor: "border-cyan-500/50",
    icon: <Server className="w-4 h-4 text-cyan-400" />
  },
  {
    id: 'storage',
    title: "Partner Storage",
    subtitle: "NetApp, Pure Storage, VAST Data",
    color: "bg-slate-400",
    glow: "shadow-[0_0_15px_rgba(148,163,184,0.3)]",
    borderColor: "border-slate-400/50",
    icon: <Database className="w-4 h-4 text-slate-400" />
  }
];

const USE_CASES = [
  { id: 'healthcare', title: 'Personalized Healthcare', side: 'left', icon: <Stethoscope />, color: 'blue', desc: 'AI-driven patient diagnostics and personalized treatment plans using edge-to-cloud computing.' },
  { id: 'safety', title: 'Safety & Security', side: 'left', icon: <Shield />, color: 'cyan', desc: 'Real-time threat detection and automated emergency response powered by intelligent computer vision.' },
  { id: 'physical-ai', title: 'Physical AI', side: 'left', icon: <Cpu />, color: 'indigo', desc: 'Integrating machine learning into industrial robotics for autonomous manufacturing and assembly.' },
  { id: 'self-driving', title: 'Self Driving Vehicles', side: 'left', icon: <Car />, color: 'sky', desc: 'Processing massive sensor data at ultra-low latency for autonomous fleet navigation and safety.' },
  { id: 'drug-research', title: 'Drug Research', side: 'right', icon: <Search />, color: 'teal', desc: 'Accelerating molecular discovery through high-performance GPU-dense AI model training.' },
  { id: 'retail', title: 'Retail', side: 'right', icon: <Activity />, color: 'purple', desc: 'Optimizing supply chains and customer experiences with predictive behavioral analytics.' },
  { id: 'warehouse', title: 'Intelligent Warehouse', side: 'right', icon: <Truck />, color: 'violet', desc: 'Autonomous logistics and inventory management using computer vision and edge AI nodes.' },
  { id: 'defect-detection', title: 'Defect Detection', side: 'right', icon: <Camera />, color: 'blue', desc: 'Zero-tolerance quality control using high-speed visual inspection and real-time inference.' },
];

// --- Sub-Components ---

const SidebarItem = ({ label, active = false }) => (
  <div className={`group flex items-center gap-3 py-3 px-4 text-[10px] font-bold tracking-[0.2em] cursor-pointer transition-all duration-200 border-l-2 ${active ? 'bg-blue-600/10 text-blue-400 border-blue-500' : 'text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/5'}`}>
    {label.toUpperCase()}
  </div>
);

const UseCaseNode = ({ item, isSelected, onClick }) => {
  const isLeft = item.side === 'left';
  return (
    <div 
      className={`group flex items-center gap-4 cursor-pointer pointer-events-auto transition-all duration-300 ${isLeft ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
      onClick={onClick}
    >
      <div className="hidden sm:block">
        <div className={`text-[10px] md:text-[11px] font-black tracking-widest transition-colors ${isSelected ? 'text-blue-400' : 'text-gray-500 group-hover:text-white'}`}>
          {item.title.toUpperCase()}
        </div>
      </div>
      
      <div className="relative">
        {/* Animated Rings */}
        <div className={`absolute -inset-2 rounded-full border border-blue-500/0 transition-all duration-500 ${isSelected ? 'border-blue-500/40 scale-110 opacity-100' : 'group-hover:border-blue-500/20 opacity-0'}`} />
        
        {/* Main Node */}
        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 transition-all duration-300 flex items-center justify-center bg-[#0a0f1d] z-10 
          ${isSelected ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-105' : 'border-gray-800 group-hover:border-gray-600'}`}>
          <div className="relative p-3 text-gray-400 group-hover:text-blue-300 transition-colors">
             {React.cloneElement(item.icon, { className: `w-6 h-6 md:w-7 md:h-7 ${isSelected ? 'text-blue-400' : ''}` })}
             {isSelected && (
               <div className="absolute inset-0 border border-blue-400/30 rounded-full animate-ping opacity-20" />
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [selectedUseCase, setSelectedUseCase] = useState(null);
  const [hoveredLayer, setHoveredLayer] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedUseCase(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="flex h-screen bg-[#020617] text-slate-100 font-sans overflow-hidden select-none">
      
      {/* 1. Sidebar */}
      <aside className={`relative z-40 bg-[#0a0f1d] border-r border-blue-900/20 transition-all duration-500 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-0 opacity-0 overflow-hidden'}`}>
        <div className="p-8 flex-1 flex flex-col min-w-[256px]">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-1 shadow-xl shadow-blue-500/10">
               <svg viewBox="0 0 24 24" className="w-full h-full fill-blue-900">
                  <path d="M12,2C6.47,2,2,6.47,2,12s4.47,10,10,10,10-4.47,10-10S17.53,2,12,2ZM18,17l-3-2V9l3-2V17ZM6,17V7l3,2v6l-3,2ZM12,18l-3-1V7l3-1,3,1v10l-3,1Z" />
               </svg>
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
          
          <div className="mt-auto pt-6 border-t border-white/5">
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center">
                <Info className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-[10px] text-slate-500">
                <p className="font-bold">System Status</p>
                <p className="text-green-500">All Systems Operational</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Main Stage */}
      <main className="flex-1 relative flex flex-col items-center justify-center p-4 bg-radial-gradient from-[#0f172a] to-[#020617]">
        
        {/* Toggle Sidebar Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-8 left-8 p-2 text-slate-500 hover:text-white transition-colors z-50 bg-[#0a0f1d] border border-white/10 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Header */}
        <div className="absolute top-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-2xl">
            Cisco Secure AI Factory
          </h1>
          <p className="text-blue-400/60 font-mono text-[10px] tracking-[0.4em] uppercase mt-2 font-bold">
            High-Performance AI Infrastructure
          </p>
        </div>

        <div className="relative w-full max-w-7xl h-full flex items-center justify-center">
          
          {/* Use Cases - Left Side */}
          <div className="absolute left-4 lg:left-16 flex flex-col justify-around h-[75%] z-20">
            {USE_CASES.filter(u => u.side === 'left').map(item => (
              <UseCaseNode 
                key={item.id} 
                item={item} 
                isSelected={selectedUseCase?.id === item.id}
                onClick={() => setSelectedUseCase(item)} 
              />
            ))}
          </div>

          {/* Central Layered Stack */}
          <div className="relative z-10">
            <div className="w-72 sm:w-80 h-[520px] bg-[#0f172a] rounded-2xl border border-blue-500/30 p-3 flex flex-col gap-2 shadow-[0_0_80px_rgba(59,130,246,0.1)] relative group">
              {/* Glass Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-white/5 rounded-2xl pointer-events-none" />
              
              {STACK_LAYERS.map((layer, idx) => (
                <div 
                  key={layer.id}
                  onMouseEnter={() => setHoveredLayer(idx)}
                  onMouseLeave={() => setHoveredLayer(null)}
                  className={`flex-1 relative group/layer flex flex-col justify-center px-5 rounded-xl border transition-all duration-300 cursor-help
                    ${hoveredLayer === idx ? 'bg-[#1e293b] ' + layer.borderColor + ' ' + layer.glow + ' scale-[1.02]' : 'bg-[#1e293b]/40 border-white/5'}
                  `}
                >
                  <div className={`absolute left-0 top-4 bottom-4 w-1.5 rounded-r-full transition-all ${layer.color} ${hoveredLayer === idx ? 'opacity-100 shadow-[0_0_8px_currentColor]' : 'opacity-40'}`} />
                  
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center border border-white/5 group-hover/layer:border-white/20 transition-all">
                      {layer.icon}
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-white tracking-widest uppercase leading-tight">
                        {layer.title}
                      </h4>
                      <p className="text-[9px] text-slate-500 font-medium leading-tight mt-1 max-w-[180px] group-hover/layer:text-slate-300 transition-colors">
                        {layer.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  {/* Active Pulse Point */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    <div className={`w-1 h-1 rounded-full ${layer.color} animate-pulse`} />
                    <div className="w-2 h-0.5 bg-slate-700 rounded-full" />
                  </div>
                </div>
              ))}

              {/* Bottom Exhaust Detail */}
              <div className="h-6 flex flex-col justify-center gap-1 px-8 opacity-20">
                <div className="h-px w-full bg-blue-400" />
                <div className="h-px w-full bg-blue-400" />
              </div>
            </div>
            
            {/* Ground Shadow/Reflection */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[120%] h-12 bg-blue-600/5 blur-2xl rounded-[100%]" />
          </div>

          {/* Use Cases - Right Side */}
          <div className="absolute right-4 lg:right-16 flex flex-col justify-around h-[75%] z-20">
            {USE_CASES.filter(u => u.side === 'right').map(item => (
              <UseCaseNode 
                key={item.id} 
                item={item} 
                isSelected={selectedUseCase?.id === item.id}
                onClick={() => setSelectedUseCase(item)} 
              />
            ))}
          </div>

          {/* SVG Connector Lines (Only visible on large screens) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 hidden lg:block">
             <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {USE_CASES.map((item, i) => {
              const yPos = 12.5 + (i % 4) * 25;
              const isLeft = item.side === 'left';
              const x1 = isLeft ? '25%' : '75%';
              const x2 = isLeft ? '40%' : '60%';
              return (
                <line 
                  key={item.id}
                  x1={x1} y1={`${yPos}%`} 
                  x2={x2} y2={`${yPos}%`} 
                  stroke={selectedUseCase?.id === item.id ? "url(#lineGrad)" : "#1e293b"} 
                  strokeWidth={selectedUseCase?.id === item.id ? "2" : "1"}
                  strokeDasharray={selectedUseCase?.id === item.id ? "0" : "4 4"}
                  className="transition-all duration-700"
                />
              );
            })}
          </svg>
        </div>

        {/* 3. Detail Overlay Modal */}
        {selectedUseCase && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-6 transition-all animate-in fade-in duration-300">
            <div className="bg-[#0f172a] border border-blue-500/30 rounded-3xl w-full max-w-3xl shadow-[0_0_100px_rgba(59,130,246,0.1)] overflow-hidden animate-in zoom-in duration-300">
              
              {/* Modal Header */}
              <div className="p-8 border-b border-white/5 flex justify-between items-start bg-gradient-to-br from-blue-900/20 to-transparent">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-inner">
                    {React.cloneElement(selectedUseCase.icon, { className: "w-8 h-8" })}
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white tracking-tight">{selectedUseCase.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] text-blue-400/80 font-bold uppercase tracking-widest">Active Simulation Node</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedUseCase(null)}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all border border-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-10 grid md:grid-cols-5 gap-10">
                <div className="md:col-span-3">
                  <h4 className="text-xs font-black text-slate-500 mb-4 uppercase tracking-[0.2em]">Abstract</h4>
                  <p className="text-slate-300 text-lg leading-relaxed mb-8">
                    {selectedUseCase.desc}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-black/20 border border-white/5">
                      <p className="text-[10px] font-bold text-blue-500 uppercase mb-1">Latency</p>
                      <p className="text-xl font-bold text-white">&lt; 2.5ms</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-black/20 border border-white/5">
                      <p className="text-[10px] font-bold text-blue-500 uppercase mb-1">Throughput</p>
                      <p className="text-xl font-bold text-white">400 Gbps</p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                   <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Stack Alignment</h4>
                   <div className="space-y-3">
                      {STACK_LAYERS.map((layer, i) => (
                        <div key={i} className="flex items-center gap-4 group/item">
                          <div className={`w-1 h-8 rounded-full ${layer.color} opacity-40 group-hover/item:opacity-100 transition-opacity`} />
                          <div>
                            <p className="text-[10px] font-bold text-slate-200">{layer.title}</p>
                            <p className="text-[9px] text-slate-500 italic">Optimized Path Ready</p>
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 bg-[#0a0f1d] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[10px] text-slate-500 font-mono">ARCH_REF: CISCO_AI_FACTORY_{selectedUseCase.id.toUpperCase()}_01</p>
                <div className="flex gap-4 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none px-8 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold text-white transition-all border border-white/10">
                    Whitepaper
                  </button>
                  <button className="flex-1 sm:flex-none px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold text-white transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                    Launch Sandbox
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 4. Background Ambience Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[30%] h-[30%] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] right-[5%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] contrast-150" />
      </div>

    </div>
  );
}
