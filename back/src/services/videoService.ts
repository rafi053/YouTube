import { existsSync, unlinkSync } from "fs";
import { exec } from "child_process";
import path from "path";
import util from "util";

const execPromise = util.promisify(exec);

const tempFolder = path.join(__dirname, "temp");

export const getVideo = async (url: string): Promise<string> => {
  const outputTemplate = path.join(tempFolder, "%(title)s.%(ext)s").replace(/\s+/g, '_');
  const command = `yt-dlp -f bestvideo+bestaudio -o "${outputTemplate}" "${url}"`;

  console.log(`Executing command: ${command}`);
  const { stdout, stderr } = await execPromise(command);

  console.log("yt-dlp stdout:", stdout);
  console.error("yt-dlp stderr:", stderr);

  // שליפת שם הקובץ הממוזג מתוך הפלט של yt-dlp
  const matches = stdout.match(/Merging formats into "(.*)"/);
  if (!matches || matches.length < 2) {
    console.error("Merged file path not found in yt-dlp output");

    // ניסיון נוסף לאתר את הקובץ עם חיפוש אחרי "Destination"
    const possiblePaths = stdout.match(/Destination:\s*(.*)\.webm/);
    if (possiblePaths && possiblePaths.length > 1) {
      const possibleFilePath = possiblePaths[1].trim().replace(/\s+/g, '_');
      console.log("Found possible merged file path:", possibleFilePath);
      
      if (existsSync(possibleFilePath)) {
        console.log(`File exists at: ${possibleFilePath}`);
        return possibleFilePath;
      } else {
        console.error(`File not found at: ${possibleFilePath}`);
        throw new Error("Failed to determine merged file path");
      }
    } else {
      // אם לא מצאנו את הנתיב גם כאן, זה מצביע על בעיה קשה יותר
      console.error("Destination file path not found in yt-dlp output");
      console.log("Complete stdout:", stdout);
      throw new Error("Merged file path not found in yt-dlp output");
    }
  }

  let mergedFilePath = matches[1].trim(); // מתקן את הנתיב
  mergedFilePath = mergedFilePath.replace(/\s+/g, '_'); // מנקה רווחים

  // אם הקובץ קיים, מחק אותו
  if (existsSync(mergedFilePath)) {
    console.log(`File already exists, removing it: ${mergedFilePath}`);
    unlinkSync(mergedFilePath);
  }

  // המתנה לזמן מסוים להשלמת האיחוד
  await new Promise(resolve => setTimeout(resolve, 2000));

  // בדיקת קיום הקובץ לאחר ההמתנה
  if (!existsSync(mergedFilePath)) {
    console.error(`File not found: ${mergedFilePath}`);
    const filesInTemp = await execPromise(`dir "${tempFolder}"`);
    console.log("Files in temp folder:", filesInTemp.stdout);
    throw new Error(`File not found: ${mergedFilePath}`);
  }

  return mergedFilePath;
};
