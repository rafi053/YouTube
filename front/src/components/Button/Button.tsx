import React from 'react'
import './Button.css'
import * as fetchData from '../../fetchData/fetchData'

interface ButtonProps {
  url?: string
}

const Button:React.FC<ButtonProps> = ({url}) => {
  console.log('url', url);
  

  const  handelClick  = async (urlProps: string | undefined) => {
    console.log('urlProps', urlProps);
    
    if (!urlProps) {
      return;
    }

      const response = await fetchData.getVideo(urlProps);
      console.log('response', response);

  }
  return (
    <>
      <button className="button"  onClick={() => handelClick(url)}><span className="text">Send</span></button>
    </>
  )
}
export default Button
