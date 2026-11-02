import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getCellWorldPosition } from '../config/boardConfig.js';

export function Ladder3D({ ladder }) {
  const { mid, length, angleY, angleX, rungs } = useMemo(() => {
    const start = new THREE.Vector3(...getCellWorldPosition(ladder.bottom, 0.22));
    const end = new THREE.Vector3(...getCellWorldPosition(ladder.top, 0.22));
    const diff = new THREE.Vector3().subVectors(end, start);
    const len = diff.length();
    const center = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const yaw = Math.atan2(diff.x, diff.z);
    const rungCount = Math.max(4, Math.floor(len / 0.65));
    const rungOffsets = Array.from({ length: rungCount }, (_, i) => {
      const f = (i + 0.8) / (rungCount + 0.6) - 0.5;
      return f * len;
    });
    return { mid: center, length: len, angleY: yaw, angleX: Math.PI / 2, rungs: rungOffsets };
  }, [ladder]);

  const railWidth = 0.42;

  return (
    <group position={mid} rotation={[0, angleY, 0]}>
      {/* Left & Right Weathered Wooden Side Rails */}
      <mesh position={[-railWidth / 2, 0.08, 0]} rotation={[angleX, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.045, 0.05, length, 8]} />
        <meshStandardMaterial color={ladder.woodTone} roughness={0.92} />
      </mesh>
      <mesh position={[railWidth / 2, 0.08, 0]} rotation={[angleX, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.045, 0.05, length, 8]} />
        <meshStandardMaterial color={ladder.woodTone} roughness={0.92} />
      </mesh>
      {/* Horizontal Wooden Rungs */}
      {rungs.map((zOff, idx) => (
        <mesh
          key={idx}
          position={[0, 0.09, zOff]}
          rotation={[0, 0, Math.PI / 2 + ((idx % 2 === 0 ? 1 : -1) * 0.03)]}
          castShadow
        >
          <cylinderGeometry args={[0.032, 0.032, railWidth + 0.08, 8]} />
          <meshStandardMaterial color="#523720" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}
