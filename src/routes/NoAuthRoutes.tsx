import { Redirect, Route, Switch } from 'wouter'
import { SignIn, SignUp } from '../views'

import MainHub from '../views/MainHub'

const NoAuthRoutes = () => {
  return (
    <Switch>
      <Route path='/sign-in' component={SignIn} />
      <Route path='/sign-up' component={SignUp} />
      <Route path='/hub' component={MainHub} />
      <Redirect to='/hub' />
    </Switch>
  )
}

export default NoAuthRoutes