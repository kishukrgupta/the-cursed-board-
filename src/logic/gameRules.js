import { SNAKE_BY_HEAD } from '../config/snakesConfig.js';
import { LADDER_BY_BOTTOM } from '../config/laddersConfig.js';

export function evaluateTurnOutcome(currentCell, diceValue) {
  const targetCell = currentCell + diceValue;

  // Exact roll required to reach Cell 100
  if (targetCell > 100) {
    return {
      validMove: false,
      steps: [],
      landedCell: currentCell,
      finalCell: currentCell,
      event: 'overshoot',
      snake: null,
      ladder: null,
      isVictory: false
    };
  }

  const steps = [];
  for (let c = currentCell + 1; c <= targetCell; c++) {
    steps.push(c);
  }

  const snake = SNAKE_BY_HEAD[targetCell] || null;
  const ladder = LADDER_BY_BOTTOM[targetCell] || null;

  let finalCell = targetCell;
  let event = 'normal';

  if (snake) {
    finalCell = snake.tail;
    event = 'snake_bite';
  } else if (ladder) {
    finalCell = ladder.top;
    event = 'ladder_climb';
  }

  return {
    validMove: true,
    steps,
    landedCell: targetCell,
    finalCell,
    event,
    snake,
    ladder,
    isVictory: finalCell === 100
  };
}
