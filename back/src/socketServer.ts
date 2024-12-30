import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import { getVideo } from "./services/videoService";

export function initializeSocketServer(httpServer: HTTPServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: "*",
      allowedHeaders: ["Content-Type"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`New connection established: ${socket.id}`);

    socket.emit("welcome", { message: "Welcome to the Socket Server!" });

    socket.on("download", async (data) => {
      const { url } = data;
      try {
        await getVideo(url, io, socket.id, (progressData) => {
          socket.emit("progress", progressData);
        });
      } catch (error: any) {
        socket.emit("error", error.message);
      }
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
