import { exec } from "child_process";

export const getVideo = async (url: string) => {
  try {
    const command = `yt-dlp -f bestvideo+bestaudio -o "C:/Users/Public/Downloads/%(title)s.%(ext)s" ${url}`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return; 
      }
      console.log(`stdout: ${stdout}`);
    });
  } catch (error) {
    console.error(error);
  }
};
