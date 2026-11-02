// 8 Realistic 3D Cursed Horror Snakes (Head = higher cell, Tail = lower cell)
export const SNAKES_CONFIG = [
  {
    id: 'snake-abyssal-viper',
    name: 'Abyssal Fang Viper',
    head: 98,
    tail: 79,
    primaryColor: '#2a0808',
    scaleColor: '#7a1111',
    eyeColor: '#ff1e1e',
    radius: 0.19,
    swaySpeed: 2.2,
    coils: 3.5
  },
  {
    id: 'snake-blight-python',
    name: 'Rotscale Elder Python',
    head: 95,
    tail: 75,
    primaryColor: '#0e2918',
    scaleColor: '#276b3c',
    eyeColor: '#5eff8b',
    radius: 0.18,
    swaySpeed: 1.9,
    coils: 3.0
  },
  {
    id: 'snake-void-cobra',
    name: 'Voidspire Dread Cobra',
    head: 93,
    tail: 73,
    primaryColor: '#1f1030',
    scaleColor: '#552882',
    eyeColor: '#d26eff',
    radius: 0.18,
    swaySpeed: 2.4,
    coils: 3.0
  },
  {
    id: 'snake-corpse-constrictor',
    name: 'Graveyard Constrictor',
    head: 87,
    tail: 24,
    primaryColor: '#241a0d',
    scaleColor: '#6b4c24',
    eyeColor: '#ffae00',
    radius: 0.22,
    swaySpeed: 1.6,
    coils: 5.0
  },
  {
    id: 'snake-venom-adder',
    name: 'Biletooth Marsh Adder',
    head: 64,
    tail: 60,
    primaryColor: '#102421',
    scaleColor: '#1f6357',
    eyeColor: '#00ffd5',
    radius: 0.15,
    swaySpeed: 2.6,
    coils: 2.2
  },
  {
    id: 'snake-blood-serpent',
    name: 'Crimson Ritual Serpent',
    head: 62,
    tail: 19,
    primaryColor: '#360913',
    scaleColor: '#8c142e',
    eyeColor: '#ff2a55',
    radius: 0.20,
    swaySpeed: 1.8,
    coils: 4.5
  },
  {
    id: 'snake-ash-rattler',
    name: 'Ashen Hollow Rattler',
    head: 54,
    tail: 34,
    primaryColor: '#222226',
    scaleColor: '#4f515c',
    eyeColor: '#ff5500',
    radius: 0.17,
    swaySpeed: 2.1,
    coils: 3.0
  },
  {
    id: 'snake-mire-asp',
    name: 'Cursed Bog Asp',
    head: 17,
    tail: 7,
    primaryColor: '#1a290c',
    scaleColor: '#476e1f',
    eyeColor: '#a6ff00',
    radius: 0.16,
    swaySpeed: 2.5,
    coils: 2.5
  }
];

export const SNAKE_BY_HEAD = Object.fromEntries(
  SNAKES_CONFIG.map((s) => [s.head, s])
);
