import React, { PureComponent, Fragment } from 'react'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import NavLink from '../navlink/'
import Personnel from '../../container/personnel'
import Msg from '../../container/msg/'
import Me from '../../container/me/'
import { actionCreator } from '../../store/chatmsg/'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:9093/')

class Dashboard extends PureComponent {
  componentDidMount () {
    if (!this.props.chatList.length) {
      this.props.getMsglist()
      this.props.getMsg(this.props.id)
    }
  }
  render () {
    const { type } = this.props
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'job',
        title: '牛人列表',
        component: Personnel,
        hide: type === 'genius'
      },
      {
        path: '/genius',
        text: 'BOSS',
        icon: 'job',
        title: 'BOSS列表',
        component: Personnel,
        hide: type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'me',
        title: '个人信息',
        component: Me
      }
    ]
    return (
      <Fragment>
        <NavBar className='navBar' mode='dark' style={{
          position: 'fixed',
          top: 0,
          width: '100%'
        }}>{navList.find(value => value.path === this.props.location.pathname).title}</NavBar>
        <div className='container'>
            <Switch>
              {navList.map(item => (<Route path={item.path} exact component={item.component} type={item.type} key={item.path}/>))}
            </Switch>
        </div>
        <NavLink navlist={navList}/>
      </Fragment>
    )
  }
}

const mapState = state => ({
  type: state.getIn(['user', 'type']),
  chatList: state.getIn(['chatMsg', 'chatList'])
})

const mapDispatch = dispatch => ({
  getMsglist () {
    const action = actionCreator.getMsgList()
    dispatch(action)
  },
  getMsg (id) {
    socket.on('recvmsg', function (data) {
      const action = actionCreator.msgRecv(data, id)
      dispatch(action)
    })
  }
})

export default connect(mapState, mapDispatch)(Dashboard)
