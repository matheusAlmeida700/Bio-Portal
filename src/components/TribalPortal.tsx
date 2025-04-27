import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TribalCard from "./TribalCard";

gsap.registerPlugin(ScrollTrigger);

const tribalGroups = [
  {
    id: "guarani",
    name: "Guarani",
    description:
      "Povo originário que habita a região sul e sudeste do Brasil, além de Paraguai, Argentina e Bolívia.",
    group: "Lucas, Igor, João Alexandre, João Vittor, Gustavo Barrinha",
    color: "tribe-guarani",
    image:
      "https://midianinja.org/wp-content/uploads/2018/05/36805711591_6ddf00c223_k.jpg",
    url: "https://povo-guarani-brasil.vercel.app/",
  },
  {
    id: "pataxos",
    name: "Pataxós",
    description:
      "Habitantes do extremo sul da Bahia e norte de Minas Gerais, conhecidos por sua luta pela terra.",
    group:
      "Ana Caroline Mena Bezerra de Paula, Isabela Costa Jeronymo, Luany Urtado Santos, Nycolle Barbosa, Nathália Almeida Yoshioka",
    color: "tribe-pataxos",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/43/Two_Pataxo_indians_%28Bras%C3%ADlia%2C_04_April_2006%29.jpeg",
    url: "https://natzada.github.io/pataxos/",
  },
  {
    id: "yanomamis",
    name: "Yanomamis",
    description:
      "Vivem na fronteira entre Brasil e Venezuela, na região amazônica, com rica cultura e cosmologia.",
    group:
      "Isabela Etore, Isabella Carolina, Júlia Garcia, Queren Hapuque,s Victoria de Mattos",
    color: "tribe-yanomamis",
    image: "https://img.socioambiental.org/d/373345-1/103_0302.jpg",
    url: "https://juhgarcia.github.io/Site-yanomami-grupo-IIJQV/",
  },
  {
    id: "baniwa",
    name: "Baniwa",
    description:
      "Povo indígena que habita a região do Alto Rio Negro, com tradições ligadas à pesca e artesanato.",
    group: "",
    color: "tribe-baniwa",
    image:
      "https://www.gov.br/funai/pt-br/assuntos/noticias/2023/indigena-do-povo-baniwa-maria-do-rosario-assume-a-coordenacao-da-funai-no-rio-negro-am/whatsapp-image-2023-05-06-at-11-04-31.jpeg/@@images/208f11f5-adaf-4e58-8c0e-06fd321a3f0a.jpeg",
    url: "https://site-baniwa.com",
  },
  {
    id: "xavantes",
    name: "Xavantes",
    description:
      "Habitantes do cerrado brasileiro, conhecidos por suas corridas de tora e organização social.",
    group: "Thafany, Isabely, Ana Julia, Lauren, Ana Carolina",
    color: "tribe-xavantes",
    image:
      "https://www.gov.br/funai/pt-br/assuntos/noticias/2022-02/no-mato-grosso-indigenas-da-etnia-xavante-realizam-rituais-tradicionais/2__visita_a_terras_xavante_-c-_funai__-277.jpg",
    url: "https://thapassos.github.io/Os-Xavantes/",
  },
  {
    id: "krenak",
    name: "Krenak",
    description:
      "Grupo étnico que habita o vale do Rio Doce, profundamente afetado pelo desastre de Mariana.",
    group:
      "Matheus Almeida, Murilo Moreno, Gabriel Luis, Marco Antônio, Isabelly Chirai",
    color: "tribe-krenak",
    image:
      "https://www.letrasambientais.org.br/img/posts/Indigenas_e_epidemias.jpg",
    url: "https://krenaks.netlify.app/",
  },
];

const TribalPortal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (headingRef.current) {
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
      });
    }

    if (containerRef.current) {
      const sections = containerRef.current.querySelectorAll(".tribal-section");

      sections.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });

        gsap.fromTo(
          section,
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
              scrub: true,
            },
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleNavigationClick = (
    tribe: (typeof tribalGroups)[number],
    index: number
  ) => {
    const isInternal = document.getElementById(tribe.id);

    if (isInternal) {
      document.getElementById(tribe.id)?.scrollIntoView({ behavior: "smooth" });
      setActiveIndex(index);
    } else {
      window.open(tribe.url, "_blank");
    }
  };

  return (
    <div className="min-h-screen">
      <header className="min-h-screen flex flex-col items-center justify-center relative z-10">
        <img className="absolute top-10 mx-auto w-36" src="sesi.png" alt="" />
        <h1
          ref={headingRef}
          className="text-5xl md:text-7xl font-bold text-forest-gradient mb-4 pb-4 text-center forest-glow"
        >
          Portal Etnias Indígenas
        </h1>
        <h2 className="text-xl md:text-2xl text-forest-200 mb-2 text-center">
          Terceiro Ano E - Trabalho de Biologia
        </h2>
        <h3 className="text-md md:text-xl text-forest-200/80 mb-8 text-center">
          Professora Tatiane Balbo
        </h3>
        <p className="text-center max-w-lg mx-auto text-forest-100/80 mb-16">
          Explore os sites criados pelos alunos sobre os povos originários do
          Brasil. Role para baixo para conhecer cada um dos grupos étnicos
          estudados.
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

      <div ref={containerRef} className="py-16 space-y-36">
        {tribalGroups.map((tribe, index) => (
          <section
            key={tribe.id}
            id={tribe.id}
            className="tribal-section flex flex-col items-center px-4 min-h-screen"
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
                  : "bg-dark-300"
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
