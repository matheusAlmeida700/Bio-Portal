
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Static, simpler background scene without complex animations
const BackgroundScene: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[0, 10, 5]} intensity={1} />
        <fog attach="fog" args={['#0f172a', 10, 50]} />
        
        {/* Central sphere */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial 
            color="#166534" 
            roughness={0.4} 
            metalness={0.3}
          />
        </mesh>
        
        {/* Particle system */}
        <ParticleField />
        
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

// Static particle field 
const ParticleField = () => {
  const particlePositions = React.useMemo(() => {
    const positions = [];
    const count = 200; // Reduced particle count for better performance
    
    for (let i = 0; i < count; i++) {
      // Distribute particles in sphere shape
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 10 + Math.random() * 10;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions.push(new THREE.Vector3(x, y, z));
    }
    
    return positions;
  }, []);

  return (
    <group>
      <pointLight position={[5, 5, 5]} distance={20} intensity={5} color="#4ade80" />
      
      {particlePositions.map((position, i) => (
        <mesh key={i} position={[position.x, position.y, position.z]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#4ade80" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
};

export default BackgroundScene;
