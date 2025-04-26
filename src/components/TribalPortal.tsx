
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TribalCard from './TribalCard';

// Importar GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Dados das tribos
const tribalGroups = [
  {
    id: 'guarani',
    name: 'Guarani',
    description: 'Povo originário que habita a região sul e sudeste do Brasil, além de Paraguai, Argentina e Bolívia.',
    color: 'tribe-guarani',
    image: 'https://images.unsplash.com/photo-1590452224879-867e8012a828?q=80&w=1170&auto=format&fit=crop'
  },
  {
    id: 'pataxos',
    name: 'Pataxós',
    description: 'Habitantes do extremo sul da Bahia e norte de Minas Gerais, conhecidos por sua luta pela terra.',
    color: 'tribe-pataxos',
    image: 'https://images.unsplash.com/photo-1590452224879-867e8012a828?q=80&w=1170&auto=format&fit=crop'
  },
  {
    id: 'yanomamis',
    name: 'Yanomamis',
    description: 'Vivem na fronteira entre Brasil e Venezuela, na região amazônica, com rica cultura e cosmologia.',
    color: 'tribe-yanomamis',
    image: 'https://images.unsplash.com/photo-1590452224879-867e8012a828?q=80&w=1170&auto=format&fit=crop'
  },
  {
    id: 'baniwa',
    name: 'Baniwa',
    description: 'Povo indígena que habita a região do Alto Rio Negro, com tradições ligadas à pesca e artesanato.',
    color: 'tribe-baniwa',
    image: 'https://images.unsplash.com/photo-1590452224879-867e8012a828?q=80&w=1170&auto=format&fit=crop'
  },
  {
    id: 'xavantes',
    name: 'Xavantes',
    description: 'Habitantes do cerrado brasileiro, conhecidos por suas corridas de tora e organização social.',
    color: 'tribe-xavantes',
    image: 'https://images.unsplash.com/photo-1590452224879-867e8012a828?q=80&w=1170&auto=format&fit=crop'
  },
  {
    id: 'krenak',
    name: 'Krenak',
    description: 'Grupo étnico que habita o vale do Rio Doce, profundamente afetado pelo desastre de Mariana.',
    color: 'tribe-krenak',
    image: 'https://images.unsplash.com/photo-1590452224879-867e8012a828?q=80&w=1170&auto=format&fit=crop'
  }
];

const TribalPortal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    // Animação inicial do título
    gsap.from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out"
    });
    
    // Configura o ScrollTrigger para cada seção
    if (containerRef.current) {
      const sections = containerRef.current.querySelectorAll('.tribal-section');
      
      sections.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
        
        // Anima cada seção quando ela entra em vista
        gsap.fromTo(section, 
          { y: 100, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "center center",
              scrub: true
            }
          }
        );
      });
    }
    
    // Limpa os ScrollTriggers quando o componente é desmontado
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      <header className="min-h-[50vh] flex flex-col items-center justify-center relative z-10 pt-16">
        <h1 
          ref={headingRef}
          className="text-5xl md:text-7xl font-bold text-forest-gradient mb-4 text-center forest-glow"
        >
          Portal Etnias Indígenas
        </h1>
        <h2 className="text-xl md:text-2xl text-forest-200 mb-8 text-center">
          Terceiro Ano E - Trabalho de Biologia
        </h2>
        <p className="text-center max-w-lg mx-auto text-forest-100/80 mb-16">
          Explore os sites criados pelos alunos sobre os povos originários do Brasil. 
          Role para baixo para conhecer cada um dos grupos étnicos estudados.
        </p>
        <div className="absolute bottom-8 animate-bounce">
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
      
      <div 
        ref={containerRef}
        className="py-16 space-y-36"
      >
        {tribalGroups.map((tribe, index) => (
          <section 
            key={tribe.id} 
            id={tribe.id}
            className={`tribal-section flex flex-col items-center px-4 min-h-screen`}
          >
            <TribalCard 
              tribe={tribe} 
              isActive={index === activeIndex}
              number={index + 1}
            />
          </section>
        ))}
      </div>
      
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
        <nav className="space-y-4">
          {tribalGroups.map((tribe, index) => (
            <a
              key={tribe.id}
              href={`#${tribe.id}`}
              className={`block w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? `bg-${tribe.color} shadow-[0_0_10px_rgba(34,197,94,0.7)]` 
                  : 'bg-dark-300'
              }`}
              aria-label={`Navegar para ${tribe.name}`}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TribalPortal;
