import { Github, Linkedin, Mail, Twitter, Terminal } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-12 border-t border-cyan-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6 text-cyan-accent" />
            <span className="font-mono font-bold text-white tracking-tighter">
              STAHIZA_ICT_HUB<span className="animate-pulse">_</span>
            </span>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-gold-cta transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-gold-cta transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-gold-cta transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-gold-cta transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <div className="text-slate-500 text-sm font-mono">
            &copy; {currentYear} // Built with Pythonic Logic
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/5 text-center text-[10px] text-slate-600 uppercase tracking-[0.2em]">
          Designed for the futuristic developer ecosystem
        </div>
      </div>
    </footer>
  );
}
