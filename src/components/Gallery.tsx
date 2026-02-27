import React from "react";
import { motion } from "motion/react";
import { Download } from "lucide-react";

const techImages = [
  {
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    title: "Software Development",
    category: "Coding"
  },
  {
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    title: "Collaborative Learning",
    category: "Community"
  },
  {
    url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    title: "Network Security",
    category: "Cyber"
  },
  {
    url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    title: "Innovation Lab",
    category: "Tech"
  },
  {
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    title: "Hardware Engineering",
    category: "Robotics"
  },
  {
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    title: "Data Science",
    category: "Analytics"
  }
];

const trendImages = [
  { url: "/gallery/team-spirit.jpg", title: "Team Spirit", category: "2025 Trend" },
  { url: "/gallery/focus-&-determination.jpg", title: "Focus & Determination", category: "2025 Trend" },
  { url: "/gallery/collaborative-coding.jpg", title: "Collaborative Coding", category: "2025 Trend" },
  { url: "/gallery/victory-moment.jpg", title: "Victory Moment", category: "2025 Trend" },
  { url: "/gallery/innovation-leaders.jpg", title: "Innovation Leaders", category: "2025 Trend" },
  { url: "/gallery/future-vision.jpg", title: "Future Vision", category: "2025 Trend" },
  { url: "/gallery/team-excellence.jpg", title: "Team Excellence", category: "2025 Trend" },
  { url: "/gallery/coding-champions.jpg", title: "Coding Champions", category: "2025 Trend" },
  { url: "/gallery/the-hub-family.jpg", title: "The Hub Family", category: "2025 Trend" },
  { url: "/gallery/the-hub-family.jpg", title: "The Hub Family", category: "2025 Trend" },
];


export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-dark-bg relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-cyan-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-gold-cta/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-cyan-accent">05.</span> Visual Gallery
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A glimpse into the life and innovation at STAHIZA ICT HUB.
          </p>
          <div className="w-20 h-1 bg-gold-cta mx-auto mt-6"></div>
        </motion.div>

        {/* Technical Stack Gallery */}
        <div className="mb-20">
          <h3 className="text-xl font-bold text-white mb-8 font-mono flex items-center gap-3">
            <span className="w-8 h-[1px] bg-cyan-accent"></span>
            Technical Stack
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techImages.map((image, index) => (
              <GalleryItem key={`tech-${index}`} image={image} index={index} />
            ))}
          </div>
        </div>

        {/* Them (Last year trend) Gallery */}
        <div>
          <h3 className="text-xl font-bold text-white mb-8 font-mono flex items-center gap-3">
            <span className="w-8 h-[1px] bg-gold-cta"></span>
            theme(Last year trend)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendImages.map((image, index) => (
              <GalleryItem key={`trend-${index}`} image={image} index={index} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-slate-500 font-mono text-sm">
            // End of gallery. More updates coming soon.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

interface GalleryItemProps {
  image: {
    url: string;
    title: string;
    category: string;
  };
  index: number;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ image, index }) => {
  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${image.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback: open in new tab
      window.open(image.url, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-navy-primary/20"
    >
      <img
        src={image.url}
        alt={image.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-100"
        referrerPolicy="no-referrer"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <span className="text-cyan-accent text-[10px] font-mono uppercase tracking-[0.2em] mb-2">
          {image.category}
        </span>
        <h3 className="text-white font-bold text-lg">
          {image.title}
        </h3>
        <button
          onClick={handleDownload}
          className="mt-4 flex items-center gap-2 text-xs font-mono text-gold-cta hover:text-white transition-colors group/btn"
        >
          <Download className="w-3 h-3 group-hover/btn:scale-110 transition-transform" />
          <span>DOWNLOAD_ASSET</span>
        </button>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-cyan-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-cyan-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );
}
