import { dialog } from 'electron';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

// הפונקציה שמורידה את הסרטון לנתיב שהמשתמש בחר
export const videoService = async (url) => {
  try {
    // הצגת דיאלוג לבחירת תיקייה
    const folderSelection = await dialog.showOpenDialog({
      properties: ['openDirectory']
    });

    if (folderSelection.canceled || !folderSelection.filePaths.length) {
      console.log("User canceled the folder selection.");
      return;
    }

    // יצירת נתיב קובץ להורדה
    const folderPath = folderSelection.filePaths[0];
    const finalPath = `${folderPath}/%(title)s.%(ext)s`;

    // הפעלת yt-dlp
    const { stdout, stderr } = await execPromise(`yt-dlp -f bestvideo+bestaudio -o "${finalPath}" ${url}`);
    if (stderr) {
      console.error("Error in yt-dlp:", stderr);
      throw new Error(stderr);
    }
    console.log("Video downloaded successfully:\n", stdout);
  } catch (error) {
    console.error("Error in videoService:", error.message || error);
    throw error;
  }
};
