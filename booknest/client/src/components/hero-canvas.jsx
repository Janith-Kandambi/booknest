import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useRef } from 'react';

function FloatingBook() {
  const bookRef = useRef(null);
  const ringRef = useRef(null);

  useFrame((_, delta) => {
    if (bookRef.current) {
      bookRef.current.rotation.y += delta * 0.45;
      bookRef.current.rotation.x = Math.sin(Date.now() * 0.0008) * 0.08;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.25;
    }
  });

  return (
    <>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1.1}>
        <mesh ref={bookRef}>
          <boxGeometry args={[1.85, 1.2, 0.22]} />
          <meshStandardMaterial color="#fff7ed" roughness={0.4} metalness={0.05} />
        </mesh>
      </Float>

      <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[2.35, 0.025, 16, 80]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.12} />
      </mesh>

      <mesh position={[0.65, 0, 0.125]}>
        <boxGeometry args={[0.08, 1.1, 0.02]} />
        <meshStandardMaterial color="#fb923c" />
      </mesh>
    </>
  );
}

export function HeroCanvas() {
  return (
    <div className="h-[220px] w-full overflow-hidden rounded-2xl sm:h-[250px] md:h-[330px] lg:h-[390px]">
      <Canvas camera={{ position: [0, 0.2, 4.2], fov: 42 }}>
        <color attach="background" args={['#fffdf9']} />
        <ambientLight intensity={0.6} />
        <directionalLight intensity={1.1} position={[2, 3, 2]} />
        <pointLight intensity={0.7} position={[-2, -1, 2]} color="#fdba74" />
        <FloatingBook />
      </Canvas>
    </div>
  );
}
