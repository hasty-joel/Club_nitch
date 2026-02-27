import { useState, useEffect, useRef } from 'react';

declare global {
  interface Window {
    loadPyodide: any;
  }
}

export function usePyodide() {
  const [pyodide, setPyodide] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const outputBuffer = useRef('');
  const errorBuffer = useRef('');

  useEffect(() => {
    const loadPyodideInstance = async () => {
      try {
        // Fix for "Illegal invocation" errors in some environments where fetch is detached
        if (typeof window !== 'undefined' && window.fetch) {
          try {
            window.fetch = window.fetch.bind(window);
          } catch (e) {
            // Ignore if already bound or non-configurable
          }
        }

        if (!window.loadPyodide) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
          script.async = true;
          document.head.appendChild(script);

          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
          });
        }

        const py = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
          stdout: (text: string) => {
            outputBuffer.current += text + '\n';
          },
          stderr: (text: string) => {
            errorBuffer.current += text + '\n';
          }
        });
        
        setPyodide(py);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load Pyodide:', err);
        setError('Failed to load Python runtime.');
        setIsLoading(false);
      }
    };

    loadPyodideInstance();
  }, []);

  const runCode = async (code: string) => {
    if (!pyodide) return { output: '', error: 'Python runtime not loaded.' };

    outputBuffer.current = '';
    errorBuffer.current = '';

    try {
      // Automatically detect and load packages from imports
      await pyodide.loadPackagesFromImports(code);
      const result = await pyodide.runPythonAsync(code);
      
      let finalOutput = outputBuffer.current.trim();
      
      // If there's a return value and no stdout, show the return value
      if (result !== undefined && finalOutput === '') {
        finalOutput = String(result);
      }

      return { 
        output: finalOutput, 
        error: errorBuffer.current.trim() || null 
      };
    } catch (err: any) {
      return { 
        output: outputBuffer.current.trim(), 
        error: err.message 
      };
    }
  };

  return { runCode, isLoading, error };
}
