"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Center } from "@react-three/drei";
import type { Group } from "three";
import { imgPath } from "@/lib/imgPath";

function RotatingModel() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(imgPath("/models/bottle-mauperthuis.glb"));

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.4;
  });

  return (
    <Center>
      <group ref={group}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

export default function Bottle3D({ className = "" }: { className?: string }) {
  // Si le conteneur n'a pas encore sa taille finale au montage (polices pas
  // chargées, mise en page pas stabilisée), le canvas R3F peut rester bloqué
  // à sa taille par défaut (300×150). Un signal "resize" différé force le
  // recalcul une fois la mise en page établie.
  useEffect(() => {
    const id = setTimeout(() => window.dispatchEvent(new Event("resize")), 150);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 3.2], fov: 35 }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[2, 3, 4]} intensity={1.4} />
        <directionalLight position={[-2, -1, -3]} intensity={0.5} />
        <Suspense fallback={null}>
          <RotatingModel />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
