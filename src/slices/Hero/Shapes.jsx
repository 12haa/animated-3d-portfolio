"use client";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Shapes() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 20], fov: 25, near: 1, far: 40 }}
      >
        <Suspense fallback={null}>
          <Geometries />
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={40}
            blur={1}
            far={9}
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Geometries() {
  const geometries = [
    {
      position: [0, 0, 0],
      r: 0.8,
      geometry: new THREE.IcosahedronGeometry(3), // Gem
    },
    {
      position: [1, -0.1, 4],
      r: 1.2,
      geometry: new THREE.CapsuleGeometry(0.3, 0.8, 2, 16), //Capsul
    },
    {
      position: [-1.8, 2, -4],
      r: 1,
      geometry: new THREE.DodecahedronGeometry(1.5), // Soccer Ball
    },

    {
      position: [-0.7, -0.55, 5],
      r: 0.6,
      geometry: new THREE.TorusGeometry(0.5, 0.2, 16, 20), // Donut
    },
    {
      position: [1.6, 2.2, -4],
      r: 0.7,
      geometry: new THREE.OctahedronGeometry(1.5), // Gem
    },
  ];
  const materials = [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshStandardMaterial({
      color: 0x2ecc71,
      roughness: 0,
    }),
    new THREE.MeshStandardMaterial({
      color: 0xf1c40f,
      roughness: 0,
    }),
    new THREE.MeshStandardMaterial({
      color: 0xe74c3c,
      roughness: 0,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x8e44ad,
      roughness: 0,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x1abc9c,
      roughness: 0,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x2980b9,
      roughness: 0,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x2c3e50,
      roughness: 0.1,
      metalness: 0.5,
    }),
  ];
  const soundEffects = [
    new Audio("/sounds/kno1.ogg"),
    new Audio("/sounds/kno2.ogg"),
    new Audio("/sounds/kno3.ogg"),
    new Audio("/sounds/kno4.ogg"),
    new Audio("/sounds/kno6.ogg"),
  ];
  return geometries.map(({ position, r, geometry, soundEffects }) => (
    <Geometry
      key={JSON.stringify(position)}
      position={position.map((p) => p * 2)}
      geometry={geometry}
      materials={materials}
      soudEffects={soundEffects}
      r={r}
    />
  ));
}

function Geometry({ r, position, geometry, materials }) {
  const meshRef = useRef();
  const [visible, setVisible] = useState(false);
  const startingMaterial = getRandomMaterial();

  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }
  function handleClick(e) {
    const mesh = e.object;

    // gsap.utils.random(soudEffects).play();

    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 2)}}`,
      y: `+=${gsap.utils.random(0, 2)}}`,
      z: `+=${gsap.utils.random(0, 2)}}`,
      duration: 1.3,
      ease: "elastic.out(1, 0.3)",
      yoyo: true,
    });

    mesh.material = getRandomMaterial();
  }
  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };
  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };
  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisible(true);
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
        delay: 0.3,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <group position={position} ref={meshRef}>
      <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          visibile={visible}
          material={startingMaterial}
        />
      </Float>
    </group>
  );
}
