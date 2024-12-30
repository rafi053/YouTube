import { exec } from "child_process";
import { Server } from "socket.io";

export const getVideo = async (
  url: string,
  io: Server,
  socketId: string,
  onProgress?: (message: string) => void
): Promise<string> => {
  const command = `yt-dlp -f bestvideo+bestaudio -o "C:/Users/Public/Downloads/%(title)s.%(ext)s" ${url}`;

  return new Promise<string>((resolve, reject) => {
    const process = exec(command);

    process.stdout?.on("data", (data) => {
      const progressData = data.trim();
      if (onProgress) {
        onProgress(progressData);
      }
      console.log(progressData);

      io.to(socketId).emit("progress", progressData);
    });

    process.stderr?.on("data", (data) => {
      const errorData = data.trim();
      console.error(`Error/Progress: ${errorData}`);
      if (onProgress) {
        onProgress(errorData);
      }

      io.to(socketId).emit("error", errorData);
    });

    process.on("close", (code) => {
      if (code === 0) {
        io.to(socketId).emit("done", { success: true });
        resolve("Download completed successfully!");
      } else {
        io.to(socketId).emit("done", { success: false });
        reject(new Error(`Download failed with exit code: ${code}`));
      }
    });

    process.on("error", (error) => {
      io.to(socketId).emit("done", { success: false });
      reject(new Error(`Process error: ${error.message}`));
    });
  });
};
