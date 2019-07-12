import React, { PureComponent } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/'
import './style.css'
// 模块
import Login from './container/user/login/'
import Register from './container/user/register/'
import AuthRoute from './components/authroute/'
import BossInfo from './container/bossinfo/'
import Geniusinfo from './container/geniusinfo/'
import Dashboard from './components/dashboard/'
import Chat from './components/chat/'

function Index () {
  return (<p></p>)
}

class App extends PureComponent {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <AuthRoute/>
          <Switch>
            <Route path='/' exact component={Index}/>
            <Route path='/login' exact component={Login}/>
            <Route path='/register' exact component={Register}/>
            <Route path='/bossinfo' exact component={BossInfo}/>
            <Route path='/geniusinfo' exact component={Geniusinfo}/>
            <Route path='/chat/:id' component={Chat}/>
            <Route component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
