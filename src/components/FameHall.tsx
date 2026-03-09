import React from "react";
import { motion } from "motion/react";
import { Clock, Tv, Smartphone, Server, Zap, CheckCircle2, XCircle, Network, Cpu, Share2 } from "lucide-react";

export function FameHall() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-32">
      {/* Hero */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/20 text-xs font-mono mb-8 uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
            Patrón de Comportamiento
          </div>
          <h1 className="text-6xl md:text-8xl font-dot tracking-tighter mb-6 uppercase">
            OBSERVER
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-16 font-mono leading-relaxed">
            Mecanismo de suscripción para notificar a múltiples objetos sobre cualquier evento. El latido invisible del software moderno.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-4xl">
          <div className="flex-1 flex flex-col items-center">
            <h3 className="text-white/40 mb-4 font-dot text-sm uppercase tracking-widest">
              [ CAOS / ACOPLAMIENTO ]
            </h3>
            <SpaghettiVisual />
          </div>
          <div className="hidden md:block text-white/20">
            <Zap className="w-8 h-8" />
          </div>
          <div className="flex-1 flex flex-col items-center">
            <h3 className="text-white mb-4 font-dot text-sm uppercase tracking-widest">
              [ ORDEN / OBSERVER ]
            </h3>
            <ObserverVisual />
          </div>
        </div>
      </section>

      {/* Funcionamiento Teórico */}
      <section className="py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-dot mb-4 uppercase">Anatomía</h2>
          <p className="text-white/50 max-w-2xl mx-auto font-mono text-sm">
            Relación 1:N. Cuando el estado cambia, los dependientes son notificados automáticamente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-6">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-dot mb-4 uppercase">El Sujeto</h3>
            <p className="text-white/50 text-sm font-mono leading-relaxed mb-6">
              Dueño del estado principal. Mantiene una lista de observadores y les avisa de cambios.
            </p>
            <ul className="space-y-4 text-sm font-mono text-white/80">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-white mt-1.5 shrink-0" />
                <span><strong className="text-white">Attach:</strong> Añade observador.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-white/50 mt-1.5 shrink-0" />
                <span><strong className="text-white">Detach:</strong> Elimina observador.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-600 mt-1.5 shrink-0" />
                <span><strong className="text-white">Notify:</strong> Llama a update() en todos.</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-6">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-dot mb-4 uppercase">El Observador</h3>
            <p className="text-white/50 text-sm font-mono leading-relaxed mb-6">
              Reacciona a los cambios. Implementa una interfaz común para ser llamado ciegamente.
            </p>
            <ul className="space-y-4 text-sm font-mono text-white/80">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-white mt-1.5 shrink-0" />
                <span><strong className="text-white">Update:</strong> Recibe el nuevo estado.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-white/50 mt-1.5 shrink-0" />
                <span><strong className="text-white">Independencia:</strong> Ignora a otros observadores.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pros y Contras */}
      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-[2rem] border border-white/20 bg-white text-black">
            <h3 className="text-2xl font-dot mb-6 flex items-center gap-3 uppercase">
              <CheckCircle2 className="w-6 h-6" /> Pros
            </h3>
            <ul className="space-y-4 text-sm font-mono text-black/70">
              <li><strong className="text-black">OCP:</strong> Añade observadores sin cambiar el Sujeto.</li>
              <li><strong className="text-black">Dinámico:</strong> Conecta/desconecta en runtime.</li>
              <li><strong className="text-black">Desacoplado:</strong> Operan independientemente.</li>
            </ul>
          </div>
          <div className="p-8 rounded-[2rem] border border-white/20 bg-black">
            <h3 className="text-2xl font-dot mb-6 flex items-center gap-3 uppercase">
              <XCircle className="w-6 h-6 text-red-600" /> Contras
            </h3>
            <ul className="space-y-4 text-sm font-mono text-white/60">
              <li><strong className="text-white">Fugas de Memoria:</strong> Lapsed listeners si no se desuscriben.</li>
              <li><strong className="text-white">Orden:</strong> Notificación en orden impredecible.</li>
              <li><strong className="text-white">Cascadas:</strong> Reacciones en cadena difíciles de depurar.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-dot mb-4 uppercase">Timeline</h2>
        </div>
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-white/20">
          <TimelineItem year="1979" title="Smalltalk & MVC" desc="Trygve Reenskaug inventa MVC. El 'Modelo' notifica a las 'Vistas'." />
          <TimelineItem year="1994" title="Gang of Four" desc="Formalizado en 'Design Patterns' para OOP (C++, Java)." />
          <TimelineItem year="2009" title="Node.js" desc="EventEmitter hace el patrón asíncrono por defecto en JS." />
          <TimelineItem year="2010s" title="Era Reactiva" desc="RxJS y React. Observables y renderizado basado en estado." />
        </div>
      </section>

      {/* Monumentos */}
      <section className="py-12">
        <h2 className="text-4xl font-dot mb-12 text-center uppercase">En la Industria</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MonumentCard icon={<Tv />} title="Netflix" desc="UI reacciona al estado global del reproductor." />
          <MonumentCard icon={<Smartphone />} title="WhatsApp" desc="WebSockets notifican a chats, badges y push a la vez." />
          <MonumentCard icon={<Server />} title="AWS" desc="Eventos (S3) disparan múltiples Lambdas asíncronamente." />
        </div>
      </section>
    </div>
  );
}

function SpaghettiVisual() {
  return (
    <div className="relative w-64 h-64 border border-white/10 rounded-full bg-white/5 flex items-center justify-center overflow-hidden">
      <svg className="absolute inset-0 w-full h-full stroke-white/20" strokeWidth="1" fill="none">
        <path d="M 30 30 Q 100 150 200 50 T 50 200 Q 150 100 220 220 T 30 100" />
        <path d="M 200 200 Q 50 50 150 20 T 20 150 Q 100 250 220 100" />
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white/40 rounded-full" />
    </div>
  );
}

function ObserverVisual() {
  return (
    <div className="relative w-64 h-64 border border-white/30 rounded-full bg-white/5 flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full stroke-white/30" strokeWidth="1" strokeDasharray="4 4" fill="none">
        <line x1="128" y1="128" x2="64" y2="64" />
        <line x1="128" y1="128" x2="192" y2="64" />
        <line x1="128" y1="128" x2="64" y2="192" />
        <line x1="128" y1="128" x2="192" y2="192" />
      </svg>
      <div className="absolute top-[56px] left-[56px] w-2 h-2 bg-white rounded-full" />
      <div className="absolute top-[56px] right-[56px] w-2 h-2 bg-white rounded-full" />
      <div className="absolute bottom-[56px] left-[56px] w-2 h-2 bg-white rounded-full" />
      <div className="absolute bottom-[56px] right-[56px] w-2 h-2 bg-white rounded-full" />

      <div className="relative z-10 w-6 h-6 bg-white rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
      </div>
    </div>
  );
}

function TimelineItem({ year, title, desc }: { year: string; title: string; desc: string }) {
  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-black text-white font-dot text-xs z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
        <div className="w-2 h-2 bg-red-600 rounded-full" />
      </div>
      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-[2rem] border border-white/10 bg-white/5 hover:border-white/30 transition-colors">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-dot text-xl uppercase">{title}</h4>
          <span className="font-mono text-xs text-white/50 border border-white/20 px-2 py-1 rounded-full">{year}</span>
        </div>
        <p className="text-white/60 font-mono text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function MonumentCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-8 rounded-[2rem] border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h4 className="text-2xl font-dot mb-3 uppercase">{title}</h4>
      <p className="text-white/50 font-mono text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
