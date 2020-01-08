import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import Signup from './user/Signup'
import Signin from './auth/Signin'
import Profile from './user/Profile'
import Menu from './utilComponents/Menu'
import Home from './utilComponents/Home'

class MainRouter extends Component {

  //doc react material ui
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    return (<div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <Route path="/user/:userId" component={Profile}/>
      </Switch>
    </div>)
  }
}

export default MainRouter
