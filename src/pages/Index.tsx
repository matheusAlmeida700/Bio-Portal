
import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import BackgroundScene from '@/components/BackgroundScene';
import TribalCarousel from '@/components/TribalCarousel';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulação de carregamento (pode ser substituído por carregamento real de assets)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);
  
  const handleLoadingComplete = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen">
      {loading ? (
        <LoadingScreen 
          progress={progress} 
          onComplete={handleLoadingComplete} 
        />
      ) : (
        <>
          <BackgroundScene />
          
          <main className="relative z-10">
            {/* Initial screen with name */}
            <header className="min-h-[50vh] flex flex-col items-center justify-center relative z-10 pt-16 mb-12">
              <h1 className="text-5xl md:text-7xl font-bold text-forest-gradient mb-4 text-center forest-glow">
                Portal Etnias Indígenas
              </h1>
              <h2 className="text-xl md:text-2xl text-forest-200 mb-8 text-center">
                Terceiro Ano E - Trabalho de Biologia
              </h2>
              <p className="text-center max-w-lg mx-auto text-forest-100/80 mb-16">
                Explore os sites criados pelos alunos sobre os povos originários do Brasil. 
                Role para baixo para conhecer cada um dos grupos étnicos estudados.
              </p>
              <div className="animate-bounce">
                <svg 
                  className="w-10 h-10 text-forest-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </header>
            
            {/* Carousel with tribal groups */}
            <TribalCarousel />
          </main>
        </>
      )}
    </div>
  );
};

export default Index;
