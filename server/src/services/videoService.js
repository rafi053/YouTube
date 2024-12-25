import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// השתמש ב-import.meta.url כדי לחשב את __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const videoService = (url) => {
  return new Promise((resolve, reject) => {
    // השתמש ב-encodeURIComponent להימנע מבעיות עם תווים מיוחדים ב-URL
    const safeUrl = encodeURIComponent(url);

    // יצירת נתיב דינמי לפי שם הווידאו
    const videoPath = path.join(__dirname, "..", "downloads", "%(title)s.%(ext)s");

    // הרצת פקודת yt-dlp להורדת הסרטון
    exec(`yt-dlp -f b best -o "${videoPath}" "${safeUrl}"`, (err, stdout, stderr) => {
      if (err) {
        console.error("Error downloading video:", stderr);
        return reject(err);
      }
      console.log("Video downloaded:", stdout);
      resolve(videoPath); // מחזיר את הנתיב של הקובץ שהורד
    });
  });
};
