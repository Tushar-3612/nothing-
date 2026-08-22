import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Text, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

const CAKE_HALF_W = 1.1;
const CAKE_H = 1.0;
const CAKE_D = 2.2;
const SEPARATION = 0.62;

// Soft pastel palette
const C = {
  bodyA: "#f7bcd2",
  bodyB: "#fbd0de",
  cream: "#fff6ee",
  frosting: "#fff3f7",
  lavender: "#e9d8f6",
  gold: "#e7c98c",
  pearl: "#fdf4f8",
};

function useStarGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    const spikes = 5;
    const outer = 0.16;
    const inner = 0.07;
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outer : inner;
      const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.03,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 1,
    });
    geo.center();
    return geo;
  }, []);
}

function TopDecoration() {
  const starGeo = useStarGeometry();
  const starRef = useRef();
  const pearlRef = useRef();

  useFrame((_, delta) => {
    if (starRef.current) starRef.current.rotation.y += delta * 0.4;
    if (pearlRef.current) {
      const s = 1 + Math.sin(Date.now() * 0.002) * 0.05;
      pearlRef.current.scale.setScalar(s);
    }
  });

  return (
    <group position={[0, CAKE_H + 0.42, 0]}>
      <mesh ref={pearlRef} position={[0, -0.06, 0]}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial
          color={C.pearl}
          roughness={0.35}
          metalness={0.05}
          emissive="#ffe9f2"
          emissiveIntensity={0.15}
        />
      </mesh>
      <mesh
        ref={starRef}
        geometry={starGeo}
        position={[0, 0.12, 0]}
        rotation={[0.3, 0, 0]}
      >
        <meshStandardMaterial
          color={C.gold}
          roughness={0.25}
          metalness={0.6}
          emissive={C.gold}
          emissiveIntensity={0.25}
        />
      </mesh>
      <pointLight position={[0, 0.2, 0]} intensity={0.25} color="#ffe9c2" distance={2} />
    </group>
  );
}

function Sprinkle({ position, color, onSparkle }) {
  const ref = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [sparkle, setSparkle] = useState(false);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.4;
      ref.current.rotation.z += delta * 0.25;
      if (sparkle) {
        const scale = 1 + Math.sin(Date.now() * 0.02) * 0.3;
        ref.current.scale.set(scale, scale, scale);
        ref.current.material.emissiveIntensity = 0.4 + Math.sin(Date.now() * 0.05) * 0.3;
      }
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setSparkle(true);
    onSparkle?.();
    setTimeout(() => {
      setSparkle(false);
      if (ref.current) {
        ref.current.scale.set(1, 1, 1);
        ref.current.material.emissiveIntensity = 0;
      }
    }, 800);
  };

  return (
    <mesh
      ref={ref}
      position={position}
      rotation={[Math.random() * 0.5, Math.random() * 0.5, Math.random() * 0.5]}
      onClick={handleClick}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <capsuleGeometry args={[0.022, 0.1, 3, 6]} />
      <meshStandardMaterial
        color={color}
        roughness={isHovered ? 0.25 : 0.5}
        metalness={isHovered ? 0.3 : 0.05}
        emissive={color}
        emissiveIntensity={sparkle ? 0.9 : 0}
      />
    </mesh>
  );
}

function Crumbs({ progressRef }) {
  const groupRef = useRef();
  const crumbsData = useMemo(
    () =>
      Array.from({ length: 14 }).map(() => ({
        x: (Math.random() - 0.5) * 0.6,
        y: Math.random() * 0.3 + 0.1,
        z: (Math.random() - 0.5) * (CAKE_D * 0.5),
        vx: (Math.random() - 0.5) * 1.8,
        vy: -Math.random() * 1.2 - 0.8,
        vz: (Math.random() - 0.5) * 1.0,
        size: 0.04 + Math.random() * 0.06,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 6,
          y: (Math.random() - 0.5) * 6,
          z: (Math.random() - 0.5) * 6,
        },
        color: [C.bodyB, C.frosting, C.cream, C.lavender, "#f6a8c6"][
          Math.floor(Math.random() * 5)
        ],
        delay: Math.random() * 0.15,
      })),
    []
  );

  const refs = useRef([]);

  useFrame((_, delta) => {
    const p = progressRef.current;
    if (!groupRef.current) return;

    const gravity = -3.5;
    const airResistance = 0.97;
    const bounceFactor = 0.45;

    groupRef.current.children.forEach((child, i) => {
      const data = crumbsData[i];
      const ref = refs.current[i];
      if (!ref) return;

      const effectiveP = Math.max(0, (p - data.delay) / (1 - data.delay));
      if (effectiveP <= 0) {
        child.visible = false;
        return;
      }
      child.visible = true;

      data.vy += gravity * delta * effectiveP * 1.2;
      data.vx *= airResistance;
      data.vy *= airResistance;
      data.vz *= airResistance;

      const newX = data.x + data.vx * delta * effectiveP * 2;
      const newY = data.y + data.vy * delta * effectiveP * 2;
      const newZ = data.z + data.vz * delta * effectiveP * 2;

      if (newY < 0) {
        data.vy = -data.vy * bounceFactor;
        data.y = 0.01;
        data.vx *= 0.92;
        data.vz *= 0.92;
      } else {
        data.y = newY;
      }

      if (Math.abs(newX) > 1.8) data.vx *= -0.3;
      if (Math.abs(newZ) > 1.8) data.vz *= -0.3;

      data.x += data.vx * delta * effectiveP * 2;
      data.z += data.vz * delta * effectiveP * 2;

      data.x = THREE.MathUtils.clamp(data.x, -1.8, 1.8);
      data.z = THREE.MathUtils.clamp(data.z, -1.8, 1.8);

      child.position.set(data.x, data.y, data.z);

      child.rotation.x += data.rotationSpeed.x * delta * effectiveP;
      child.rotation.y += data.rotationSpeed.y * delta * effectiveP;
      child.rotation.z += data.rotationSpeed.z * delta * effectiveP;

      const opacity = THREE.MathUtils.clamp((effectiveP - 0.05) * 8, 0, 1);
      child.material.opacity = opacity * 0.9;
      child.material.transparent = true;
    });
  });

  return (
    <group ref={groupRef}>
      {crumbsData.map((data, i) => (
        <mesh
          key={i}
          ref={(el) => (refs.current[i] = el)}
          visible={false}
          position={[data.x, data.y, data.z]}
        >
          <boxGeometry args={[data.size, data.size * 0.6, data.size]} />
          <meshStandardMaterial
            color={data.color}
            roughness={0.8}
            transparent
            opacity={0}
          />
        </mesh>
      ))}
    </group>
  );
}

function SliceEffect({ progressRef }) {
  const ref = useRef();
  const particlesRef = useRef();

  const particles = useMemo(
    () =>
      Array.from({ length: 24 }).map(() => ({
        x: (Math.random() - 0.5) * 0.4,
        y: Math.random() * CAKE_H,
        z: (Math.random() - 0.5) * CAKE_D * 0.4,
        size: 0.008 + Math.random() * 0.014,
        speed: 0.5 + Math.random() * 0.5,
      })),
    []
  );

  useFrame(() => {
    const p = progressRef.current;
    if (ref.current) {
      const mat = ref.current.material;
      const intensity = Math.sin(p * Math.PI) * 1.5;
      mat.emissiveIntensity = THREE.MathUtils.clamp(intensity, 0, 1.2);
      mat.opacity = THREE.MathUtils.clamp(p * 2, 0, 0.7);
      mat.transparent = true;
    }

    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, i) => {
        const data = particles[i];
        const offset = Date.now() * 0.002 + i * 0.5;
        const spread = p * 0.3;
        child.position.set(
          data.x + Math.sin(offset) * spread,
          data.y + Math.cos(offset * 0.7) * spread * 0.5,
          data.z + Math.sin(offset * 0.5) * spread
        );
        child.material.opacity = p * (0.5 + Math.sin(offset) * 0.5) * 0.6;
      });
    }
  });

  return (
    <>
      <mesh ref={ref} position={[0, CAKE_H / 2, 0]}>
        <boxGeometry args={[0.02, CAKE_H + 0.2, CAKE_D + 0.1]} />
        <meshStandardMaterial
          color={C.gold}
          emissive={C.gold}
          emissiveIntensity={0}
          transparent
          opacity={0}
        />
      </mesh>

      <group ref={particlesRef}>
        {particles.map((data, i) => (
          <mesh key={i} position={[data.x, data.y, data.z]}>
            <sphereGeometry args={[data.size, 4, 4]} />
            <meshStandardMaterial
              color="#ffe1ec"
              emissive="#ffffff"
              emissiveIntensity={0.5}
              transparent
              opacity={0}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}

function HalfCake({ side, cut, progressRef, onSprinkleSparkle }) {
  const groupRef = useRef();

  useFrame(() => {
    const p = progressRef.current;
    const target = cut ? SEPARATION : 0;
    const moved = p * target;
    if (groupRef.current) {
      groupRef.current.position.x = side * (CAKE_HALF_W / 2) + side * moved;
      groupRef.current.rotation.z = side * p * 0.04;
    }
  });

  const sprinkles = useMemo(
    () =>
      Array.from({ length: 6 }).map(() => ({
        x: (Math.random() - 0.5) * (CAKE_HALF_W - 0.25),
        z: (Math.random() - 0.5) * (CAKE_HALF_W - 0.25),
        color: [C.lavender, C.gold, "#ffd2e1", "#cdbdf0", "#fff0a8"][
          Math.floor(Math.random() * 5)
        ],
      })),
    []
  );

  const drips = useMemo(
    () =>
      Array.from({ length: 9 }).map((_, i) => {
        const t = i / 8;
        const z = -CAKE_D / 2 + 0.18 + t * (CAKE_D - 0.36);
        const r = 0.05 + Math.abs(Math.sin(i * 1.7)) * 0.02 + 0.03;
        const drop = 0.04 + ((i * 7) % 5) * 0.012;
        return { z, r, drop };
      }),
    []
  );

  return (
    <group ref={groupRef} position={[side * (CAKE_HALF_W / 2), 0, 0]}>
      {/* Cake body — soft pastel, rounded */}
      <RoundedBox
        args={[CAKE_HALF_W, CAKE_H, CAKE_D]}
        radius={0.16}
        smoothness={5}
        position={[0, CAKE_H / 2, 0]}
      >
        <meshStandardMaterial color={C.bodyA} roughness={0.62} metalness={0.04} />
      </RoundedBox>

      {/* Inner gradient layer for subtle depth */}
      <RoundedBox
        args={[CAKE_HALF_W - 0.1, CAKE_H - 0.12, CAKE_D - 0.1]}
        radius={0.1}
        smoothness={5}
        position={[0, CAKE_H / 2, 0]}
      >
        <meshStandardMaterial color={C.bodyB} roughness={0.72} />
      </RoundedBox>

      {/* Clean frosting cap with soft rounded edge */}
      <RoundedBox
        args={[CAKE_HALF_W + 0.06, 0.26, CAKE_D + 0.06]}
        radius={0.13}
        smoothness={5}
        position={[0, CAKE_H + 0.07, 0]}
      >
        <meshStandardMaterial
          color={C.frosting}
          roughness={0.28}
          metalness={0.06}
          emissive="#ffe9f1"
          emissiveIntensity={0.12}
        />
      </RoundedBox>

      {/* Frosting drips hanging down the outer edge */}
      {drips.map((d, i) => (
        <mesh key={i} position={[side * (CAKE_HALF_W * 0.52), CAKE_H - d.drop, d.z]}>
          <sphereGeometry args={[d.r, 10, 10]} />
          <meshStandardMaterial color={C.frosting} roughness={0.32} />
        </mesh>
      ))}

      {/* Visible cut face — layered filling (3 layers) */}
      <group position={[-side * (CAKE_HALF_W / 2), 0, 0]}>
        <mesh position={[0, CAKE_H / 2 - 0.28, 0]}>
          <boxGeometry args={[0.04, 0.34, CAKE_D - 0.06]} />
          <meshStandardMaterial color={C.bodyA} roughness={0.8} />
        </mesh>
        <mesh position={[0, CAKE_H / 2 - 0.1, 0]}>
          <boxGeometry args={[0.05, 0.1, CAKE_D - 0.06]} />
          <meshStandardMaterial color={C.cream} roughness={0.5} />
        </mesh>
        <mesh position={[0, CAKE_H / 2 + 0.05, 0]}>
          <boxGeometry args={[0.04, 0.26, CAKE_D - 0.06]} />
          <meshStandardMaterial color={C.bodyB} roughness={0.8} />
        </mesh>
        <mesh position={[0, CAKE_H / 2 + 0.24, 0]}>
          <boxGeometry args={[0.05, 0.1, CAKE_D - 0.06]} />
          <meshStandardMaterial color={C.cream} roughness={0.5} />
        </mesh>
        <mesh position={[0, CAKE_H / 2 + 0.36, 0]}>
          <boxGeometry args={[0.04, 0.12, CAKE_D - 0.06]} />
          <meshStandardMaterial color={C.lavender} roughness={0.8} />
        </mesh>
      </group>

      {/* Delicate sprinkles on the frosting top */}
      {sprinkles.map((s, i) => (
        <Sprinkle
          key={i}
          position={[s.x, CAKE_H + 0.22, s.z]}
          color={s.color}
          onSparkle={() => onSprinkleSparkle?.()}
        />
      ))}
    </group>
  );
}

function CakeScene({ cut, reduce }) {
  const progressRef = useRef(0);
  const glowRef = useRef();
  const { camera, pointer } = useThree();
  const [sparkleCount, setSparkleCount] = useState(0);
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    const target = cut ? 1 : 0;

    if (reduce) {
      progressRef.current = target;
    } else {
      progressRef.current = THREE.MathUtils.damp(progressRef.current, target, 2.6, d);
    }
    const p = progressRef.current;

    // Beautiful 3/4 view with subtle idle + pointer parallax (desktop) /
    // gentle automatic drift (mobile).
    const t = state.clock.elapsedTime;
    const autoX = Math.sin(t * 0.22) * 0.22;
    const autoY = Math.cos(t * 0.18) * 0.1;
    const parX = isMobile ? 0 : pointer.x * 0.55;
    const parY = isMobile ? 0 : pointer.y * 0.28;

    const camTargetX = (cut ? 1.7 : 2.1) + autoX + parX;
    const camTargetY = (cut ? 1.7 : 1.95) + autoY + parY;
    const camTargetZ = cut ? 4.4 : 5.2;

    if (reduce) {
      camera.position.set(camTargetX, camTargetY, camTargetZ);
    } else {
      camera.position.x = THREE.MathUtils.damp(camera.position.x, camTargetX, 2.4, d);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, camTargetY, 2.4, d);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, camTargetZ, 2.2, d);
    }
    camera.lookAt(0, 0.42, 0);

    if (glowRef.current) {
      glowRef.current.intensity = 0.45 + p * 1.6;
      glowRef.current.color.setHSL(0.09 - p * 0.05, 0.7, 0.72);
    }
  });

  const handleSprinkleSparkle = () => setSparkleCount((prev) => prev + 1);

  return (
    <>
      {/* Soft key light */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 4]} intensity={1.5} castShadow={false} />
      {/* Subtle fill light */}
      <directionalLight position={[-5, 3, 3]} intensity={0.5} color="#ffffff" />
      {/* Gentle rim light (lavender) */}
      <directionalLight position={[-3, 4, -5]} intensity={0.7} color={C.lavender} />
      {/* Warm glow + soft rim point light */}
      <pointLight
        ref={glowRef}
        position={[0, CAKE_H + 0.8, 1.5]}
        intensity={0.5}
        color="#ffe6c2"
        distance={12}
      />
      <pointLight position={[-3, 4, -2]} intensity={0.35} color="#cbb2ec" />

      <ContactShadows
        position={[0, -0.02, 0]}
        opacity={0.32}
        scale={9}
        blur={2.6}
        far={4}
        resolution={isMobile ? 256 : 512}
        color="#7a5a6a"
      />

      <group position={[0, -0.5, 0]}>
        {/* Premium plate with gold rim */}
        <mesh position={[0, -0.06, 0]} receiveShadow>
          <cylinderGeometry args={[2.2, 2.3, 0.08, 64]} />
          <meshStandardMaterial color="#fdf6f1" roughness={0.3} metalness={0.15} />
        </mesh>
        <mesh position={[0, -0.015, 0]} receiveShadow>
          <cylinderGeometry args={[1.9, 1.95, 0.04, 64]} />
          <meshStandardMaterial color="#ffffff" roughness={0.15} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0.01, 0]}>
          <torusGeometry args={[1.93, 0.015, 8, 80]} />
          <meshStandardMaterial color={C.gold} roughness={0.3} metalness={0.7} />
        </mesh>

        <HalfCake
          side={-1}
          cut={cut}
          progressRef={progressRef}
          onSprinkleSparkle={handleSprinkleSparkle}
        />
        <HalfCake
          side={1}
          cut={cut}
          progressRef={progressRef}
          onSprinkleSparkle={handleSprinkleSparkle}
        />

        <SliceEffect progressRef={progressRef} />
        <Crumbs progressRef={progressRef} />

        <TopDecoration />

        {sparkleCount > 0 && (
          <mesh position={[-1.5, 1.5, 0]}>
            <Text fontSize={0.15} color={C.gold}>
              ✨ {sparkleCount}
            </Text>
          </mesh>
        )}
      </group>
    </>
  );
}

export default function BirthdayCake3D({ cut = false, reduce = false }) {
  const maxDpr =
    typeof window !== "undefined" && window.innerWidth < 520 ? 1.5 : 2;
  return (
    <Canvas
      dpr={[1, maxDpr]}
      camera={{ position: [2.1, 1.95, 5.2], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <Suspense fallback={null}>
        <CakeScene cut={cut} reduce={reduce} />
      </Suspense>
    </Canvas>
  );
}
