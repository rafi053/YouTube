import express from "express";
import cors from "cors";
import { createServer } from "http";

import videoRoutes from './routes/videoRoutes'; 

// import { initializeSocketServer } from "./socketServer";
// import { initializeSocket } from "./controllers/videoController";


const PORT = 3000;
const app = express();
const httpServer = createServer(app);
// const io = initializeSocketServer(httpServer);
// initializeSocket(io);

app.use(express.json());
app.use(
  cors({
   
  })
);

app.use("/", videoRoutes);


httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


