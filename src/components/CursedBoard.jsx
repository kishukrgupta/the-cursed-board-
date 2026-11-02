import React, { useMemo } from 'react';
import { Text } from '@react-three/drei';
import { BOARD_TILES, TILE_SIZE, STEP } from '../config/boardConfig.js';

export function CursedBoard() {
  const boardSpan = 10 * STEP + 0.9;

  return (
    <group name="CursedStoneBoard">
      {/* Ancient Carved Stone Border Frame */}
      <mesh position={[0, -0.22, 0]} receiveShadow castShadow>
        <boxGeometry args={[boardSpan, 0.45, boardSpan]} />
        <meshStandardMaterial color="#0d0f0e" roughness={0.92} metalness={0.15} />
      </mesh>

      {/* 100 Individual Carved Stone Slabs */}
      {BOARD_TILES.map((tile) => (
        <group key={tile.cell} position={tile.position}>
          <mesh receiveShadow castShadow>
            <boxGeometry args={[TILE_SIZE, 0.24, TILE_SIZE]} />
            <meshStandardMaterial
              color={tile.isMilestone ? '#2d1418' : tile.stoneTone}
              roughness={0.88}
              metalness={0.2}
            />
          </mesh>
          <Text
            position={[-0.38, 0.13, -0.36]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.28}
            color={tile.cell === 100 ? '#ff3355' : tile.cell % 10 === 0 ? '#7dd3fc' : '#a8b5b2'}
          >
            {String(tile.cell)}
          </Text>
        </group>
      ))}
    </group>
  );
}
