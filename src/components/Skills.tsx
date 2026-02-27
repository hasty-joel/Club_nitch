import { motion } from "motion/react";
import { Terminal, GitBranch, Layout, Brain, Workflow } from "lucide-react";

export default function Skills() {
  const skillGroups = [
    {
      title: "Core Language",
      icon: <Terminal className="w-5 h-5" />,
      skills: ["Python 3.x", "Standard Library", "OOP", "Decorators"]
    },
    {
      title: "Version Control",
      icon: <GitBranch className="w-5 h-5" />,
      skills: ["Git", "GitHub", "Branching", "Pull Requests"]
    },
    {
      title: "Frontend Basics",
      icon: <Layout className="w-5 h-5" />,
      skills: ["HTML5", "CSS3", "Tailwind CSS", "React"]
    },
    {
      title: "Problem Solving",
      icon: <Brain className="w-5 h-5" />,
      skills: ["Algorithms", "Data Structures", "Recursion", "Big O"]
    },
    {
      title: "Logic & Workflow",
      icon: <Workflow className="w-5 h-5" />,
      skills: ["Automation", "API Integration", "Unit Testing", "CI/CD"]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-dark-bg relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-cyan-accent">03.</span> Technical Stack
          </h2>
          <div className="w-20 h-1 bg-gold-cta mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {skillGroups.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl border border-cyan-accent/10 bg-navy-primary/10 backdrop-blur-sm hover:bg-navy-primary/20 transition-all group"
            >
              <div className="text-gold-cta mb-4 group-hover:scale-110 transition-transform">
                {group.icon}
              </div>
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.skills.map((skill, si) => (
                  <li key={si} className="flex items-center gap-2 text-slate-400 text-sm">
                    <div className="w-1 h-1 bg-cyan-accent rounded-full"></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Tech Badges */}
        <div className="mt-20 flex flex-wrap justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2 text-white font-bold">
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="Python" className="w-8 h-8" referrerPolicy="no-referrer" />
            <span>PYTHON</span>
          </div>
          <div className="flex items-center gap-2 text-white font-bold">
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" alt="Git" className="w-8 h-8" referrerPolicy="no-referrer" />
            <span>GIT</span>
          </div>
          <div className="flex items-center gap-2 text-white font-bold">
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="React" className="w-8 h-8" referrerPolicy="no-referrer" />
            <span>REACT</span>
          </div>
          <div className="flex items-center gap-2 text-white font-bold">
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="JS" className="w-8 h-8" referrerPolicy="no-referrer" />
            <span>JAVASCRIPT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
