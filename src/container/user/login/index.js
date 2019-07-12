import React, { PureComponent } from 'react'
import Logo from '../../../components/logo'
import { Button, InputItem, List, WhiteSpace, WingBlank } from 'antd-mobile/lib/index'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import 'antd-mobile/dist/antd-mobile.css'
import { actioncCreators } from '../store/'
import HigherFrom from '../../../components/higherfrom/'

class Login extends PureComponent {
  constructor (props) {
    super(props)
    this.toRegister = this.toRegister.bind(this)
  }

  render () {
    const { handleLogin, redirectTo, msg, handleChange } = this.props
    return (
      <div>
        { (redirectTo && redirectTo !== '/login') ? <Redirect to={ redirectTo } /> : null}
        <Logo/>
        <List>
          { msg ? <p>{msg}</p> : null }
          <InputItem placeholder='用户名' onChange={ val => handleChange('user', val) }>用户名</InputItem>
          <InputItem placeholder='密码' type='password' onChange={ val => handleChange('password', val) }>密码</InputItem>
          <WingBlank size='md'>
            <WhiteSpace size='lg'/>
            <Button type='primary' onClick={ handleLogin.bind(this) } >登录</Button>
            <WhiteSpace size='lg' />
              <Button type='primary' onClick={ this.toRegister }>注册</Button>
          </WingBlank>
        </List>
      </div>
    )
  }

  toRegister () {
    this.props.history.push('/register')
  }
}

const mapState = (state) => ({
  msg: state.getIn(['user', 'msg']),
  redirectTo: state.getIn(['user', 'redirectTo'])
})

const mapDispatch = dispatch => ({
  handleLogin () {
    const action = actioncCreators.inputLogin(this.props.state)
    dispatch(action)
  }
})

export default withRouter(connect(mapState, mapDispatch)(HigherFrom(Login)))