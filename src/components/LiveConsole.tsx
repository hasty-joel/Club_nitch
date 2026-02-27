import { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal as TerminalIcon, Play, RefreshCw, Loader2 } from 'lucide-react';
import { usePyodide } from '../hooks/usePyodide';

export default function LiveConsole() {
  const [code, setCode] = useState('print("Hello from STAHIZA ICT HUB!")\n\n# Try some math\nimport numpy as np\na = np.array([1, 2, 3])\nprint(f"NumPy Array: {a}")\nprint(f"Mean: {np.mean(a)}")');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const { runCode, isLoading } = usePyodide();

  const handleRun = async () => {
    setIsRunning(true);
    const result = await runCode(code);
    if (result.error) {
      setOutput(`Error: ${result.error}`);
    } else {
      setOutput(result.output || 'Process finished with no output.');
    }
    setIsRunning(false);
  };

  return (
    <section id="terminal" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-accent/50 to-transparent"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-cyan-accent">04.</span> Live Python Console
          </h2>
          <p className="text-slate-400">Test your logic instantly. No installation required.</p>
        </motion.div>

        <div className="bg-[#1e1e1e] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Terminal Header */}
          <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-cyan-accent" />
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Interactive Shell</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 h-[400px]">
            {/* Input Area */}
            <div className="flex flex-col border-b md:border-b-0 md:border-r border-white/5">
              <div className="px-4 py-1.5 bg-white/5 flex justify-between items-center">
                <span className="text-[9px] font-mono text-slate-500 uppercase">Input</span>
                <button 
                  onClick={handleRun}
                  disabled={isLoading || isRunning}
                  className="flex items-center gap-1.5 px-3 py-1 bg-cyan-accent text-black text-[10px] font-bold rounded hover:bg-white transition-all disabled:opacity-50"
                >
                  {isRunning ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-current" />}
                  EXECUTE
                </button>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-grow bg-transparent p-4 font-mono text-sm text-[#d4d4d4] outline-none resize-none"
                spellCheck={false}
              />
            </div>

            {/* Output Area */}
            <div className="flex flex-col bg-black/40">
              <div className="px-4 py-1.5 bg-white/5 flex justify-between items-center">
                <span className="text-[9px] font-mono text-slate-500 uppercase">Output</span>
                <button 
                  onClick={() => setOutput('')}
                  className="text-[9px] font-mono text-slate-500 hover:text-white transition-colors"
                >
                  CLEAR
                </button>
              </div>
              <div className="flex-grow p-4 font-mono text-sm text-green-400 overflow-auto whitespace-pre-wrap">
                {isLoading ? (
                  <div className="flex items-center gap-2 text-slate-600 italic">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    Connecting to Python Engine...
                  </div>
                ) : (
                  output || <span className="text-slate-700 italic">{"\u003e\u003e\u003e"} Output will appear here...</span>
                )}
              </div>
            </div>
          </div>

          {/* Terminal Footer */}
          <div className="bg-[#252526] px-4 py-1.5 flex justify-between items-center border-t border-white/5">
            <div className="text-[9px] text-slate-500 font-mono">
              STAHIZA_OS v1.0.0 // PYTHON 3.11
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
              <span className="text-[9px] text-slate-500 uppercase tracking-tighter">{isLoading ? 'Initializing' : 'Online'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
