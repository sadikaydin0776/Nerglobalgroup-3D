'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

function Particles({ mouse }: ParticlesProps) {
  const meshRef = useRef<THREE.Points>(null);
  const { size } = useThree();
  const count = 1800;

  const { positions, speeds, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      speeds[i] = Math.random() * 0.3 + 0.05;
      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    return { positions, speeds, sizes };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, sizes]);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      color: new THREE.Color('#D4AF37'),
      size: 0.025,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const posArray = (meshRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArray[i3 + 1] += speeds[i] * 0.003;
      posArray[i3] += Math.sin(time * 0.1 + i) * 0.001;
      if (posArray[i3 + 1] > 6) posArray[i3 + 1] = -6;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;

    // Smooth mouse parallax
    const targetX = mouse.current.x * 0.8;
    const targetY = mouse.current.y * 0.5;
    meshRef.current.rotation.y += (targetX * 0.3 - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.x += (-targetY * 0.2 - meshRef.current.rotation.x) * 0.05;
  });

  return (
    <points ref={meshRef} geometry={geometry} material={material} />
  );
}

function FloatingConnections({ mouse }: ParticlesProps) {
  const meshRef = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2;
    }
    return pos;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      color: new THREE.Color('#FFFFFF'),
      size: 0.04,
      transparent: true,
      opacity: 0.15,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const targetX = mouse.current.x * 0.4;
    const targetY = -mouse.current.y * 0.3;
    meshRef.current.rotation.y += (targetX * 0.2 - meshRef.current.rotation.y) * 0.03;
    meshRef.current.rotation.x += (targetY * 0.15 - meshRef.current.rotation.x) * 0.03;
  });

  return <points ref={meshRef} geometry={geometry} material={material} />;
}

interface ParticleFieldProps {
  className?: string;
}

export function ParticleField({ className }: ParticleFieldProps) {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        <Particles mouse={mouse} />
        <FloatingConnections mouse={mouse} />
      </Canvas>
    </div>
  );
}
