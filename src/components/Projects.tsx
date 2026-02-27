import { motion } from "motion/react";
import { ExternalLink, Github, Code, Play } from "lucide-react";
import { useState } from "react";
import Playground from "./Playground";

export default function Projects() {
  const [activePlayground, setActivePlayground] = useState<{ code: string; title: string } | null>(null);

  const projects = [
    {
      title: "Python Calculator",
      desc: "A robust CLI calculator supporting advanced mathematical operations and history tracking.",
      features: ["Loops", "Error Handling", "Math Module"],
      github: "#",
      demo: "#",
      code: `import math

def calculate():
    print("--- Python Calculator ---")
    print("Operations: +, -, *, /, sqrt")
    
    try:
        num1 = float(input("Enter first number: "))
        op = input("Enter operator: ")
        
        if op == 'sqrt':
            print(f"Result: {math.sqrt(num1)}")
            return

        num2 = float(input("Enter second number: "))
        
        if op == '+': print(f"Result: {num1 + num2}")
        elif op == '-': print(f"Result: {num1 - num2}")
        elif op == '*': print(f"Result: {num1 * num2}")
        elif op == '/': print(f"Result: {num1 / num2}")
        else: print("Invalid operator")
    except Exception as e:
        print(f"Error: {e}")

# In this playground, we simulate inputs for demo
print("Simulating calculation: 10 * 5")
print(f"Result: {10 * 5}")
print("\\nTry writing your own logic below!")
`
    },
    {
      title: "File Organizer Script",
      desc: "An automation tool that sorts files into categorized folders based on extension and metadata.",
      features: ["OS Module", "Shutil", "File I/O"],
      github: "#",
      demo: "#",
      code: `import os

# Mock file list for demonstration
files = ['report.pdf', 'photo.jpg', 'script.py', 'data.csv', 'notes.txt']
categories = {
    'Documents': ['.pdf', '.txt', '.csv'],
    'Images': ['.jpg', '.png'],
    'Scripts': ['.py']
}

print("--- File Organizer Simulation ---")
for file in files:
    ext = os.path.splitext(file)[1]
    for cat, exts in categories.items():
        if ext in exts:
            print(f"Moving {file} to {cat}/")
            break
`
    },
    {
      title: "Simple AI Chatbot",
      desc: "A rule-based chatbot using NLP techniques to provide intelligent responses to user queries.",
      features: ["String Manipulation", "Regex", "JSON"],
      github: "#",
      demo: "#",
      code: `import random

responses = {
    "hello": ["Hi there!", "Hello!", "Greetings!"],
    "how are you": ["I'm doing great, thanks!", "I'm just a bunch of code, but I'm happy!"],
    "python": ["Python is my favorite language!", "I love indentation!"],
    "default": ["That's interesting!", "Tell me more.", "I'm not sure I understand."]
}

def chatbot_response(user_input):
    user_input = user_input.lower()
    for key in responses:
        if key in user_input:
            return random.choice(responses[key])
    return random.choice(responses["default"])

print("Chatbot: Hello! Type something to chat.")
test_inputs = ["Hello", "How are you?", "Tell me about Python"]
for inp in test_inputs:
    print(f"User: {inp}")
    print(f"Chatbot: {chatbot_response(inp)}")
`
    },
    {
      title: "Data Analysis Script",
      desc: "A script that processes data using NumPy to generate statistical summaries and insights.",
      features: ["NumPy", "Statistics", "Data Processing"],
      github: "#",
      demo: "#",
      code: `import numpy as np

# Creating a random dataset
data = np.random.normal(100, 20, 1000)

print("--- NumPy Data Analysis ---")
print(f"Mean: {np.mean(data):.2f}")
print(f"Median: {np.median(data):.2f}")
print(f"Standard Deviation: {np.std(data):.2f}")
print(f"Max Value: {np.max(data):.2f}")
print(f"Min Value: {np.min(data):.2f}")

# Finding values above a threshold
threshold = 130
above_threshold = data[data > threshold]
print(f"\\nPercentage of values above {threshold}: {len(above_threshold)/len(data)*100:.1f}%")
`
    },
    {
      title: "Automation Tool",
      desc: "A web scraping utility that monitors price changes and sends desktop notifications.",
      features: ["BeautifulSoup", "Requests", "Threading"],
      github: "#",
      demo: "#",
      code: `import time

def monitor_price(item, target_price):
    print(f"Monitoring {item} for price below \${target_price}...")
    # Simulated price check
    current_price = 120
    print(f"Current price: \${current_price}")
    
    if current_price <= target_price:
        print("NOTIFICATION: Price dropped! Buy now!")
    else:
        print("Price still too high.")

monitor_price("Tech Gadget", 100)
`
    },
    {
      title: "Task Manager API",
      desc: "A lightweight backend service for managing to-do lists with persistent storage.",
      features: ["OOP", "SQLite", "API Design"],
      github: "#",
      demo: "#",
      code: `class TaskManager:
    def __init__(self):
        self.tasks = []

    def add_task(self, title):
        self.tasks.append({"title": title, "completed": False})
        print(f"Added task: {title}")

    def list_tasks(self):
        print("\\n--- Current Tasks ---")
        for i, task in enumerate(self.tasks):
            status = "[X]" if task['completed'] else "[ ]"
            print(f"{i+1}. {status} {task['title']}")

manager = TaskManager()
manager.add_task("Learn Pyodide")
manager.add_task("Build ICT Hub")
manager.list_tasks()
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
