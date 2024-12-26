import { exec } from "child_process";

const videoPath = "C:\Users\Public\Downloads\%(title)s.%(ext)s";

export const getVideo = async (url: string) => {
  exec(`yt-dlp -f bestvideo+bestaudio -o "${videoPath}" "${url}"`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
    console.log(stderr);
  });
};