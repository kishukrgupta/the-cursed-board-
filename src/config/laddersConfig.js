// 8 Realistic Weathered 3D Wooden Ladders (Bottom = lower cell, Top = higher cell)
export const LADDERS_CONFIG = [
  { id: 'ladder-1', name: 'Crypt Steps', bottom: 4, top: 14, woodTone: '#3d2817' },
  { id: 'ladder-2', name: 'Gallows Climb', bottom: 9, top: 31, woodTone: '#47301c' },
  { id: 'ladder-3', name: 'Sanctuary Scaffold', bottom: 20, top: 38, woodTone: '#362313' },
  { id: 'ladder-4', name: 'Watchtower Ascent', bottom: 28, top: 84, woodTone: '#4a321e' },
  { id: 'ladder-5', name: 'Ossuary Ladder', bottom: 40, top: 59, woodTone: '#3c2918' },
  { id: 'ladder-6', name: 'Belfry Bridge', bottom: 51, top: 67, woodTone: '#422c19' },
  { id: 'ladder-7', name: 'Catacomb Rise', bottom: 63, top: 81, woodTone: '#382414' },
  { id: 'ladder-8', name: 'Altar Ladder', bottom: 71, top: 91, woodTone: '#4d3520' }
];

export const LADDER_BY_BOTTOM = Object.fromEntries(
  LADDERS_CONFIG.map((l) => [l.bottom, l])
);
