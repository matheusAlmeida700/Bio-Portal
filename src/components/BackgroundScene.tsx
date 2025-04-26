
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import gsap from 'gsap';

// Partículas flutuantes que representam a natureza e a floresta
const Particles = ({ count = 800 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const light = useRef<THREE.PointLight>(null);
  
  useEffect(() => {
    if (mesh.current) {
      let i = 0;
      const matrix = new THREE.Matrix4();
      const dummy = new THREE.Object3D();
      const positions = [];

      for (let i = 0; i < count; i++) {
        // Distribuir as partículas em forma de esfera
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const radius = 15 + Math.random() * 15;

        dummy.position.x = radius * Math.sin(phi) * Math.cos(theta);
        dummy.position.y = radius * Math.sin(phi) * Math.sin(theta);
        dummy.position.z = radius * Math.cos(phi);
        
        const scale = Math.random() * 0.5 + 0.1;
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();
        
        mesh.current.setMatrixAt(i, dummy.matrix);
        positions.push(dummy.position.x, dummy.position.y, dummy.position.z);
      }
      
      mesh.current.instanceMatrix.needsUpdate = true;

      // Animar a luz
      if (light.current) {
        gsap.to(light.current.position, {
          x: 5,
          y: 5,
          z: 5,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    }
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group>
      <pointLight ref={light} distance={20} intensity={5} color="#4ade80" />
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#4ade80" transparent opacity={0.5} />
      </instancedMesh>
    </group>
  );
};

// Esfera central distorcida que representa a conexão entre as tribos
const CentralSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#166534"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.4}
        metalness={0.3}
      />
    </Sphere>
  );
};

const BackgroundScene: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[0, 10, 5]} intensity={1} />
        <fog attach="fog" args={['#0f172a', 10, 50]} />
        <CentralSphere />
        <Particles />
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

export default BackgroundScene;
