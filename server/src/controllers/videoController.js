import { videoService } from "../services/videoService.js";
import fs from "fs/promises";

export const videoController = async (req, res) => {
  try {
    const { url } = req.body;        

    if (!url) {
      console.error("No URL provided");
      return res.status(400).json({ error: "No URL provided" });
    }

    console.log("URL received:", url);

    // פיענוח ה-URL
    const decodedUrl = decodeURIComponent(url);
    console.log("Decoded URL:", decodedUrl);

    // קריאה לשירות הוידאו
    const result = await videoService(decodedUrl);
    console.log("VideoService result:", result);

    // מחיקת הקובץ מהשרת אחרי השליחה
    const filePath = result; // עדכן את המיקום על פי השירות
    res.download(filePath, async (err) => {
      if (err) {
        console.error("Error sending file:", err.message);
        return res.status(500).json({ error: "Failed to send video file" });
      }

      try {
        await fs.unlink(filePath);
        console.log("Temporary file deleted:", filePath);
      } catch (error) {
        console.error("Error deleting temporary file:", error.message);
      }
    });
  } catch (error) {
    console.error("Error in videoController:", error.message || error); // ודא הדפסה
    res.status(500).json({ error: error.message || "Unexpected error" });
  }
};
