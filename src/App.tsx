import { ChakraProvider } from '@chakra-ui/react'
import './App.css'
import Routes from './routes/Routes'
import theme from './theme'

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Routes />
    </ChakraProvider>
  )
}
