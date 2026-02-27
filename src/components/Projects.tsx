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

try:
    import matplotlib.pyplot as plt
    has_matplotlib = True
except ImportError:
    has_matplotlib = False


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
    """Simple but secure enough SHA-256 hash."""
    return hashlib.sha256(password.encode('utf-8')).hexdigest()


def signup():
    """New user registration."""
    print("\\n=== SIGN UP ===")
    while True:
        username = input("Choose username: ").strip().lower()
        if not username:
            continue
        full_name = input("Enter your full name: ").strip().upper()
        if not full_name:
            continue
        password = input("Choose password (min 4 chars): ").strip()
        if len(password) < 4:
            print("Password too short!")
            continue

        conn = sqlite3.connect('isbat_gradehub.db')
        c = conn.cursor()
        c.execute("SELECT 1 FROM users WHERE username=?", (username,))
        if c.fetchone():
            print("Username already taken!")
            conn.close()
            continue

        pw_hash = hash_password(password)
        c.execute("INSERT INTO users (username, password_hash, full_name) VALUES (?, ?, ?)",
                  (username, pw_hash, full_name))
        conn.commit()
        conn.close()
        print("Account created successfully! You can now login.")
        return


def login() -> tuple[int, str] | None:
    """Login → returns (user_id, full_name) or None."""
    print("\\n=== LOGIN ===")
    while True:
        username = input("Username (or type 'exit' to cancel): ").strip().lower()
        if username == 'exit':
            return None
        password = input("Password: ").strip()

        conn = sqlite3.connect('isbat_gradehub.db')
        c = conn.cursor()
        c.execute("SELECT id, password_hash, full_name FROM users WHERE username=?", (username,))
        row = c.fetchone()
        conn.close()

        if row and hash_password(password) == row[1]:
            user_id, _, full_name = row
            print(f"Welcome back, {full_name}!")
            return user_id, full_name

        print("Invalid username or password!")
        if input("Try again? (y/n): ").strip().lower() != 'y':
            return None


# ====================== GRADE SYSTEM ======================
def get_letter_grade(ave: float) -> str:
    """Automatic letter grades."""
    if ave >= 90:
        return "A+ LEGEND"
    elif ave >= 80:
        return "A EXCELLENT"
    elif ave >= 70:
        return "B+ STRONG"
    elif ave >= 60:
        return "B SOLID"
    elif ave >= 50:
        return "C AVERAGE"
    elif ave >= 40:
        return "D NEEDS WORK"
    else:
        return "F KEEP PUSHING"


# ====================== FIXED COMMENT SYSTEM ======================
def get_comment(ave: float) -> str:
    """The comments part"""
    if ave >= 80:
        return "Outstanding performance! Keep up the excellent work."
    elif ave >= 65:
        return "Very good performance. You are on the right track."
    elif ave >= 50:
        return "Satisfactory performance. Focus on weak areas for better results."
    elif ave >= 40:
        return "Average performance. Consistent effort will help you improve."
    else:
        return "Below average. Let's create a plan to turn this around."


# ====================== EXISTING HELPERS ======================
def get_positive_int(prompt: str) -> int:
    while True:
        try:
            value = int(input(prompt))
            if value <= 0:
                print('Please enter a positive number!')
                continue
            return value
        except ValueError:
            print('Invalid number! Try again.')


def get_non_empty_string(prompt: str) -> str:
    while True:
        value = input(prompt).strip().upper()
        if not value:
            print('Subject name cannot be empty!')
            continue
        return value


def get_mark(prompt: str) -> int:
    while True:
        try:
            mark = int(input(prompt))
            if not 0 <= mark <= 100:
                print('Marks should be between 0 and 100!')
                continue
            return mark
        except ValueError:
            print('Please enter a valid number!')


def get_aggregation_method(sub: str) -> str:
    while True:
        method = input(f'For {sub} final mark (average / max / min / sum): ').strip().lower()
        if method in ['average', 'avg']:
            return 'average'
        elif method == 'max':
            return 'max'
        elif method == 'min':
            return 'min'
        elif method == 'sum':
            return 'sum'
        else:
            print('Invalid! Use: average / max / min / sum')


def calculate_stats(results: dict, num_sub: int) -> dict:
    total = sum(results.values())
    ave = round(total / num_sub, 1)
    percentage = round((total / (num_sub * 100)) * 100, 1)

    best_subject = max(results, key=results.get)
    worst_subject = min(results, key=results.get)

    comment = get_comment(ave)
    grade = get_letter_grade(ave)

    return {
        'total': total,
        'ave': ave,
        'percentage': percentage,
        'best_subject': best_subject,
        'best_mark': results[best_subject],
        'worst_subject': worst_subject,
        'worst_mark': results[worst_subject],
        'comment': comment,
        'grade': grade
    }


def print_summary(name: str, results: dict, stats: dict):
    print('=' * 60)
    print(f'AVERAGE      : {stats["ave"]}')
    print(f'OVERALL GRADE: {stats["grade"]}')
    print(f'TOTAL MARKS  : {stats["total"]} / {len(results) * 100}')
    print(f'PERCENTAGE   : {stats["percentage"]}%')
    print('BEST SUBJECT : {} ({} marks)'.format(stats['best_subject'], stats['best_mark']))
    print('WORST SUBJECT: {} ({} marks)'.format(stats['worst_subject'], stats['worst_mark']))
    print(f'COMMENT      : {stats["comment"]}')
    print('=' * 60)

    print('SUMMARY OF RESULTS')
    print(f'Name: {name}')
    print('-' * 40)
    for sub, mark in results.items():
        print(f'{sub:<20} : {mark:3} marks')


def create_performance_chart(name: str, results: dict, ave: float, grade: str):
    """Performance Chart"""
    subjects = list(results.keys())
    marks = list(results.values())

    fig, ax = plt.subplots(figsize=(12, 7))

    bars = ax.bar(subjects, marks,
                  width=0.35,
                  color="#3c6f91",
                  edgecolor='black',
                  linewidth=2.5,
                  alpha=0.95,
                  zorder=3)

    ax.plot(subjects, marks, color="#DD8C12", marker='D', markersize=12,
            linestyle='-', linewidth=4, label='Trend Line', zorder=4)

    ax.axhline(y=ave, color="#2B8D5C", linestyle='--', linewidth=3,
               label=f'Average {ave}', zorder=2)

    for bar in bars:
        h = bar.get_height()
        ax.annotate(f'{h}', xy=(bar.get_x() + bar.get_width() / 2, h), xytext=(0, 5),
                    textcoords='offset points', ha='center', va='bottom',
                    fontsize=12, fontweight='bold',
                    color='white' if h > 50 else 'black')

    ax.set_xlabel('Subjects', fontsize=15, fontweight='bold')
    ax.set_ylabel('Final Marks', fontsize=15, fontweight='bold')
    ax.set_title(f"{name}'s Performance — {grade}", fontsize=20, fontweight='bold', pad=25, color="#181714")

    plt.xticks(rotation=45, ha='right', fontsize=12)
    ax.tick_params(axis='y', labelsize=12)
    ax.grid(True, linestyle=':', alpha=0.6, zorder=0)
    ax.legend(loc='upper left', fontsize=13, shadow=True, frameon=True)

    for spine in ax.spines.values():
        spine.set_linewidth(2.5)

    plt.tight_layout()
    plt.savefig('performance_chart.png', dpi=400, bbox_inches='tight')
    plt.show()
    plt.close()

    print('Chart saved as performance_chart.png')


# ====================== SAVE & HISTORY ======================
def save_performance_record(user_id: int, results: dict, stats: dict):
    """Auto-save every analysis to the database."""
    conn = sqlite3.connect('isbat_gradehub.db')
    c = conn.cursor()
    results_json = json.dumps(results)
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    c.execute("""INSERT INTO performance_records 
                 (user_id, timestamp, average, percentage, results_json) 
                 VALUES (?, ?, ?, ?, ?)""",
              (user_id, timestamp, stats['ave'], stats['percentage'], results_json))
    conn.commit()
    conn.close()
    print("Analysis automatically saved to your profile!")


def view_history(user_id: int, full_name: str):
    """Show past analyses + click to view full details."""
    conn = sqlite3.connect('isbat_gradehub.db')
    c = conn.cursor()
    c.execute("""SELECT id, timestamp, average, percentage, results_json 
                 FROM performance_records 
                 WHERE user_id = ? 
                 ORDER BY timestamp DESC""", (user_id,))
    rows = c.fetchall()
    conn.close()

    if not rows:
        print("No past analyses yet. Go create your first one!")
        return

    print(f"\\n{full_name}'s Performance History")
    print('=' * 70)
    for idx, (rec_id, ts, ave, perc, _) in enumerate(rows, 1):
        grade = get_letter_grade(ave)
        print(f"{idx:2d}. {ts}  →  Avg: {ave:5}  |  {perc:5}%  |  {grade}")

    print('-' * 70)
    while True:
        try:
            choice = int(input("\\nEnter record number to view details (0 = back): "))
            if choice == 0:
                return
            if 1 <= choice <= len(rows):
                selected = rows[choice - 1]
                results = json.loads(selected[4])
                ave = selected[2]
                grade = get_letter_grade(ave)

                print('=' * 70)
                print(f"FULL REPORT — {selected[1]}")
                print(f'Name         : {full_name}')
                print(f'AVERAGE      : {ave}')
                print(f'OVERALL GRADE: {grade}')
                print(f'PERCENTAGE   : {selected[3]}%')
                print('SUMMARY OF RESULTS')
                print('-' * 40)
                for sub, mark in results.items():
                    print(f'{sub:<20} : {mark:3} marks')
                print('=' * 70)
                input("\\nPress Enter to return to history...")
                return
            else:
                print("Invalid number!")
        except ValueError:
            print("Please enter a number!")


# ====================== NEW ANALYSIS ======================
def run_new_analysis(full_name: str, user_id: int):
    """For new entry"""
    print("\\n" + "=" * 60)
    print("NEW PERFORMANCE ANALYSIS")
    print("=" * 60)

    num_sub = get_positive_int('Enter number of Subjects: ')
    results = {}
    print('-' * 60)

    for i in range(num_sub):
        sub = get_non_empty_string(f'Enter Subject {i+1}: ')
        num_papers = get_positive_int(f'Enter number of papers for {sub}: ')
        papers_marks = [get_mark(f'Enter marks for Paper {p+1} of {sub}: ')
                        for p in range(num_papers)]

        if num_papers == 1:
            final_mark = papers_marks[0]
        else:
            method = get_aggregation_method(sub)
            if method == 'average':
                final_mark = round(sum(papers_marks) / num_papers, 1)
            elif method == 'max':
                final_mark = max(papers_marks)
            elif method == 'min':
                final_mark = min(papers_marks)
            else:
                final_mark = sum(papers_marks)

        results[sub] = final_mark

    stats = calculate_stats(results, num_sub)
    print_summary(full_name, results, stats)

    if has_matplotlib:
        create_performance_chart(full_name, results, stats['ave'], stats['grade'])
    else:
        print('Matplotlib not installed. To see chart run: pip install matplotlib')

    save_performance_record(user_id, results, stats)


# ====================== MAIN ======================
def main():
    init_db()

    print('WELCOME TO THE ISBAT GRADEHUB')
    print('=' * 70)
    print("Secure login + personal database + auto letter grades!")

    user_id = None
    full_name = None

    while True:
        if user_id is None:
            print("\\n" + "=" * 50)
            print("1. Login")
            print("2. Sign Up")
            print("3. Exit")
            print("=" * 50)
            choice = input("Choose option: ").strip()

            if choice == '1':
                result = login()
                if result:
                    user_id, full_name = result
            elif choice == '2':
                signup()
            elif choice == '3':
                print("Thank you for using ISBAT GradeHub!")
                break
            else:
                print("Invalid option!")

        else:
            print(f"\\nLogged in as: {full_name}")
            print("=" * 50)
            print("1. New Performance Analysis")
            print("2. View My History")
            print("3. Logout")
            print("=" * 50)
            choice = input("Choose option: ").strip()

            if choice == '1':
                run_new_analysis(full_name, user_id)
            elif choice == '2':
                view_history(user_id, full_name)
            elif choice == '3':
                print(f"Goodbye, {full_name}! See you soon")
                user_id = None
                full_name = None
            else:
                print("Invalid option!")


if __name__ == "__main__":
    main()
`
    },
    {
      title: "Simple Bank System",
      desc: "Comprehensive banking simulation with account creation, transactions, and administrative search capabilities.",
      features: ["OOP", "Data Structures", "Security", "Admin Tools"],
      github: "#",
      demo: "#",
      code: `# Simple Bank System in Python
# Features:
# - User can create an account
# - User can deposit money
# - User can withdraw money
# - User can check balance
# - User can delete their account
# - Admin can search for users and view their details

class Account:
    def __init__(self, account_number, name, balance=0):
        self.account_number = account_number
        self.name = name
        self.balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            print(f"Deposited {amount}. New balance: {self.balance}")
        else:
            print("Amount must be positive.")

    def withdraw(self, amount):
        if 0 < amount <= self.balance:
            self.balance -= amount
            print(f"Withdrew {amount}. New balance: {self.balance}")
        else:
            print("Invalid withdrawal amount.")

    def check_balance(self):
        print(f"Balance: {self.balance}")

    def __str__(self):
        return f"Account {self.account_number}: {self.name} - Balance: {self.balance}"

class Bank:
    def __init__(self):
        self.accounts = {}  # account_number: Account
        self.next_account_number = 1001
        self.admin_password = "admin123"  # Simple password for admin

    def create_account(self, name):
        account_number = self.next_account_number
        self.next_account_number += 1
        account = Account(account_number, name)
        self.accounts[account_number] = account
        print(f"Account created: {account}")
        return account_number

    def get_account(self, account_number):
        return self.accounts.get(account_number)

    def delete_account(self, account_number):
        if account_number in self.accounts:
            del self.accounts[account_number]
            print(f"Account {account_number} deleted.")
        else:
            print("Account not found.")

    def admin_search(self, password, search_term):
        if password != self.admin_password:
            print("Invalid admin password.")
            return
        found = []
        for acc in self.accounts.values():
            if search_term.lower() in acc.name.lower() or str(acc.account_number) == search_term:
                found.append(str(acc))
        if found:
            print("Found accounts:")
            for info in found:
                print(info)
        else:
            print("No accounts found.")

def main():
    bank = Bank()
    # Demo mode for playground
    print("--- Simple Bank System Simulation ---")
    acc_num = bank.create_account("STAHIZA USER")
    acc = bank.get_account(acc_num)
    acc.deposit(500)
    acc.withdraw(200)
    acc.check_balance()
    
    print("\\nAdmin Search Demo:")
    bank.admin_search("admin123", "STAHIZA")

if __name__ == "__main__":
    main()
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
