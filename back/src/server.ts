import express from "express";
import cors from "cors";
import { createServer } from "http";

import videoRoutes from './routes/videoRoutes'; 

import { initializeSocketServer } from "./socketServer";


const PORT = 3000;
const app = express();
const httpServer = createServer(app);
export const io = initializeSocketServer(httpServer);


app.use(express.json());
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig))

app.use("/", videoRoutes);

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


