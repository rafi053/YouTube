import { videoService } from "../services/videoService.js";

export const videoController = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "No URL provided" });
    }

    
    // קריאה לשירות
    const result = await videoService(url);

    console.log("Best Formats Found:", result);

    // החזרת התוצאה ללקוח
    res.json(result);
  } catch (error) {
    console.error("Error in videoController:", error.message || error);
    res.status(500).json({ error: error.message || "Unexpected error" });
  }
};
