// 10x10 Traditional Boustrophedon (Zigzag) Snakes & Ladders Board Configuration
// Cell 1 at bottom-left (row 0, col 0); Row 0: 1..10 L->R; Row 1: 11..20 R->L; Cell 100 at top-left (row 9, col 0)

export const BOARD_ROWS = 10;
export const BOARD_COLS = 10;
export const TOTAL_CELLS = 100;
export const TILE_SIZE = 1.35;
export const TILE_GAP = 0.06;
export const STEP = TILE_SIZE + TILE_GAP;

export function getCellGridCoords(cellNumber) {
  const n = Math.max(1, Math.min(100, cellNumber)) - 1;
  const row = Math.floor(n / 10); // 0 (bottom) to 9 (top)
  const colInRow = n % 10;
  // Even rows (0, 2, 4, 6, 8) go Left-to-Right (0..9)
  // Odd rows (1, 3, 5, 7, 9) go Right-to-Left (9..0)
  const col = row % 2 === 0 ? colInRow : 9 - colInRow;
  return { row, col };
}

export function getCellWorldPosition(cellNumber, yOffset = 0.25) {
  const { row, col } = getCellGridCoords(cellNumber);
  const halfSpan = (9 * STEP) / 2;
  const x = col * STEP - halfSpan;
  const z = (9 - row) * STEP - halfSpan; // row 0 at bottom (+Z), row 9 at top (-Z)
  return [x, yOffset, z];
}

export const BOARD_TILES = Array.from({ length: TOTAL_CELLS }, (_, idx) => {
  const cell = idx + 1;
  const { row, col } = getCellGridCoords(cell);
  const [x, y, z] = getCellWorldPosition(cell, 0);
  // Deterministic height & wear variation for weathered gothic stone slabs
  const seed = (cell * 73 + row * 19 + col * 31) % 100;
  const heightVariation = (seed / 100) * 0.08 - 0.04;
  return {
    cell,
    row,
    col,
    position: [x, heightVariation, z],
    isMilestone: cell === 1 || cell === 100,
    stoneTone: (row + col) % 2 === 0 ? '#1d2220' : '#141716'
  };
});
