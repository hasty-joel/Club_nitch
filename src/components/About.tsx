import { motion } from "motion/react";
import { Cpu, Zap, Shield, Database } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Automation",
      desc: "Streamlining repetitive tasks with elegant Python scripts."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Analysis",
      desc: "Extracting meaningful insights from complex datasets."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Logic & Security",
      desc: "Building robust systems with security-first principles."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Performance",
      desc: "Optimizing algorithms for maximum execution speed."
    }
  ];

  return (
    <section id="about" className="py-24 bg-dark-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
              <span className="text-cyan-accent">01.</span> About the Hub
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Passionate about building software that solves real-world problems. 
              My journey in Python started with a simple "Hello World" and evolved into 
              architecting complex automation tools and data-driven applications.
            </p>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              I focus on writing clean, maintainable code that follows industry best practices. 
              Whether it's a simple calculator or a sophisticated AI-powered chatbot, 
              logic and efficiency are at the core of everything I build.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {features.map((f, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="text-gold-cta">{f.icon}</div>
                  <h3 className="text-white font-bold">{f.title}</h3>
                  <p className="text-slate-500 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl border border-cyan-accent/20 bg-navy-primary/30 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-accent/10 to-transparent opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4/5 h-4/5 border border-cyan-accent/10 rounded-xl flex flex-col p-6 font-mono text-xs overflow-hidden bg-black/40 backdrop-blur-sm">
                  <div className="flex gap-1.5 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="text-cyan-accent mb-2">class ICT_Hub:</div>
                  <div className="pl-4 text-slate-300">def __init__(self):</div>
                  <div className="pl-8 text-slate-400">self.name = "STAHIZA ICT HUB"</div>
                  <div className="pl-8 text-slate-400">self.skills = ["Python", "Logic", "Automation"]</div>
                  <div className="pl-8 text-slate-400">self.motto = "Clean code, real logic"</div>
                  <div className="pl-4 mt-4 text-slate-300">def solve_problem(self, problem):</div>
                  <div className="pl-8 text-slate-400">return self.apply_logic(problem)</div>
                  <div className="mt-auto text-gold-cta animate-pulse"># Ready to build...</div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-gold-cta/30 rounded-tr-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-cyan-accent/30 rounded-bl-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
