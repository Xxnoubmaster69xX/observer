import { useState } from "react";
import { Copy, Check, Terminal, FileCode2 } from "lucide-react";

export function ImplementationLibrary() {
  const [activeLang, setActiveLang] = useState("uml");
  const [copied, setCopied] = useState(false);

  const languages = [
    { id: "uml", name: "UML", type: "Diagrama Estructural" },
    { id: "typescript", name: "TypeScript", type: "OOP Moderno" },
    { id: "python", name: "Python", type: "Scripting / Backend" },
    { id: "python-gui", name: "Python (GUI)", type: "Tkinter App" },
    { id: "java", name: "Java", type: "Enterprise OOP" },
    { id: "go", name: "Go", type: "Concurrencia (Channels)" },
  ];

  const codeSnippets: Record<string, string> = {
    uml: `+---------------------+          +-----------------------+
|      Subject        |          |       Observer        |
+---------------------+          +-----------------------+
| - observers: List   |          |                       |
+---------------------+          +-----------------------+
| + subscribe(obs)    |<>--------| + update(data)        |
| + unsubscribe(obs)  |          |                       |
| + notify(data)      |          +-----------------------+
+---------------------+                     ^
          ^                                 |
          |                                 |
          |                                 |
+---------------------+          +-----------------------+
|  ConcreteSubject    |          |   ConcreteObserver    |
+---------------------+          +-----------------------+
| - state: any        |          | - subjectState: any   |
+---------------------+          +-----------------------+
| + getState()        |          | + update(data)        |
| + setState(state)   |          |                       |
+---------------------+          +-----------------------+

[ Leyenda ]
<>-------- : Agregación (El Subject tiene una lista de Observers)
^          : Herencia / Implementación (Concrete implementa la interfaz)
-          : Privado
+          : Público`,
    typescript: `// TypeScript: Patrón Observer Clásico

interface Observer {
  update(data: any): void;
}

class Subject {
  private observers: Observer[] = [];

  subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(data: any) {
    this.observers.forEach(observer => observer.update(data));
  }
}

// Uso
const sensor = new Subject();

const display: Observer = {
  update: (temp) => console.log(\`Display: \${temp}°C\`)
};

sensor.subscribe(display);
sensor.notify(24.5);`,

    python: `# Python: Patrón Observer

class Subject:
    def __init__(self):
        self._observers = []

    def subscribe(self, observer):
        self._observers.append(observer)

    def unsubscribe(self, observer):
        self._observers.remove(observer)

    def notify(self, data):
        for observer in self._observers:
            observer.update(data)

class Display:
    def update(self, temp):
        print(f"Display: {temp}°C")

# Uso
sensor = Subject()
display = Display()

sensor.subscribe(display)
sensor.notify(24.5)`,

    "python-gui": `# Python: Patrón Observer con Interfaz Gráfica (Tkinter)
# Este ejemplo muestra un panel de control que actualiza múltiples gráficos
# y displays simultáneamente cuando cambia un valor.

import tkinter as tk
from tkinter import ttk

# --- Patrón Observer ---
class Subject:
    def __init__(self):
        self._observers = []
        self._state = 0

    def attach(self, observer):
        if observer not in self._observers:
            self._observers.append(observer)

    def detach(self, observer):
        try:
            self._observers.remove(observer)
        except ValueError:
            pass

    def notify(self):
        for observer in self._observers:
            observer.update(self._state)

    @property
    def state(self):
        return self._state

    @state.setter
    def state(self, value):
        self._state = value
        self.notify() # Notifica a todos los observers del cambio

# --- Observers (Componentes UI) ---
class TextDisplay(ttk.Label):
    def update(self, value):
        self.config(text=f"Valor Actual: {value}")

class ProgressBarDisplay(ttk.Progressbar):
    def update(self, value):
        self['value'] = value

class ColorDisplay(tk.Canvas):
    def update(self, value):
        # Cambia de azul a rojo basado en el valor (0-100)
        r = int((value / 100) * 255)
        b = int(((100 - value) / 100) * 255)
        color = f'#{r:02x}00{b:02x}'
        self.config(bg=color)

# --- Aplicación Principal ---
class App(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Observer Pattern - Dashboard")
        self.geometry("400x300")
        self.configure(padx=20, pady=20)

        # Crear el Subject (Modelo de datos)
        self.data_model = Subject()

        # --- UI: Controles (Cambian el estado) ---
        control_frame = ttk.LabelFrame(self, text="Panel de Control", padding=10)
        control_frame.pack(fill="x", pady=(0, 20))

        self.slider = ttk.Scale(
            control_frame, from_=0, to=100, orient="horizontal",
            command=self.on_slider_change
        )
        self.slider.pack(fill="x")

        # --- UI: Observers (Reaccionan al estado) ---
        display_frame = ttk.LabelFrame(self, text="Monitores (Observers)", padding=10)
        display_frame.pack(fill="both", expand=True)

        # 1. Observer de Texto
        self.text_obs = TextDisplay(display_frame, font=("Helvetica", 14))
        self.text_obs.pack(pady=5)
        self.data_model.attach(self.text_obs)

        # 2. Observer de Barra de Progreso
        self.progress_obs = ProgressBarDisplay(display_frame, length=200, mode='determinate')
        self.progress_obs.pack(pady=10)
        self.data_model.attach(self.progress_obs)

        # 3. Observer de Color (Canvas)
        self.color_obs = ColorDisplay(display_frame, width=200, height=50, bg="blue")
        self.color_obs.pack(pady=5)
        self.data_model.attach(self.color_obs)

        # Inicializar con valor 0
        self.data_model.state = 0

    def on_slider_change(self, event):
        # Cuando el usuario mueve el slider, actualizamos el modelo.
        # El modelo se encarga de notificar a todos los observers.
        new_value = int(float(self.slider.get()))
        self.data_model.state = new_value

if __name__ == "__main__":
    app = App()
    app.mainloop()`,

    java: `// Java: Patrón Observer (Usando Interfaces)

import java.util.ArrayList;
import java.util.List;

interface Observer {
    void update(Object data);
}

class Subject {
    private List<Observer> observers = new ArrayList<>();

    public void subscribe(Observer observer) {
        observers.add(observer);
    }

    public void unsubscribe(Observer observer) {
        observers.remove(observer);
    }

    public void notify(Object data) {
        for (Observer observer : observers) {
            observer.update(data);
        }
    }
}

class Display implements Observer {
    public void update(Object temp) {
        System.out.println("Display: " + temp + "°C");
    }
}`,

    go: `// Go: Observer usando Channels y Goroutines

package main
import "fmt"

type Observer chan interface{}

type Subject struct {
    observers []Observer
}

func (s *Subject) Subscribe(o Observer) {
    s.observers = append(s.observers, o)
}

func (s *Subject) Notify(data interface{}) {
    for _, observer := range s.observers {
        // Envío no bloqueante
        select {
        case observer <- data:
        default:
        }
    }
}

func main() {
    sensor := &Subject{}
    display := make(Observer, 1)
    
    sensor.Subscribe(display)
    
    go func() {
        for temp := range display {
            fmt.Printf("Display: %v°C\\n", temp)
        }
    }()
    
    sensor.Notify(24.5)
}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderCode = (code: string) => {
    return code.split("\n").map((line, i) => {
      let coloredLine = line;
      // Very basic regex for coloring keywords
      coloredLine = coloredLine.replace(
        /\b(class|interface|implements|public|private|func|type|chan|go|select|case|default|def|for|in|range|import|package)\b/g,
        '<span class="text-white/70 font-bold">$1</span>',
      );
      coloredLine = coloredLine.replace(
        /\b(const|let|var|new|this|self)\b/g,
        '<span class="text-white/50">$1</span>',
      );
      coloredLine = coloredLine.replace(
        /\b(string|number|boolean|any|void|Object|interface\{\})\b/g,
        '<span class="text-white/60">$1</span>',
      );
      coloredLine = coloredLine.replace(
        /(\/\/.+)/g,
        '<span class="text-white/30 italic">$1</span>',
      );
      coloredLine = coloredLine.replace(
        /(#.+)/g,
        '<span class="text-white/30 italic">$1</span>',
      );

      return (
        <div key={i} className="table-row">
          <span className="table-cell text-white/20 pr-4 select-none text-right w-8">
            {i + 1}
          </span>
          <span
            className="table-cell"
            dangerouslySetInnerHTML={{ __html: coloredLine }}
          />
        </div>
      );
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-dot mb-4 uppercase">
          Implementación
        </h2>
        <p className="text-white/50 max-w-2xl mx-auto font-mono text-sm">
          La Piedra Rosetta del código. Compara cómo se implementa el mismo
          patrón arquitectónico a través de diferentes lenguajes y paradigmas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Language Selector */}
        <div className="space-y-2">
          <h3 className="text-xs font-dot text-white/40 uppercase tracking-widest mb-4 px-2">
            [ LENGUAJES ]
          </h3>
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setActiveLang(lang.id)}
              className={`w-full text-left px-5 py-3 rounded-full border transition-all flex flex-col gap-1 ${
                activeLang === lang.id
                  ? "bg-white text-black border-white"
                  : "border-transparent text-white/50 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="font-dot uppercase tracking-wider">{lang.name}</span>
              <span className="text-[10px] font-mono opacity-70">
                {lang.type}
              </span>
            </button>
          ))}

          <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-[2rem]">
            <h4 className="flex items-center gap-2 text-white font-dot text-sm mb-2 uppercase">
              <Terminal className="w-4 h-4" />
              Generador
            </h4>
            <p className="text-xs text-white/50 mb-6 font-mono">
              Copia el código base (boilerplate) para iniciar tu propio sistema
              reactivo.
            </p>
            <button
              onClick={handleCopy}
              className="w-full py-3 bg-white text-black text-xs font-dot uppercase tracking-widest rounded-full transition-colors flex items-center justify-center gap-2 hover:bg-white/80"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied ? "¡COPIADO!" : "COPIAR BOILERPLATE"}
            </button>
          </div>
        </div>

        {/* Code Viewer */}
        <div className="lg:col-span-3 bg-black border border-white/20 rounded-[2rem] overflow-hidden flex flex-col">
          <div className="h-14 bg-white/5 border-b border-white/10 flex items-center px-6 justify-between">
            <div className="flex items-center gap-2 text-white/50 text-sm font-mono">
              <FileCode2 className="w-4 h-4" />
              observer_pattern.
              {activeLang === "uml"
                ? "txt"
                : activeLang === "typescript"
                ? "ts"
                : activeLang === "python" || activeLang === "python-gui"
                  ? "py"
                  : activeLang === "java"
                    ? "java"
                    : "go"}
            </div>
            <button
              onClick={handleCopy}
              className="text-white/50 hover:text-white transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-white" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="p-8 overflow-x-auto flex-1">
            <pre className="text-sm font-mono leading-relaxed">
              <code className="text-white/80">
                {renderCode(codeSnippets[activeLang])}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
