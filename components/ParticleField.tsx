'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface MouseRef {
  x: number;
  y: number;
}

// Neural network: particles + connecting lines
function NeuralNet({ mouse }: { mouse: React.MutableRefObject<MouseRef> }) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const COUNT = 120;

  const { nodes, positions, velocities } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    const positions = new Float32Array(COUNT * 3);
    const velocities: THREE.Vector3[] = [];

    for (let i = 0; i < COUNT; i++) {
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 6
      );
      nodes.push(v);
      positions[i * 3] = v.x;
      positions[i * 3 + 1] = v.y;
      positions[i * 3 + 2] = v.z;

      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.006,
          (Math.random() - 0.5) * 0.003
        )
      );
    }
    return { nodes, positions, velocities };
  }, []);

  const dotGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    return geo;
  }, [positions]);

  const dotMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: '#D4AF37',
        size: 0.06,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  const { lineGeo, linePos } = useMemo(() => {
    const maxLines = COUNT * 4;
    const linePos = new Float32Array(maxLines * 2 * 3);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    lineGeo.setDrawRange(0, 0);
    return { lineGeo, linePos };
  }, []);

  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: '#D4AF37',
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame(() => {
    if (!groupRef.current) return;

    // Move nodes
    for (let i = 0; i < COUNT; i++) {
      nodes[i].add(velocities[i]);
      // Bounce
      if (Math.abs(nodes[i].x) > 11) velocities[i].x *= -1;
      if (Math.abs(nodes[i].y) > 6) velocities[i].y *= -1;
      if (Math.abs(nodes[i].z) > 3) velocities[i].z *= -1;
    }

    // Update dot positions
    const posAttr = dotGeo.attributes.position as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      posArr[i * 3] = nodes[i].x;
      posArr[i * 3 + 1] = nodes[i].y;
      posArr[i * 3 + 2] = nodes[i].z;
    }
    posAttr.needsUpdate = true;

    // Build connection lines for nearby pairs
    let lineCount = 0;
    const maxDist = 3.5;
    const maxLines = COUNT * 4;

    for (let i = 0; i < COUNT && lineCount < maxLines - 1; i++) {
      for (let j = i + 1; j < COUNT && lineCount < maxLines - 1; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < maxDist) {
          const idx = lineCount * 6;
          linePos[idx] = nodes[i].x;
          linePos[idx + 1] = nodes[i].y;
          linePos[idx + 2] = nodes[i].z;
          linePos[idx + 3] = nodes[j].x;
          linePos[idx + 4] = nodes[j].y;
          linePos[idx + 5] = nodes[j].z;
          lineCount++;
        }
      }
    }

    const lineAttr = lineGeo.attributes.position as THREE.BufferAttribute;
    (lineAttr.array as Float32Array).set(linePos);
    lineAttr.needsUpdate = true;
    lineGeo.setDrawRange(0, lineCount * 2);

    // Mouse parallax
    const tx = mouse.current.x * 1.5;
    const ty = mouse.current.y * 1.0;
    groupRef.current.rotation.y += (tx * 0.3 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (-ty * 0.25 - groupRef.current.rotation.x) * 0.04;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={dotGeo} material={dotMat} />
      <lineSegments ref={linesRef} geometry={lineGeo} material={lineMat} />
    </group>
  );
}

// Ambient floating particles background
function AmbientParticles({ mouse }: { mouse: React.MutableRefObject<MouseRef> }) {
  const meshRef = useRef<THREE.Points>(null);
  const COUNT = 600;

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
      speeds[i] = Math.random() * 0.2 + 0.02;
    }
    return { positions, speeds };
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    return g;
  }, [positions]);

  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: '#ffffff',
        size: 0.02,
        transparent: true,
        opacity: 0.2,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const arr = (meshRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] += speeds[i] * 0.004;
      arr[i * 3] += Math.sin(time * 0.05 + i * 0.3) * 0.001;
      if (arr[i * 3 + 1] > 9) arr[i * 3 + 1] = -9;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;

    const tx = mouse.current.x * 0.5;
    const ty = -mouse.current.y * 0.3;
    meshRef.current.rotation.y += (tx * 0.15 - meshRef.current.rotation.y) * 0.03;
    meshRef.current.rotation.x += (ty * 0.1 - meshRef.current.rotation.x) * 0.03;
  });

  return <points ref={meshRef} geometry={geo} material={mat} />;
}

// Subtle 3D grid plane
function GridPlane({ mouse }: { mouse: React.MutableRefObject<MouseRef> }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(30, 18, 30, 18);
    return g;
  }, []);

  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#D4AF37',
        wireframe: true,
        transparent: true,
        opacity: 0.04,
      }),
    []
  );

  useFrame(() => {
    if (!meshRef.current) return;
    const tx = mouse.current.x * 0.5;
    const ty = -mouse.current.y * 0.3;
    meshRef.current.rotation.x += (-0.3 + ty * 0.08 - meshRef.current.rotation.x) * 0.03;
    meshRef.current.rotation.y += (tx * 0.1 - meshRef.current.rotation.y) * 0.03;
  });

  return (
    <mesh ref={meshRef} geometry={geo} material={mat} position={[0, -2, -4]} />
  );
}

export function ParticleField({ className }: { className?: string }) {
  const mouse = useRef<MouseRef>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 70 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <GridPlane mouse={mouse} />
        <NeuralNet mouse={mouse} />
        <AmbientParticles mouse={mouse} />
      </Canvas>
    </div>
  );
}
