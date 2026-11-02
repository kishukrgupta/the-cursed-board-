import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getCellWorldPosition } from '../config/boardConfig.js';

export function Snake3D({ snake, attackingSnakeId }) {
  const headRef = useRef();
  const jawRef = useRef();
  const tongueRef = useRef();

  const { curve, headPos, lookAtPos } = useMemo(() => {
    const start = new THREE.Vector3(...getCellWorldPosition(snake.head, 0.24));
    const end = new THREE.Vector3(...getCellWorldPosition(snake.tail, 0.20));
    const dir = new THREE.Vector3().subVectors(end, start);
    const perp = new THREE.Vector3(-dir.z, 0, dir.x).normalize();

    const points = [];
    const segments = 28;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const base = new THREE.Vector3().lerpVectors(start, end, t);
      const wave = Math.sin(t * Math.PI * snake.coils) * (1 - t * 0.35) * 0.75;
      base.addScaledVector(perp, wave);
      base.y += Math.sin(t * Math.PI) * 0.14 + (t < 0.12 ? (1 - t / 0.12) * 0.32 : 0);
      points.push(base);
    }
    const spline = new THREE.CatmullRomCurve3(points);
    return {
      curve: spline,
      headPos: points[0],
      lookAtPos: points[2]
    };
  }, [snake]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const isAttacking = attackingSnakeId === snake.id;
    if (headRef.current) {
      headRef.current.position.y = headPos.y + Math.sin(t * snake.swaySpeed) * 0.06 + (isAttacking ? 0.25 : 0);
    }
    if (jawRef.current) {
      jawRef.current.rotation.x = isAttacking ? 0.65 : 0.12 + Math.sin(t * 2.5) * 0.06;
    }
    if (tongueRef.current) {
      tongueRef.current.scale.z = 0.8 + Math.sin(t * 9) * 0.35;
    }
  });

  return (
    <group>
      <mesh castShadow receiveShadow>
        <tubeGeometry args={[curve, 64, snake.radius, 14, false]} />
        <meshStandardMaterial color={snake.scaleColor} roughness={0.45} metalness={0.35} />
      </mesh>
      <group ref={headRef} position={headPos}>
        <mesh castShadow>
          <boxGeometry args={[0.48, 0.24, 0.58]} />
          <meshStandardMaterial color={snake.primaryColor} roughness={0.4} />
        </mesh>
        {/* Glowing Eyes */}
        <mesh position={[-0.16, 0.08, 0.18]}>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshBasicMaterial color={snake.eyeColor} />
        </mesh>
        <mesh position={[0.16, 0.08, 0.18]}>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshBasicMaterial color={snake.eyeColor} />
        </mesh>
        {/* Fangs & Hinged Jaw */}
        <group ref={jawRef} position={[0, -0.08, 0.1]}>
          <mesh position={[-0.12, 0.04, 0.22]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.03, 0.16, 8]} />
            <meshStandardMaterial color="#f5f5f4" />
          </mesh>
          <mesh position={[0.12, 0.04, 0.22]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.03, 0.16, 8]} />
            <meshStandardMaterial color="#f5f5f4" />
          </mesh>
          <mesh ref={tongueRef} position={[0, 0, 0.35]}>
            <boxGeometry args={[0.03, 0.01, 0.32]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
        </group>
      </group>
    </group>
  );
}
