import { Switch, Route, Redirect } from "wouter"
import DevList from "../views/DevList"

const AuthRoutes = () => {
  return (
    <Switch>
      <Route path='/devs' component={DevList} />
      <Redirect to='/devs' />
    </Switch>
  )
}

export default AuthRoutes