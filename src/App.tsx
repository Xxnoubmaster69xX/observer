import React, { useState } from "react";
import { FameHall } from "./components/FameHall";
import { DissectionRoom } from "./components/DissectionRoom";
import { TacticalCenter } from "./components/TacticalCenter";
import { ImplementationLibrary } from "./components/ImplementationLibrary";

export default function App() {
  const [activeTab, setActiveTab] = useState("fame");

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/30">
      <nav className="fixed top-0 left-0 right-0 h-16 border-b border-white/10 bg-black/80 backdrop-blur-md z-50 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 font-dot text-2xl tracking-widest uppercase">
            <div className="w-3 h-3 rounded-full bg-red-600 animate-[pulse_2s_ease-in-out_infinite]" />
            <span>OBSERVER</span>
          </div>
          <div className="hidden md:flex gap-2">
            <NavButton active={activeTab === "fame"} onClick={() => setActiveTab("fame")} label="[01] INFO" />
            <NavButton active={activeTab === "dissection"} onClick={() => setActiveTab("dissection")} label="[02] DISECCIÓN" />
            <NavButton active={activeTab === "tactical"} onClick={() => setActiveTab("tactical")} label="[03] TÁCTICO" />
            <NavButton active={activeTab === "library"} onClick={() => setActiveTab("library")} label="[04] CÓDIGO" />
          </div>
        </div>
        
        <div className="text-[10px] font-mono text-white/40 text-right leading-tight hidden sm:block">
          AUTHORS:<br/>
          <span className="text-white/80">DAVID EDUARDO LARA FLORES</span><br/>
          <span className="text-white/80">RAÚL FRANCISCO RAMÍREZ TIENDA</span>
        </div>
      </nav>
      
      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-white/10 bg-black/90 backdrop-blur-md z-50 flex justify-around p-3">
        <NavButton active={activeTab === "fame"} onClick={() => setActiveTab("fame")} label="[01]" />
        <NavButton active={activeTab === "dissection"} onClick={() => setActiveTab("dissection")} label="[02]" />
        <NavButton active={activeTab === "tactical"} onClick={() => setActiveTab("tactical")} label="[03]" />
        <NavButton active={activeTab === "library"} onClick={() => setActiveTab("library")} label="[04]" />
      </div>

      <main className="pt-16 pb-24 md:pb-0 min-h-screen">
        {activeTab === "fame" && <FameHall />}
        {activeTab === "dissection" && <DissectionRoom />}
        {activeTab === "tactical" && <TacticalCenter />}
        {activeTab === "library" && <ImplementationLibrary />}
      </main>
    </div>
  );
}

function NavButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string; }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-dot tracking-widest transition-all uppercase ${
        active
          ? "bg-white text-black"
          : "text-white/50 hover:text-white hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}
