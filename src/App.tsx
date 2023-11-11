import { ChakraProvider } from '@chakra-ui/react'
import './App.css'
import Routes from './routes/Routes'
import theme from './theme'

function App() {

  return (
    <ChakraProvider theme={theme}>
      <Routes />
    </ChakraProvider>
  )
}

export default App
