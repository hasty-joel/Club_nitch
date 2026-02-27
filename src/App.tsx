import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import LiveConsole from "./components/LiveConsole";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex flex-col selection:bg-cyan-accent/30 selection:text-white"
      >
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <LiveConsole />
          <Gallery />
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}
