import React, { useEffect, useState } from "react";
import "./Home.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { io } from "socket.io-client";

const Home: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);

  const handleChange = (url: string) => {
    setUrl(url);
  };

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("download", (data: number) => {
      console.log("Download progress:", data);
      
      setProgress(data);
    });

    socket.on("done", (data: { success: boolean }) => {
      if (data.success) {
        setIsDone(true);
      } else {
        console.error("Download failed");
      }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleDownload = () => {
    if (url) {
      setProgress(0);
      setIsDone(false);
      const socket = io("http://localhost:3000");
      socket.emit("download", url);
    } else {
      alert("Please enter a valid URL");
    }
  };

  return (
    <>
      <div className="input-group">
        <Input value={url} onChange={handleChange} />
        <Button url={url} onDownload={handleDownload} />
      </div>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <p>{isDone ? "Download completed!" : `Progress: ${progress}%`}</p>
      </div>
    </>
  );
};

export default Home;
