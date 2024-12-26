import React from "react";
import "./Input.css";
import Button from '../Button/Button'



const Input: React.FC = () => {
    const [url, setUrl] = React.useState<string>("");
  
  return (
    <>
      <div className="form-block">
              <div className="l-box">
                <div className="tarea-wrap">
                  <input  type="text" placeholder="Paste your video link here" ></input>
                  <a href="#" className="clear-btn"></a>
                </div>
              </div>
              <div className="r-box">
                <button type="submit" name="sf_submit" id="sf_submit" className="submit">Download</button>
              </div>
            </div>
    </>
  );

};
export default Input;
