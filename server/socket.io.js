const { Server } = require("socket.io");
let io = null;

module.exports = {
  init: (server) => {
    if (!io) {
      io = new Server(server, {
        cors: {
          origin: "http://localhost:5173",
          methods: ["GET", "POST"],
          credentials: true
        },
      });
    }
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};
