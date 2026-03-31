const { Server } = require("socket.io");
const {
  joinRoom,
  getUsersInRoom,
  updateCode,
  getRoom,
  leaveRoom,
} = require("../rooms/roomManager");
const { enqueue } = require("../queue/executionQueue");

const runningExecutions = new Set();

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("join_room", ({ roomId, username }) => {
      const safeUsername = username || "Anonymous";

      socket.join(roomId);

      socket.data.roomId = roomId;

      const room = joinRoom(roomId, socket.id, safeUsername);
      const users = getUsersInRoom(roomId);

      socket.emit("load_code", { code: room.code });

      io.to(roomId).emit("user_joined", {
        username: safeUsername,
        users,
      });
    });

    socket.on("code_change", ({ roomId, code }) => {
      updateCode(roomId, code);
      socket.to(roomId).emit("code_update", { code });
    });

    socket.on("execute_code", async ({ roomId }) => {
      if (runningExecutions.has(socket.id)) {
        socket.emit("execution_result", {
          success: false,
          output: "You already have code running. Please wait.",
        });
        return;
      }

      const room = getRoom(roomId);
      if (!room) return;

      runningExecutions.add(socket.id);

      const result = await enqueue(
        room.code,

        () => {
          socket.emit("execution_started");
        },

        (position) => {
          socket.emit("queue_position", { position });
        },
      );

      runningExecutions.delete(socket.id);
      //socket.emit("execution_result", result);
      io.to(roomId).emit("execution_result", result);
    });

    socket.on("disconnect", () => {
      runningExecutions.delete(socket.id);

      if (socket.data.roomId) {
        leaveRoom(socket.data.roomId, socket.id);
      }

      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
}

module.exports = initSocket;
