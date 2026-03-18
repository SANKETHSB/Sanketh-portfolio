import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function NeuralCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -state.clock.elapsedTime * 0.2;
      innerRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group>
        {/* Outer shell */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2.2, 1]} />
          <meshPhysicalMaterial
            color="#1a3a4a"
            metalness={0.9}
            roughness={0.1}
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Inner glowing core */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[1.5, 2]} />
          <MeshTransmissionMaterial
            backside
            samples={6}
            thickness={0.5}
            chromaticAberration={0.3}
            anisotropy={0.3}
            distortion={0.5}
            distortionScale={0.5}
            temporalDistortion={0.1}
            color="#40b8c4"
            transmissionSampler
          />
        </mesh>

        {/* Core light */}
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="#5dd8e8" transparent opacity={0.8} />
        </mesh>

        <pointLight color="#40b8c4" intensity={5} distance={10} />
      </group>
    </Float>
  );
}

function Particles() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;
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
      <pointsMaterial size={0.03} color="#40b8c4" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#0f1520']} />
        <fog attach="fog" args={['#0f1520', 5, 25]} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
        <NeuralCore />
        <Particles />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
