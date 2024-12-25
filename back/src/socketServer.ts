// import { Server } from "socket.io";
// import { Server as HTTPServer } from "http";

// export function initializeSocketServer(httpServer: HTTPServer) {
//   const io = new Server(httpServer, {
//     cors: {
//       origin: "http://localhost:5173", 
//       methods: ["GET", "POST"],
//       allowedHeaders: ["Content-Type"],
//       credentials: true
//     },
//   });
  

//   io.on("connection", (socket) => {
//     socket.emit("welcome", { message: "Welcome to the Socket Server!" });
    
//     socket.on("attack_added", (data) => {
//       console.log("Attack added:", data); 
//       io.emit("attack_added", data); 
//     });
//   });

//   return io;
// }

