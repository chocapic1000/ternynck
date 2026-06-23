"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Center, Bounds } from "@react-three/drei";
import type { Group } from "three";
import { imgPath } from "@/lib/imgPath";

function RotatingModel({
  modelPath,
  spin,
  rotationY = 0,
}: {
  modelPath: string;
  spin: boolean;
  rotationY?: number;
}) {
  const group = useRef<Group>(null);

  const { scene } = useGLTF(imgPath(modelPath));

  useFrame((_, delta) => {
    if (group.current && spin) group.current.rotation.y += delta * 0.4;
  });

  return (
    <Center>
      <group ref={group} rotation={[0, rotationY, 0]}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

export default function Bottle3D({
  className = "",
  modelPath = "/models/bottle-mauperthuis.glb",
  spin = true,
  rotationY = 0,
}: {
  className?: string;
  modelPath?: string;
  spin?: boolean;
  rotationY?: number;
}) {
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
      <Canvas camera={{ fov: 35 }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[2, 3, 4]} intensity={1.4} />
        <directionalLight position={[-2, -1, -3]} intensity={0.5} />
        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.2}>
            <RotatingModel modelPath={modelPath} spin={spin} rotationY={rotationY} />
          </Bounds>
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
