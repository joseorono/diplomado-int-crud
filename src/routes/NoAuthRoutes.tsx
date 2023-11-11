import { Redirect, Route, Switch } from 'wouter'
import { SignIn, SignUp } from '../pages'

const NoAuthRoutes = () => {
  return (
    <Switch>
      <Route path='/sign-in' component={SignIn} />
      <Route path='/sign-up' component={SignUp} />
      <Redirect to='/sign-in' />
    </Switch>
  )
}

export default NoAuthRoutes