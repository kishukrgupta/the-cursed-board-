import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { CursedBoard } from './components/CursedBoard.jsx';
import { Snake3D } from './components/Snake3D.jsx';
import { Ladder3D } from './components/Ladder3D.jsx';
import { SNAKES_CONFIG } from './config/snakesConfig.js';
import { LADDERS_CONFIG } from './config/laddersConfig.js';
import { PLAYERS_CONFIG } from './config/playersConfig.js';
import { evaluateTurnOutcome } from './logic/gameRules.js';

export default function App() {
  const [players, setPlayers] = useState(PLAYERS_CONFIG.map((p) => ({ ...p, cell: 1 })));
  const [turn, setTurn] = useState(0);
  const [dice, setDice] = useState(null);
  const [attackingSnakeId, setAttackingSnakeId] = useState(null);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#050807' }}>
      <Canvas shadows camera={{ position: [0, 14, 13], fov: 45 }}>
        <fogExp2 attach="fog" args={['#060b09', 0.032]} />
        <ambientLight intensity={0.35} color="#4a6b5d" />
        <directionalLight position={[-12, 22, 10]} intensity={1.3} color="#9bb8ff" castShadow />
        <Stars radius={60} depth={30} count={1200} factor={2} fade />
        <CursedBoard />
        {SNAKES_CONFIG.map((s) => (
          <Snake3D key={s.id} snake={s} attackingSnakeId={attackingSnakeId} />
        ))}
        {LADDERS_CONFIG.map((l) => (
          <Ladder3D key={l.id} ladder={l} />
        ))}
        <OrbitControls makeDefault maxPolarAngle={Math.PI / 2.2} minDistance={8} maxDistance={26} />
      </Canvas>
    </div>
  );
}
