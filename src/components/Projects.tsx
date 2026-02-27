import { motion } from "motion/react";
import { ExternalLink, Github, Code, Play } from "lucide-react";
import { useState } from "react";
import Playground from "./Playground";

export default function Projects() {
  const [activePlayground, setActivePlayground] = useState<{ code: string; title: string } | null>(null);

  const projects = [
    {
      title: "NITA-U Email Validator",
      desc: "Official government email domain validator for checking .go.ug addresses with interactive progress tracking.",
      features: ["Domain Validation", "Input Processing", "Looping"],
      github: "#",
      demo: "#",
      code: `# NITA-U Government Email Domain Validator
# This program checks whether email addresses end with "go.ug"
import sys
import time

def percent_loader(text="Processing", speed=0.01):
    for i in range(101):
        sys.stdout.write(f"\\r{text}... {i}%")
        sys.stdout.flush()
        time.sleep(speed)
    print("\\nComplete.")

def check_emails():
    n = 0
    print("=" * 50)
    print(" NITA-U OFFICIAL EMAIL DOMAIN VALIDATOR ")
    print("=" * 50)
    
    try:
        # Ask user how many emails they want to check
        # Note: In this playground, we simulate inputs for demo
        print("\\n[DEMO MODE] Validating 2 sample emails...")
        number = 2
        
        # variables
        valid_email = []
        invalid_email = []
        emails = ["contact@nita.go.ug", "user@gmail.com"]

        print("\\nValidation Results:")
        print("-" * 20)

        time.sleep(1)
        print("Checking server.....\\n")

        time.sleep(1)
        print("Analysing for [go.ug].........\\n ")

        print("Validating.............\\n")
        time.sleep(1)
        percent_loader()


        # Validate each email
        for email in emails:
            cleaned_email = email.strip().lower()   # remove spaces & handle uppercase
            n += 1
            if cleaned_email.endswith("go.ug"):
                print(f"Email {n} => valid")
                valid_email.append(email)
            else:
                print(f"Email {n} => invalid")
                invalid_email.append(email)

        if len(valid_email) > 1:
            print("Valid emails => " , *valid_email)
        else:
            print("Valid_email => " , *valid_email)

        if len(invalid_email) > 1:
            print("Invalid emails => " , *invalid_email)
        else:
            print("Invalid_email => ", *invalid_email)
        

    except ValueError:
        print("Invalid input. Please enter a valid number.")

# Run the program once for demo
check_emails()
`
    },
    {
      title: "ISBAT GradeHub",
      desc: "Secure grade management system with SQLite database, password hashing, and performance visualization.",
      features: ["SQLite3", "Matplotlib", "Data Analysis", "Security"],
      github: "#",
      demo: "#",
      code: `import sqlite3
import hashlib
import json
from datetime import datetime

# ====================== DATABASE SETUP ======================
def init_db():
    """Creating the database"""
    conn = sqlite3.connect('isbat_gradehub.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT NOT NULL
    )''')
    c.execute('''CREATE TABLE IF NOT EXISTS performance_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        timestamp TEXT NOT NULL,
        average REAL NOT NULL,
        percentage REAL NOT NULL,
        results_json TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )''')
    conn.commit()
    conn.close()

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

def get_letter_grade(ave: float) -> str:
    if ave >= 90: return "A+ LEGEND"
    elif ave >= 80: return "A EXCELLENT"
    elif ave >= 70: return "B+ STRONG"
    elif ave >= 60: return "B SOLID"
    elif ave >= 50: return "C AVERAGE"
    elif ave >= 40: return "D NEEDS WORK"
    else: return "F KEEP PUSHING"

# ====================== DEMO EXECUTION ======================
print("--- ISBAT GradeHub System Initializing ---")
init_db()
print("Database connected successfully.")

# Mock data for demo
full_name = "STAHIZA STUDENT"
results = {"Python": 95, "Database": 88, "Networking": 72}
ave = sum(results.values()) / len(results)
grade = get_letter_grade(ave)

print(f"\\nStudent: {full_name}")
print("-" * 30)
for sub, mark in results.items():
    print(f"{sub:<15}: {mark} marks")
print("-" * 30)
print(f"OVERALL AVERAGE: {ave:.1f}")
print(f"FINAL GRADE    : {grade}")
`
    }
  ];

  return (
    <section id="projects" className="py-24 bg-dark-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-cyan-accent">02.</span> Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gold-cta mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-navy-primary/20 border border-cyan-accent/10 rounded-xl p-6 hover:border-cyan-accent/40 transition-all cyan-glow-hover flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-cyan-accent/5 rounded-lg text-cyan-accent">
                  <Code className="w-6 h-6" />
                </div>
                <div className="flex gap-4 text-slate-400">
                  <a href={project.github} className="hover:text-gold-cta transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={project.demo} className="hover:text-cyan-accent transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-accent transition-colors">
                {project.title}
              </h3>
              
              <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.features.map((feature, fIndex) => (
                  <span 
                    key={fIndex}
                    className="px-2 py-1 bg-black/40 border border-cyan-accent/5 text-[10px] font-mono text-cyan-accent rounded uppercase tracking-wider"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="mt-auto">
                <button
                  onClick={() => setActivePlayground({ code: project.code, title: project.title })}
                  className="w-full py-2 bg-cyan-accent/10 border border-cyan-accent/30 text-cyan-accent text-xs font-bold rounded hover:bg-cyan-accent hover:text-black transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-3 h-3" />
                  Run & Edit Code
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-gold-cta hover:text-white transition-colors font-mono"
          >
            <span>view_more_on_github()</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {activePlayground && (
        <Playground 
          initialCode={activePlayground.code}
          title={activePlayground.title}
          onClose={() => setActivePlayground(null)}
        />
      )}
    </section>
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
