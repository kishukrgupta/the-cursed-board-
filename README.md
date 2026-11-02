# THE CURSED BOARD — 3D Horror Snakes & Ladders

Full modular React + Vite + Three.js (React Three Fiber & Drei) + Node.js Socket.IO multiplayer project.

## Directory Structure
- `src/config/boardConfig.js` — 10x10 (100-cell) boustrophedon (zigzag) stone tile coordinates
- `src/config/snakesConfig.js` — 8 realistic 3D cursed snakes with head/tail cell endpoints and scale palettes
- `src/config/laddersConfig.js` — 8 weathered 3D wooden ladders with bottom/top cell endpoints
- `src/config/playersConfig.js` — 4 player slots (Red, Blue, Green, Purple) and multi-occupant offsets
- `src/logic/gameRules.js` — Exact-100 rule, cell-by-cell step pathing, snake bite & ladder climb evaluation
- `server/index.js` — Node.js + Socket.IO 4-player room lobby, room codes, turn sync, and reconnection handling

## Running Locally
```bash
npm install
npm run server   # Starts Socket.IO multiplayer server on port 3001
npm run dev      # Starts Vite dev server on port 5173
```
