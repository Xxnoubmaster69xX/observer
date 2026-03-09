import React, { useState } from "react";
import { motion } from "motion/react";
import {
  MessageCircle,
  TrendingUp,
  Home,
  AlertTriangle,
  ArrowRight,
  Server,
  Smartphone,
  Activity,
} from "lucide-react";

export function DissectionRoom() {
  const [activeTab, setActiveTab] = useState("whatsapp");
  const [showAntiPattern, setShowAntiPattern] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0 space-y-8">
          <div>
            <h3 className="text-xs font-dot text-white/40 uppercase tracking-widest mb-4">
              [ RADIOGRAFÍAS ]
            </h3>
            <div className="space-y-2">
              <SidebarBtn
                active={activeTab === "whatsapp" && !showAntiPattern}
                onClick={() => {
                  setActiveTab("whatsapp");
                  setShowAntiPattern(false);
                }}
                icon={<MessageCircle />}
                label="Mensajería"
              />
              <SidebarBtn
                active={activeTab === "stock" && !showAntiPattern}
                onClick={() => {
                  setActiveTab("stock");
                  setShowAntiPattern(false);
                }}
                icon={<TrendingUp />}
                label="Bolsa"
              />
              <SidebarBtn
                active={activeTab === "home" && !showAntiPattern}
                onClick={() => {
                  setActiveTab("home");
                  setShowAntiPattern(false);
                }}
                icon={<Home />}
                label="Smart Home"
              />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-dot text-red-500 uppercase tracking-widest mb-4">
              [ ANTI-PATRÓN ]
            </h3>
            <SidebarBtn
              active={showAntiPattern}
              onClick={() => setShowAntiPattern(true)}
              icon={<AlertTriangle className="text-red-500" />}
              label="Polling Lab"
              className="hover:bg-red-950/30 hover:text-red-500"
              activeClass="bg-red-950/30 text-red-500 border-red-900/50"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white/5 border border-white/10 rounded-[2rem] p-8 min-h-[600px] flex flex-col">
          {!showAntiPattern ? (
            <RadiographyView type={activeTab} />
          ) : (
            <AntiPatternLab />
          )}
        </div>
      </div>
    </div>
  );
}

function SidebarBtn({
  active,
  onClick,
  icon,
  label,
  className = "",
  activeClass = "bg-white text-black border-white",
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  className?: string;
  activeClass?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-5 py-3 rounded-full border transition-all text-left font-dot uppercase tracking-wider ${
        active
          ? activeClass
          : `border-transparent text-white/50 hover:bg-white/10 hover:text-white ${className}`
      }`}
    >
      <div className="w-5 h-5">{icon}</div>
      <span className="text-sm">{label}</span>
    </button>
  );
}

function RadiographyView({ type }: { type: string }) {
  const data: Record<string, any> = {
    whatsapp: {
      title: "Mensajería",
      subject: "WebSockets",
      subjectDesc: "Recibe mensaje del servidor.",
      observers: [
        {
          name: "Lista de Chats",
          desc: "Actualiza último mensaje.",
        },
        {
          name: "Chat Activo",
          desc: "Añade burbuja.",
        },
        {
          name: "Badge",
          desc: "Incrementa contador rojo.",
        },
        {
          name: "Push",
          desc: "Muestra banner superior.",
        },
      ],
    },
    stock: {
      title: "Bolsa de Valores",
      subject: "Feed de Precios",
      subjectDesc: "Recibe actualizaciones en tiempo real.",
      observers: [
        {
          name: "Gráfico",
          desc: "Dibuja nueva vela.",
        },
        {
          name: "Ticker",
          desc: "Actualiza precio en barra.",
        },
        {
          name: "Alerta",
          desc: "Dispara sonido.",
        },
        {
          name: "Portafolio",
          desc: "Recalcula valor total.",
        },
      ],
    },
    home: {
      title: "Smart Home",
      subject: "Sensor Movimiento",
      subjectDesc: "Detecta presencia.",
      observers: [
        { name: "Luces", desc: "Encienden al 50%." },
        {
          name: "Cámara",
          desc: "Inicia grabación.",
        },
        {
          name: "Termostato",
          desc: "Ajusta temperatura.",
        },
        {
          name: "App",
          desc: "Registra evento.",
        },
      ],
    },
  };

  const current = data[type];

  return (
    <div className="flex-1 flex flex-col">
      <div className="mb-12">
        <h2 className="text-4xl font-dot mb-2 uppercase">{current.title}</h2>
        <p className="text-white/50 font-mono text-sm">
          Radiografía de dependencias Observer.
        </p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Subject */}
        <div className="relative w-64 p-8 rounded-[2rem] border border-white bg-white text-black text-center z-10">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black px-3 py-1 text-[10px] font-dot text-white border border-white rounded-full whitespace-nowrap uppercase tracking-widest">
            SUJETO
          </div>
          <div className="w-16 h-16 mx-auto border border-black/20 rounded-full flex items-center justify-center mb-4">
            <Activity className="w-8 h-8" />
          </div>
          <h4 className="font-dot text-xl mb-2 uppercase">{current.subject}</h4>
          <p className="text-xs font-mono opacity-70">{current.subjectDesc}</p>
        </div>

        {/* Arrows */}
        <div className="hidden md:flex flex-col justify-between h-64 w-24 relative">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute left-0 w-full flex items-center"
              style={{ top: `${i * 33.33}%`, transform: "translateY(-50%)" }}
            >
              <div className="h-px w-full bg-white/20 relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 w-1/2 h-full bg-white"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "linear",
                    delay: i * 0.2,
                  }}
                />
              </div>
              <ArrowRight className="w-4 h-4 text-white/50 absolute right-0 -translate-y-1/2 top-1/2 translate-x-1/2" />
            </div>
          ))}
        </div>

        {/* Observers */}
        <div className="flex flex-col gap-4 w-full md:w-72">
          {current.observers.map((obs: any, i: number) => (
            <div
              key={i}
              className="relative p-5 rounded-2xl border border-white/20 bg-black flex items-start gap-4"
            >
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-black border border-white rounded-full flex items-center justify-center text-[10px] font-dot text-white">
                {i + 1}
              </div>
              <div>
                <h5 className="font-dot text-lg uppercase mb-1">
                  {obs.name}
                </h5>
                <p className="text-xs font-mono text-white/50">{obs.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AntiPatternLab() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="mb-8">
        <h2 className="text-4xl font-dot mb-2 text-red-500 uppercase">
          Polling
        </h2>
        <p className="text-white/50 font-mono text-sm">
          Preguntar constantemente vs Recibir notificaciones.
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Polling (Bad) */}
        <div className="p-8 rounded-[2rem] border border-red-900/50 bg-red-950/10 flex flex-col items-center">
          <h3 className="text-sm font-dot text-red-500 mb-8 uppercase tracking-widest">
            [ SIN OBSERVER ]
          </h3>

          <div className="relative w-full flex-1 flex flex-col items-center justify-between">
            <div className="w-20 h-20 rounded-full border border-red-500 flex items-center justify-center relative bg-black z-10">
              <Server className="w-8 h-8 text-red-500" />
              <motion.div
                className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              />
            </div>

            <div className="flex justify-center gap-8 w-full mt-16">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black z-10">
                    <Smartphone className="w-5 h-5 text-white/50" />
                  </div>
                  {/* Polling Arrows going UP */}
                  <div className="absolute bottom-full mb-2 h-24 w-px bg-red-500/20 border-l border-dashed border-red-500/30">
                    <motion.div
                      className="absolute bottom-0 w-2 h-2 -ml-[4.5px] bg-red-500 rounded-full"
                      animate={{ y: [0, -96] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.5,
                        delay: i * 0.1,
                      }}
                    />
                  </div>
                  <div className="mt-3 text-[10px] text-white/40 font-dot uppercase tracking-widest">
                    ¿Datos?
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center w-full">
            <div className="text-red-500 font-dot text-3xl mb-1">99% CPU</div>
            <div className="text-xs font-mono text-red-500/70">
              Sobrecarga por peticiones inútiles.
            </div>
          </div>
        </div>

        {/* Observer (Good) */}
        <div className="p-8 rounded-[2rem] border border-white/20 bg-white/5 flex flex-col items-center">
          <h3 className="text-sm font-dot text-white mb-8 uppercase tracking-widest">
            [ CON OBSERVER ]
          </h3>

          <div className="relative w-full flex-1 flex flex-col items-center justify-between">
            <div className="w-20 h-20 rounded-full border border-white flex items-center justify-center relative bg-white text-black z-10">
              <Server className="w-8 h-8" />
            </div>

            <div className="flex justify-center gap-8 w-full mt-16">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black z-10">
                    <Smartphone className="w-5 h-5 text-white/50" />
                  </div>
                  {/* Push Arrows going DOWN */}
                  <div className="absolute bottom-full mb-2 h-24 w-px bg-white/10">
                    <motion.div
                      className="absolute top-0 w-2 h-2 -ml-[3.5px] bg-white rounded-full"
                      animate={{ y: [0, 96], opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                    />
                  </div>
                  <div className="mt-3 text-[10px] text-white/40 font-dot uppercase tracking-widest">
                    Espera
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center w-full">
            <div className="text-white font-dot text-3xl mb-1">
              2% CPU
            </div>
            <div className="text-xs font-mono text-white/50">
              Envío solo cuando hay cambios.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
