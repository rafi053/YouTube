import { Request, Response } from 'express';
import * as videoService from '../services/videoService';


export const getVideo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { url } = req.query;

    if (!url) {
      res.status(400).json({ error: "No URL or socketId provided" });
      return;
    }

    const decodedUrl = decodeURIComponent(url as string);

    await videoService.getVideo(decodedUrl);

    res.status(200).json({ message: "Download process initiated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
