import React from 'react'
import  theme from'./theme'
import BasicInput from './components/Input'
import { ThemeProvider } from '@mui/material'
import IconLabelButtons from './components/Button'

const App:React.FC = () => {
  return (
   <>
   <ThemeProvider theme={theme}>
    <BasicInput/>
    <IconLabelButtons/>
    </ThemeProvider>

   </>
  )
}

export default App
