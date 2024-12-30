import { Request, Response } from 'express';
import * as videoService from '../services/videoService';
import path from 'path';

export const getVideo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { url } = req.query;

    if (!url) {
      res.status(400).json({ error: "No URL provided" });
      return;
    }

    const decodedUrl = decodeURIComponent(url as string);
    const videoPath = await videoService.getVideo(decodedUrl);

    // נרמול הנתיב
    const normalizedPath = path.normalize(videoPath);
    console.log('Normalized file path:', normalizedPath);

    // קביעת שם הקובץ שיתקבל
    const fileName = encodeURIComponent(path.basename(normalizedPath));

    // הגדרת כותרות להורדת קובץ
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/octet-stream');

    // שליחת הקובץ
    res.download(normalizedPath, fileName, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).json({ error: 'Failed to send video file' });
      } else {
        console.log('File sent successfully:', normalizedPath);
      }
    });
  } catch (error) {
    console.error('Error in videoController:', error);
    res.status(500).json({ error: 'Unexpected error occurred' });
  }
};
