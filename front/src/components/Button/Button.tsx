import React from 'react'
import './Button.css'
import * as fetchData from '../../fetchData/fetchData'

interface ButtonProps {
  url?: string
  onDownload: () => void
}

const Button:React.FC<ButtonProps> = ({url, onDownload}) => {
  console.log('url', url);
  

  const  handelClick  = async (urlProps: string | undefined) => {
    console.log('urlProps', urlProps);
    
    if (!urlProps) {
      return;
    }

      const response = await fetchData.getVideo(urlProps, 'socketId');
      console.log('response', response);

  }
  return (
    <>
      <button className="button"  onClick={() => handelClick(url)}><span className="text">Download</span></button>
    </>
  )
}
export default Button
