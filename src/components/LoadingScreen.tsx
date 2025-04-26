
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  progress: number;
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress, onComplete }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.5,
        ease: "power1.out"
      });
    }

    if (textRef.current) {
      gsap.to(textRef.current, {
        innerHTML: `${Math.floor(progress)}%`,
        duration: 0.3,
        snap: { innerHTML: 1 }
      });
    }

    // When progress is complete, animate the loading screen exit
    if (progress >= 100) {
      const tl = gsap.timeline({ onComplete });
      
      if (textRef.current) {
        tl.to(textRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          delay: 0.5
        });
      }
      
      if (progressBarRef.current) {
        tl.to(progressBarRef.current, {
          opacity: 0,
          duration: 0.5
        }, "-=0.3");
      }
      
      if (containerRef.current) {
        tl.to(containerRef.current, {
          opacity: 0,
          duration: 1,
          delay: 0.2
        });
      }
    }
  }, [progress, onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-dark-500 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="w-64 h-64 mb-8 flex items-center justify-center">
        <div className="relative w-40 h-40">
          {[...Array(7)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full animate-pulse" 
              style={{
                width: `${40 - i * 5}%`,
                height: `${40 - i * 5}%`,
                top: `${30 + i * 5}%`,
                left: `${30 + i * 5}%`,
                backgroundColor: getColor(i),
                animationDelay: `${i * 0.15}s`,
                animationDuration: `${1.5 + i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-forest-gradient">
        Portal Etnias Indígenas
      </h1>
      <h2 className="text-xl mb-8 text-forest-200">Terceiro Ano E</h2>

      <div className="w-72 h-2 bg-dark-300 rounded-full overflow-hidden">
        <div 
          ref={progressBarRef} 
          className="h-full bg-gradient-to-r from-forest-700 to-forest-400 rounded-full" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <div ref={textRef} className="mt-2 text-forest-300">
        {Math.floor(progress)}%
      </div>
    </div>
  );
};

// Helper function to get colors for circles
const getColor = (index: number): string => {
  const colors = [
    '#15803d', // green-700
    '#FF6B6B', // red
    '#4ECDC4', // teal
    '#FFD166', // yellow
    '#06D6A0', // green-light
    '#118AB2', // blue
    '#9C6644'  // brown
  ];
  return colors[index % colors.length];
};

export default LoadingScreen;
