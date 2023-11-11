import { Switch, Route, Redirect } from "wouter"

const AuthRoutes = () => {
  return (
    <Switch>
      <Route path='/devs' component={() => <>Login</>} />
      <Redirect to='/devs' />
    </Switch>
  )
}

export default AuthRoutes