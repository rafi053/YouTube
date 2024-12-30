import React, { useState } from "react";
import "./Home.css";
import Input from "../Input/Input";
import Button from "../Button/Button";

const Home: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  

  const handleChange = (url: string) => {
    setUrl(url);
  };


  return (
    <>
      <div className="input-group">
        <Input value={url} onChange={handleChange} />
        <Button url={url} />
      </div>
      
    </>
  );
};

export default Home;
