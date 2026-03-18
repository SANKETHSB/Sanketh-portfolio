import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

function useIsLightTheme() {
  const [isLight, setIsLight] = useState(false);
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('light'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    setIsLight(document.documentElement.classList.contains('light'));
    return () => observer.disconnect();
  }, []);
  return isLight;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      setProgress(Math.min(scrollY / vh, 1));
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return progress;
}

// Shared scroll state for Three.js components
let globalScroll = 0;
function ScrollSync() {
  useEffect(() => {
    const handler = () => {
      globalScroll = Math.min(window.scrollY / window.innerHeight, 1);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return null;
}

function ShardField({ count = 80 }: { count?: number }) {
  const meshes = useRef<THREE.InstancedMesh>(null);
  
  const { origins, targets, rotSpeeds } = useMemo(() => {
    const o: THREE.Vector3[] = [];
    const t: THREE.Vector3[] = [];
    const r: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      // Start clustered in center (core shape)
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.5 + Math.random() * 0.8;
      o.push(new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      ));
      // Fly outward
      t.push(new THREE.Vector3(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 14 - 4,
        (Math.random() - 0.5) * 12
      ));
      r.push(new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ));
    }
    return { origins: o, targets: t, rotSpeeds: r };
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshes.current) return;
    const t = state.clock.elapsedTime;
    const scroll = globalScroll;
    const eased = scroll * scroll; // ease-in

    for (let i = 0; i < count; i++) {
      const ox = origins[i].x, oy = origins[i].y, oz = origins[i].z;
      const tx = targets[i].x, ty = targets[i].y, tz = targets[i].z;
      
      dummy.position.set(
        ox + (tx - ox) * eased,
        oy + (ty - oy) * eased,
        oz + (tz - oz) * eased
      );
      dummy.rotation.set(
        t * rotSpeeds[i].x * (0.3 + eased * 0.7),
        t * rotSpeeds[i].y * (0.3 + eased * 0.7),
        t * rotSpeeds[i].z * (0.3 + eased * 0.7)
      );
      const scale = 0.08 + eased * 0.12;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshes.current.setMatrixAt(i, dummy.matrix);
    }
    meshes.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshes} args={[undefined, undefined, count]}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        color="#40b8c4"
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.7}
        emissive="#40b8c4"
        emissiveIntensity={0.3}
      />
    </instancedMesh>
  );
}

function NeuralCore() {
  const groupRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scroll = globalScroll;
    const scale = Math.max(1 - scroll * 2.5, 0);
    const opacity = Math.max(1 - scroll * 3, 0);

    if (groupRef.current) {
      groupRef.current.scale.setScalar(scale);
      groupRef.current.rotation.y = t * 0.15;
    }
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.1;
      (outerRef.current.material as THREE.MeshPhysicalMaterial).opacity = opacity * 0.4;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.2;
      innerRef.current.rotation.z = t * 0.1;
      (innerRef.current.material as THREE.MeshPhysicalMaterial).opacity = opacity * 0.6;
    }
    if (glowRef.current) {
      const pulse = 0.5 + Math.sin(t * 2) * 0.3;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = opacity * pulse;
      glowRef.current.scale.setScalar(0.5 + Math.sin(t * 1.5) * 0.1);
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={groupRef}>
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[2.2, 1]} />
          <meshPhysicalMaterial
            color="#1a3a4a"
            metalness={0.95}
            roughness={0.05}
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>

        <mesh ref={innerRef}>
          <icosahedronGeometry args={[1.5, 2]} />
          <meshPhysicalMaterial
            color="#40b8c4"
            metalness={0.5}
            roughness={0.3}
            transparent
            opacity={0.6}
            emissive="#40b8c4"
            emissiveIntensity={0.2}
          />
        </mesh>

        <mesh ref={glowRef}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="#5dd8e8" transparent opacity={0.8} />
        </mesh>

        <pointLight color="#40b8c4" intensity={5} distance={10} />
      </group>
    </Float>
  );
}

function Particles() {
  const count = 300;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
      ref.current.rotation.x = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#40b8c4" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function CursorLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (lightRef.current) {
        const x = (e.clientX / window.innerWidth - 0.5) * viewport.width * 1.5;
        const y = -(e.clientY / window.innerHeight - 0.5) * viewport.height * 1.5;
        lightRef.current.position.set(x, y, 3);
      }
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [viewport]);

  return <pointLight ref={lightRef} color="#40b8c4" intensity={2} distance={15} />;
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['hsl(230, 30%, 8%)']} />
        <fog attach="fog" args={['hsl(230, 30%, 8%)', 5, 30]} />
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} />
        <ScrollSync />
        <CursorLight />
        <NeuralCore />
        <ShardField />
        <Particles />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
