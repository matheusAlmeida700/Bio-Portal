import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";

interface Tribe {
  id: string;
  name: string;
  description: string;
  group: string;
  color: string;
  image: string;
  url?: string;
}

interface TribalCardProps {
  tribe: Tribe;
  isActive: boolean;
  number: number;
}

const TribalCard: React.FC<TribalCardProps> = ({ tribe, isActive, number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && cardRef.current && imageRef.current && contentRef.current) {
      // Animação quando o card fica ativo
      gsap.to(cardRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });

      // Anima a imagem
      gsap.to(imageRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.7,
        delay: 0.2,
        ease: "power2.out",
      });

      // Anima o conteúdo
      gsap.to(contentRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.7,
        delay: 0.4,
        ease: "power2.out",
      });
    } else if (cardRef.current) {
      // Animação quando o card fica inativo
      gsap.to(cardRef.current, {
        scale: 0.95,
        opacity: 0.7,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [isActive]);

  // Function to map tribe.color to actual Tailwind classes
  const getColorClass = (colorName: string, type: string) => {
    const colorMap: Record<string, Record<string, string>> = {
      "tribe-guarani": {
        bg: "bg-green-500",
        text: "text-green-500",
        hover: "hover:bg-green-600",
      },
      "tribe-pataxos": {
        bg: "bg-blue-500",
        text: "text-blue-500",
        hover: "hover:bg-blue-600",
      },
      "tribe-yanomamis": {
        bg: "bg-red-500",
        text: "text-red-500",
        hover: "hover:bg-red-600",
      },
      "tribe-baniwa": {
        bg: "bg-yellow-500",
        text: "text-yellow-500",
        hover: "hover:bg-yellow-600",
      },
      "tribe-xavantes": {
        bg: "bg-purple-500",
        text: "text-purple-500",
        hover: "hover:bg-purple-600",
      },
      "tribe-krenak": {
        bg: "bg-orange-500",
        text: "text-orange-500",
        hover: "hover:bg-orange-600",
      },
    };

    return colorMap[colorName]?.[type] || `${type}-green-500`;
  };

  return (
    <div
      ref={cardRef}
      className={`glass-effect w-full max-w-6xl rounded-xl overflow-hidden transition-all duration-500
        ${isActive ? "scale-100 opacity-100" : "scale-95 opacity-70"}`}
    >
      <div className="flex flex-col lg:flex-row h-full">
        <div
          ref={imageRef}
          className="lg:w-1/2 h-64 lg:h-auto relative opacity-0 transform translate-x-[-50px]"
          style={{
            backgroundImage: `url(${tribe.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className={`absolute inset-0 ${getColorClass(
              tribe.color,
              "bg"
            )}/30 mix-blend-overlay`}
          ></div>
          <div className="absolute top-4 left-4">
            <div className="w-12 h-12 rounded-full bg-dark-400/80 flex items-center justify-center backdrop-blur-sm">
              <span className={getColorClass(tribe.color, "text")}>
                {number}
              </span>
            </div>
          </div>
        </div>

        <div
          ref={contentRef}
          className="p-8 lg:p-12 lg:w-1/2 flex flex-col justify-center opacity-0 transform translate-x-[50px]"
        >
          <h2
            className={`text-4xl lg:text-5xl font-bold mb-4 ${getColorClass(
              tribe.color,
              "text"
            )}`}
          >
            {tribe.name}
          </h2>

          <p className="text-lg mb-2 text-gray-300">{tribe.description}</p>

          <p className="text-lg mb-8 text-gray-400">{tribe.group}</p>

          <div className="mt-auto">
            {tribe.url && (
              <Button
                asChild
                className={`${getColorClass(tribe.color, "bg")} ${getColorClass(
                  tribe.color,
                  "hover"
                )} text-white px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105`}
              >
                <a href={tribe.url} target="_blank" rel="noopener noreferrer">
                  Explorar Site
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TribalCard;
