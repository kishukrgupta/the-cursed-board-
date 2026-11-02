import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { evaluateTurnOutcome } from '../src/logic/gameRules.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const rooms = new Map();

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'CURSE-';
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function createInitialRoomState(roomCode, hostSocketId, hostName) {
  return {
    roomCode,
    hostSocketId,
    status: 'waiting', // waiting | playing | finished
    currentTurn: 0,
    isAnimating: false,
    lastDice: null,
    winner: null,
    players: [
      { slot: 0, socketId: hostSocketId, name: hostName || 'Player 1', connected: true, cell: 1, isBot: false },
      { slot: 1, socketId: null, name: 'Open Slot 2', connected: false, cell: 1, isBot: true },
      { slot: 2, socketId: null, name: 'Open Slot 3', connected: false, cell: 1, isBot: true },
      { slot: 3, socketId: null, name: 'Open Slot 4', connected: false, cell: 1, isBot: true }
    ]
  };
}

io.on('connection', (socket) => {
  socket.on('create_room', ({ playerName }, cb) => {
    const roomCode = generateRoomCode();
    const room = createInitialRoomState(roomCode, socket.id, playerName);
    rooms.set(roomCode, room);
    socket.join(roomCode);
    if (cb) cb({ ok: true, roomCode, slot: 0, room });
    io.to(roomCode).emit('room_update', room);
  });

  socket.on('join_room', ({ roomCode, playerName, reconnectSlot }, cb) => {
    const room = rooms.get(roomCode);
    if (!room) {
      return cb && cb({ ok: false, error: 'Room not found' });
    }

    // Handle reconnection to previous slot if disconnected
    if (reconnectSlot !== undefined && room.players[reconnectSlot] && !room.players[reconnectSlot].connected) {
      room.players[reconnectSlot].socketId = socket.id;
      room.players[reconnectSlot].connected = true;
      socket.join(roomCode);
      io.to(roomCode).emit('room_update', room);
      return cb && cb({ ok: true, roomCode, slot: reconnectSlot, room });
    }

    const openSlot = room.players.find((p) => !p.connected);
    if (!openSlot) {
      return cb && cb({ ok: false, error: 'Room is full (4/4 players)' });
    }

    openSlot.socketId = socket.id;
    openSlot.name = playerName || `Player ${openSlot.slot + 1}`;
    openSlot.connected = true;
    openSlot.isBot = false;

    socket.join(roomCode);
    io.to(roomCode).emit('room_update', room);
    if (cb) cb({ ok: true, roomCode, slot: openSlot.slot, room });
  });

  socket.on('roll_dice', ({ roomCode }) => {
    const room = rooms.get(roomCode);
    if (!room || room.isAnimating || room.winner !== null) return;

    const activePlayer = room.players[room.currentTurn];
    if (activePlayer.socketId !== socket.id && !activePlayer.isBot) return;

    room.isAnimating = true;
    const diceValue = Math.floor(Math.random() * 6) + 1;
    const outcome = evaluateTurnOutcome(activePlayer.cell, diceValue);
    room.lastDice = diceValue;

    io.to(roomCode).emit('dice_rolled', {
      playerSlot: room.currentTurn,
      diceValue,
      outcome
    });

    const animDurationMs = outcome.steps.length * 380 + (outcome.event !== 'normal' ? 1800 : 500);
    setTimeout(() => {
      activePlayer.cell = outcome.finalCell;
      room.isAnimating = false;
      if (outcome.isVictory) {
        room.winner = activePlayer.slot;
        room.status = 'finished';
      } else {
        room.currentTurn = (room.currentTurn + 1) % 4;
      }
      io.to(roomCode).emit('turn_completed', room);
    }, animDurationMs);
  });

  socket.on('restart_game', ({ roomCode }) => {
    const room = rooms.get(roomCode);
    if (!room) return;
    room.currentTurn = 0;
    room.isAnimating = false;
    room.lastDice = null;
    room.winner = null;
    room.status = 'playing';
    room.players.forEach((p) => { p.cell = 1; });
    io.to(roomCode).emit('room_update', room);
  });

  socket.on('disconnect', () => {
    for (const [code, room] of rooms.entries()) {
      const player = room.players.find((p) => p.socketId === socket.id);
      if (player) {
        player.connected = false;
        io.to(code).emit('room_update', room);
      }
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`THE CURSED BOARD Socket.IO server listening on port ${PORT}`);
});
