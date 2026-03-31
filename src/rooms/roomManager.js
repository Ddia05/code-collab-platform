const rooms = new Map();

function createRoom(roomId) {
  if (rooms.has(roomId)) {
    return rooms.get(roomId);
  }

  const room = {
    id: roomId,
    code: "",
    users: new Map(),
  };

  rooms.set(roomId, room);
  console.log(`Room created: ${roomId}`);
  return room;
}

function joinRoom(roomId, socketId, username) {
  const room = createRoom(roomId);
  room.users.set(socketId, username);
  console.log(`${username} joined room: ${roomId}`);
  return room;
}

function leaveRoom(roomId, socketId) {
  const room = rooms.get(roomId);
  if (!room) return;

  const username = room.users.get(socketId);
  room.users.delete(socketId);
  console.log(`${username} left room: ${roomId}`);

  if (room.users.size === 0) {
    rooms.delete(roomId);
    console.log(`Room deleted (empty): ${roomId}`);
  }
}

function getRoom(roomId) {
  return rooms.get(roomId);
}

function getUsersInRoom(roomId) {
  const room = rooms.get(roomId);
  if (!room) return [];
  return Array.from(room.users.values());
}

function updateCode(roomId, code) {
  const room = rooms.get(roomId);
  if (!room) return;
  room.code = code;
}

module.exports = {
  createRoom,
  joinRoom,
  leaveRoom,
  getRoom,
  getUsersInRoom,
  updateCode,
};
