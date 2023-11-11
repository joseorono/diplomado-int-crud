import { ChakraProvider } from '@chakra-ui/react'
import './App.css'
import Routes from './routes/Routes'
import theme from './theme'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Routes />
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ChakraProvider>
  )
}
