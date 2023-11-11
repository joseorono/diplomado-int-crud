import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { Button, ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
const theme = extendBaseTheme({
  components: {
    Button,
  },
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
