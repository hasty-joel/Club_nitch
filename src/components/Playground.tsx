import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';
import { usePyodide } from '../hooks/usePyodide';
import { Play, Square, Loader2, Terminal as TerminalIcon, X, Code2 } from 'lucide-react';
import { motion } from 'motion/react';

interface PlaygroundProps {
  initialCode: string;
  title: string;
  onClose: () => void;
}

export default function Playground({ initialCode, title, onClose }: PlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const { runCode, isLoading, error: pyodideError } = usePyodide();

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running...\n');
    const result = await runCode(code);
    if (result.error) {
      setOutput((prev) => prev + `\nError: ${result.error}`);
    } else {
      setOutput(result.output || 'Process finished with exit code 0');
    }
    setIsRunning(false);
  };

  const lineCount = code.split('\n').length;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
    >
      <div className="bg-[#2b2b2b] w-full h-full flex flex-col overflow-hidden font-sans text-[#a9b7c6]">
        {/* PyCharm Top Menu Bar */}
        <div className="flex items-center justify-between px-3 py-1 bg-[#3c3f41] border-b border-black/20 text-[11px]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <img src="https://resources.jetbrains.com/storage/products/pycharm/img/meta/pycharm_logo_300x300.png" className="w-4 h-4" alt="PC" referrerPolicy="no-referrer" />
              <span className="font-semibold text-white/80">PyCharm</span>
            </div>
            <div className="flex gap-3 opacity-60">
              <span>File</span>
              <span>Edit</span>
              <span>View</span>
              <span>Navigate</span>
              <span>Code</span>
              <span>Refactor</span>
              <span>Run</span>
              <span>Tools</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="hover:bg-red-500/80 p-1 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 px-4 py-1.5 bg-[#3c3f41] border-b border-black/20">
          <div className="flex items-center gap-1 px-2 py-0.5 bg-[#4e5254] rounded border border-white/10 text-xs">
            <span className="text-white/70">main.py</span>
          </div>
          <div className="h-4 w-px bg-white/10 mx-2"></div>
          <button
            onClick={handleRun}
            disabled={isLoading || isRunning}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#4b6eaf]/20 hover:bg-[#4b6eaf]/40 border border-[#4b6eaf]/50 text-[#4b6eaf] text-[11px] font-bold rounded transition-all disabled:opacity-30"
          >
            {isRunning ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-current" />}
            Run 'main'
          </button>
          <button className="p-1 hover:bg-white/5 rounded text-slate-400">
            <Square className="w-3 h-3" />
          </button>
        </div>

        {/* Main IDE Layout */}
        <div className="flex-grow flex overflow-hidden">
          {/* Project Sidebar (Mock) */}
          <div className="hidden lg:flex w-52 flex-col bg-[#313335] border-r border-black/20">
            <div className="px-3 py-1.5 bg-[#3c3f41] border-b border-black/20 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Project
            </div>
            <div className="p-2 space-y-1">
              <div className="flex items-center gap-2 text-[11px] text-white/80">
                <ChevronRight className="w-3 h-3 text-slate-500" />
                <span className="font-bold">stahiza_ict_hub</span>
              </div>
              <div className="pl-4 flex items-center gap-2 text-[11px] text-white/80">
                <ChevronRight className="w-3 h-3 text-slate-500" />
                <span className="text-blue-400">venv</span>
              </div>
              <div className="pl-4 flex items-center gap-2 text-[11px] text-white/80 bg-[#4e5254]/40 rounded px-1">
                <Code2 className="w-3 h-3 text-blue-400" />
                <span>main.py</span>
              </div>
            </div>
          </div>

          {/* Editor and Console Split */}
          <div className="flex-grow flex flex-col overflow-hidden">
            {/* Tabs */}
            <div className="flex bg-[#3c3f41] border-b border-black/20">
              <div className="px-4 py-1.5 bg-[#2b2b2b] border-t-2 border-t-blue-500 text-[11px] flex items-center gap-2">
                <Code2 className="w-3 h-3 text-blue-400" />
                main.py
                <X className="w-2.5 h-2.5 opacity-40" />
              </div>
            </div>

            {/* Editor Area */}
            <div className="flex-grow flex overflow-auto bg-[#2b2b2b]">
              {/* Gutter */}
              <div className="py-4 pr-3 pl-4 text-right select-none border-r border-white/5 bg-[#313335]">
                {Array.from({ length: lineCount }).map((_, i) => (
                  <div key={i} className="text-[11px] font-mono text-[#606366] leading-[20px]">
                    {i + 1}
                  </div>
                ))}
              </div>
              
              {/* Code Editor */}
              <div className="flex-grow relative">
                <Editor
                  value={code}
                  onValueChange={setCode}
                  highlight={(code) => highlight(code, languages.python, 'python')}
                  padding={16}
                  className="min-h-full outline-none font-mono text-[13px] leading-[20px] text-[#a9b7c6]"
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    backgroundColor: 'transparent',
                  }}
                />
              </div>
            </div>

            {/* Console (Bottom) */}
            <div className="h-64 flex flex-col bg-[#2b2b2b] border-t border-black/40">
              <div className="flex items-center justify-between px-4 py-1.5 bg-[#3c3f41] border-b border-black/20">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Run:</span>
                    <span className="text-[10px] text-white/80">main</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setOutput('')} className="text-[10px] text-slate-500 hover:text-white">Clear</button>
                </div>
              </div>
              <div className="flex-grow p-4 font-mono text-[12px] text-[#bbbbbb] overflow-auto whitespace-pre-wrap">
                {isLoading ? (
                  <div className="flex items-center gap-2 text-slate-500 italic">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Loading Python SDK...
                  </div>
                ) : (
                  <div className="selection:bg-blue-500/30">
                    <div className="text-slate-500 mb-2">/usr/bin/python3.11 /home/stahiza/main.py</div>
                    {output || <span className="opacity-30 italic">Process waiting...</span>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="px-3 py-1 bg-[#3c3f41] border-t border-black/20 flex justify-between items-center text-[10px] text-slate-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500' : 'bg-green-500'} opacity-60`}></div>
              <span>{isLoading ? 'Indexing...' : 'Ready'}</span>
            </div>
            <span>UTF-8</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Line {code.split('\n').length}, Column 1</span>
            <span>Python 3.11 (Pyodide)</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ChevronRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
