
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Componente de esferas que representam a natureza e as tribos
const FloatingSpheres = () => {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }
  }, []);

  return (
    <group ref={groupRef}>
      {/* As cores representam as tribos indígenas */}
      <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#15803d" roughness={0.5} metalness={0.2} />
      </Sphere>
      <Sphere args={[0.2, 32, 32]} position={[1.2, 0.5, 0]}>
        <meshStandardMaterial color="#FF6B6B" roughness={0.5} />
      </Sphere>
      <Sphere args={[0.15, 32, 32]} position={[-1, 0.8, 0.5]}>
        <meshStandardMaterial color="#4ECDC4" roughness={0.5} />
      </Sphere>
      <Sphere args={[0.25, 32, 32]} position={[0.5, -1, -0.5]}>
        <meshStandardMaterial color="#FFD166" roughness={0.5} />
      </Sphere>
      <Sphere args={[0.18, 32, 32]} position={[-0.7, -0.5, -0.8]}>
        <meshStandardMaterial color="#06D6A0" roughness={0.5} />
      </Sphere>
      <Sphere args={[0.22, 32, 32]} position={[-0.3, 0.3, 1]}>
        <meshStandardMaterial color="#118AB2" roughness={0.5} />
      </Sphere>
      <Sphere args={[0.17, 32, 32]} position={[0.8, 0.2, -1.2]}>
        <meshStandardMaterial color="#9C6644" roughness={0.5} />
      </Sphere>
    </group>
  );
};

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

    // Quando o progresso estiver completo, anime a saída da tela de carregamento
    if (progress >= 100) {
      const tl = gsap.timeline({ onComplete });
      
      tl.to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        delay: 0.5
      });
      
      tl.to(progressBarRef.current, {
        opacity: 0,
        duration: 0.5
      }, "-=0.3");
      
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 1,
        delay: 0.2
      });
    }
  }, [progress, onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-dark-500 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="w-64 h-64 mb-8">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <FloatingSpheres />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
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

export default LoadingScreen;
