import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer Hexagon */}
        <path
          d="M50 5L89.5 27.5V72.5L50 95L10.5 72.5V27.5L50 5Z"
          stroke="currentColor"
          strokeWidth="4"
          className="text-cyan-accent"
        />
        
        {/* Inner Stylized 'S' / Circuit Pattern */}
        <path
          d="M35 35H65V45H45V55H65V65H35"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gold-cta"
        />
        
        {/* Glowing Dots */}
        <circle cx="35" cy="35" r="3" fill="currentColor" className="text-cyan-accent animate-pulse" />
        <circle cx="35" cy="65" r="3" fill="currentColor" className="text-cyan-accent animate-pulse" />
        <circle cx="65" cy="45" r="3" fill="currentColor" className="text-cyan-accent animate-pulse" />
        <circle cx="65" cy="55" r="3" fill="currentColor" className="text-cyan-accent animate-pulse" />
      </svg>
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-cyan-accent/20 blur-lg rounded-full -z-10"></div>
    </div>
  );
};
