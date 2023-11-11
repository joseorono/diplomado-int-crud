import { Button } from '@chakra-ui/react'
import { Redirect, Route, Switch } from 'wouter'
import useAuthStore from '../store/useAuthStore'

const NoAuthRoutes = () => {

  //TODO: move auth store implementation to login page
  const { grantAuthentication } = useAuthStore()

  return (
    <Switch>
      <Route path='/login' component={() => <Button onClick={grantAuthentication}>Login</Button>} />
      <Route path='/sign-up' component={() => <>Sign up</>} />
      <Redirect to='/login' />
    </Switch>
  )
}

export default NoAuthRoutes