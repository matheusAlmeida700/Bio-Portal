import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TribalCard from "./TribalCard";

const tribalGroups = [
  {
    id: "guarani",
    name: "Guarani",
    description:
      "Povo originário que habita a região sul e sudeste do Brasil, além de Paraguai, Argentina e Bolívia.",
    color: "tribe-guarani",
    image:
      "https://images.unsplash.com/photo-1590452224879-867e8012a828?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: "pataxos",
    name: "Pataxós",
    description:
      "Habitantes do extremo sul da Bahia e norte de Minas Gerais, conhecidos por sua luta pela terra.",
    color: "tribe-pataxos",
    image:
      "https://images.unsplash.com/photo-1590452224879-867e8012a828?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: "yanomamis",
    name: "Yanomamis",
    description:
      "Vivem na fronteira entre Brasil e Venezuela, na região amazônica, com rica cultura e cosmologia.",
    color: "tribe-yanomamis",
    image:
      "https://images.unsplash.com/photo-1590452224879-867e8012a828?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: "baniwa",
    name: "Baniwa",
    description:
      "Povo indígena que habita a região do Alto Rio Negro, com tradições ligadas à pesca e artesanato.",
    color: "tribe-baniwa",
    image:
      "https://images.unsplash.com/photo-1590452224879-867e8012a828?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: "xavantes",
    name: "Xavantes",
    description:
      "Habitantes do cerrado brasileiro, conhecidos por suas corridas de tora e organização social.",
    color: "tribe-xavantes",
    image:
      "https://images.unsplash.com/photo-1590452224879-867e8012a828?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: "krenak",
    name: "Krenak",
    description:
      "Grupo étnico que habita o vale do Rio Doce, profundamente afetado pelo desastre de Mariana.",
    color: "tribe-krenak",
    image:
      "https://images.unsplash.com/photo-1590452224879-867e8012a828?q=80&w=1170&auto=format&fit=crop",
  },
];

const TribalCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10">
      <Carousel className="w-full">
        <CarouselContent>
          {tribalGroups.map((tribe, index) => (
            <CarouselItem key={tribe.id} className="md:basis-1/1 lg:basis-1/1">
              <div className="p-1">
                <TribalCard tribe={tribe} isActive={true} number={index + 1} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-2 mt-4">
          <CarouselPrevious className="relative static left-auto translate-y-0" />
          <CarouselNext className="relative static right-auto translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default TribalCarousel;
