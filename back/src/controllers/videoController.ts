import { Request, Response } from 'express';
import * as videoService from '../services/videoService';
import { Server as SocketIOServer } from "socket.io";
import { io } from '../server';


export const getVideo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { url, socketId } = req.query;

    if (!url || !socketId) {
      res.status(400).json({ error: "No URL or socketId provided" });
      return;
    }

    const decodedUrl = decodeURIComponent(url as string);

    await videoService.getVideo(decodedUrl, io, socketId as string, (progressMessage) => {
      io.to(socketId as string).emit("download", progressMessage);
    });

    res.status(200).json({ message: "Download process initiated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
