import { Server } from "socket.io";
import { Server as HTTPServer } from "http";

export function initializeSocketServer(httpServer: HTTPServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`New connection established: ${socket.id}`);

    socket.emit("welcome", { message: "Welcome to the Socket Server!" });

    socket.on("download", (data) => {
      console.log("download request received:", data);
      io.emit("download", data);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Socket disconnected: ${socket.id}, Reason: ${reason}`);
    });

    socket.on("error", (error) => {
      console.error(`Socket error: ${error.message}`);
    });
  });

  return io;
}
