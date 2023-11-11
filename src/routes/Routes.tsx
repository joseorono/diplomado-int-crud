import useAuthStore from '../store/useAuthStore'
import AuthRoutes from './AuthRoutes'
import NoAuthRoutes from './NoAuthRoutes'
import { Flex } from '@chakra-ui/react'

const Routes = () => {

  const { isAuthenticated } = useAuthStore()

  return (
    <Flex height={'100%'}>
      {
        isAuthenticated ?
          <AuthRoutes />
          :
          <NoAuthRoutes />
      }
    </Flex>
  )
}

export default Routes