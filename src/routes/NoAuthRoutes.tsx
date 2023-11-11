import { Redirect, Route, Switch } from 'wouter'

const NoAuthRoutes = () => {
  return (
    <Switch>
      <Route path='/login' component={() => <>Login</>} />
      <Route path='/sign-up' component={() => <>Sign up</>} />
      <Redirect to='/login' />
    </Switch>
  )
}

export default NoAuthRoutes