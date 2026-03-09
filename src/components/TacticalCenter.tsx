import { useState } from "react";
import { motion } from "motion/react";
import {
  CheckCircle2,
  Database,
  Bell,
  Mail,
  ShoppingCart,
  Activity,
} from "lucide-react";

export function TacticalCenter() {
  const [isFixed, setIsFixed] = useState(false);
  const [connections, setConnections] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleNodeClick = (id: string) => {
    if (isFixed) return;

    if (!selectedNode) {
      if (id === "checkout") {
        setSelectedNode(id);
      }
    } else {
      if (id !== "checkout" && !connections.includes(id)) {
        const newConns = [...connections, id];
        setConnections(newConns);
        setSelectedNode(null);

        if (newConns.length === 3) {
          setTimeout(() => setIsFixed(true), 500);
        }
      } else {
        setSelectedNode(null);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between bg-white/5 p-6 rounded-[2rem] border border-white/10 gap-4">
        <div>
          <h2 className="text-3xl font-dot mb-2 uppercase">
            Simulador de Crisis
          </h2>
          <p className="text-white/50 max-w-2xl font-mono text-sm">
            Misión: El sistema colapsa por alto acoplamiento. El Checkout llama sincrónicamente a todos los servicios.
            <strong className="text-white">
              {" "}
              Haz clic en el Checkout y luego conecta los 3 Observadores.
            </strong>
          </p>
        </div>
        <div
          className={`px-4 py-2 rounded-full font-dot text-sm border shrink-0 uppercase tracking-widest ${isFixed ? "bg-white text-black border-white" : "bg-red-950/50 text-red-500 border-red-500/30 animate-pulse"}`}
        >
          {isFixed ? "[ SISTEMA ESTABLE ]" : "[ SISTEMA CRÍTICO ]"}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Interactive Canvas */}
        <div className="lg:col-span-2 bg-black border border-white/20 rounded-[2rem] p-8 relative min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />

          {!isFixed && (
            <div className="absolute inset-0 bg-red-500/5 pointer-events-none animate-pulse" />
          )}

          <div className="relative w-full max-w-lg aspect-square">
            {/* Subject (Center) */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all z-20 ${
                selectedNode === "checkout"
                  ? "ring-2 ring-white bg-white/10"
                  : "bg-black border border-white/50 hover:border-white"
              }`}
              onClick={() => handleNodeClick("checkout")}
            >
              <ShoppingCart
                className={`w-8 h-8 mb-2 ${isFixed ? "text-white" : "text-white/50"}`}
              />
              <span className="text-[10px] font-dot uppercase tracking-widest text-center">
                Checkout
                <br />
                (Sujeto)
              </span>

              {selectedNode === "checkout" && (
                <div className="absolute -top-10 text-[10px] text-white font-mono bg-black px-2 py-1 rounded border border-white/30 whitespace-nowrap">
                  Selecciona observador...
                </div>
              )}
            </div>

            {/* Observers */}
            <ObserverNode
              id="db"
              label="Inventario"
              icon={<Database />}
              position="top-0 left-1/2 -translate-x-1/2"
              isConnected={connections.includes("db")}
              onClick={() => handleNodeClick("db")}
              isFixed={isFixed}
            />
            <ObserverNode
              id="email"
              label="Email"
              icon={<Mail />}
              position="bottom-0 left-0"
              isConnected={connections.includes("email")}
              onClick={() => handleNodeClick("email")}
              isFixed={isFixed}
            />
            <ObserverNode
              id="push"
              label="Push"
              icon={<Bell />}
              position="bottom-0 right-0"
              isConnected={connections.includes("push")}
              onClick={() => handleNodeClick("push")}
              isFixed={isFixed}
            />

            {/* Connection Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              {connections.includes("db") && (
                <ConnectionLine
                  x1="50%"
                  y1="50%"
                  x2="50%"
                  y2="15%"
                  isFixed={isFixed}
                />
              )}
              {connections.includes("email") && (
                <ConnectionLine
                  x1="50%"
                  y1="50%"
                  x2="15%"
                  y2="85%"
                  isFixed={isFixed}
                />
              )}
              {connections.includes("push") && (
                <ConnectionLine
                  x1="50%"
                  y1="50%"
                  x2="85%"
                  y2="85%"
                  isFixed={isFixed}
                />
              )}
            </svg>
          </div>
        </div>

        {/* Metrics Panel */}
        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 flex flex-col">
          <h3 className="text-xl font-dot mb-8 flex items-center gap-3 uppercase">
            <Activity className="w-5 h-5 text-white/50" />
            Telemetría
          </h3>

          <div className="space-y-6 flex-1">
            <MetricCard
              label="Latencia"
              value={isFixed ? "45ms" : "2,450ms"}
              status={isFixed ? "good" : "bad"}
              desc={
                isFixed ? "Asíncrono (Rápido)" : "Bloqueado por dependencias"
              }
            />
            <MetricCard
              label="Memoria"
              value={isFixed ? "120MB" : "850MB"}
              status={isFixed ? "good" : "bad"}
              desc={
                isFixed ? "Instancias limpias" : "Hilos en espera (Bloqueados)"
              }
            />
            <MetricCard
              label="Acoplamiento"
              value={isFixed ? "Bajo" : "Alto"}
              status={isFixed ? "good" : "bad"}
              desc={
                isFixed
                  ? "Patrón Observer activo"
                  : "Llamadas directas hardcodeadas"
              }
            />
          </div>

          {isFixed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-white text-black border border-white/20 rounded-2xl flex items-start gap-4"
            >
              <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-dot text-lg uppercase mb-1">
                  Arquitectura Estabilizada
                </h4>
                <p className="text-xs font-mono opacity-70 leading-relaxed">
                  Al usar Observer, el Checkout ya no espera a que los emails o
                  notificaciones se envíen. Solo emite un evento
                  "CompraRealizada" y continúa.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function ObserverNode({
  label,
  icon,
  position,
  isConnected,
  onClick,
  isFixed,
}: any) {
  return (
    <div
      className={`absolute ${position} w-24 h-24 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all z-20 ${
        isConnected
          ? "bg-black border border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          : "bg-black border border-white/20 hover:border-white/50"
      }`}
      onClick={onClick}
    >
      <div
        className={`mb-2 ${isConnected ? "text-white" : "text-white/30"}`}
      >
        {icon}
      </div>
      <span className="text-[10px] font-dot uppercase tracking-widest text-center leading-tight text-white/70">
        {label}
      </span>
      {isConnected && !isFixed && (
        <div className="absolute -bottom-2 w-2 h-2 bg-white rounded-full animate-ping" />
      )}
    </div>
  );
}

function ConnectionLine({ x1, y1, x2, y2, isFixed }: any) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#ffffff"
        strokeOpacity="0.2"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      {isFixed && (
        <circle r="3" fill="#ffffff">
          <animateMotion
            dur="1.5s"
            repeatCount="indefinite"
            path={`M ${x1} ${y1} L ${x2} ${y2}`}
          />
        </circle>
      )}
    </g>
  );
}

function MetricCard({ label, value, status, desc }: any) {
  return (
    <div className="p-5 rounded-2xl bg-black border border-white/10">
      <div className="text-[10px] text-white/40 font-dot uppercase tracking-widest mb-2">
        {label}
      </div>
      <div
        className={`text-3xl font-dot mb-1 ${status === "good" ? "text-white" : "text-red-500"}`}
      >
        {value}
      </div>
      <div className="text-xs font-mono text-white/40">{desc}</div>
    </div>
  );
}
