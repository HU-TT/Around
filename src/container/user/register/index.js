import React, { PureComponent } from 'react'
import { Button, List, InputItem, WhiteSpace, WingBlank, Radio } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import Logo from '../../../components/logo/'
import { actioncCreators } from '../store/index'
import HigherFrom from '../../../components/higherfrom/'

class Register extends PureComponent {
  constructor (props) {
    super(props)
    this.toLogin = this.toLogin.bind(this)
  }

  render () {
    const RadioItem = Radio.RadioItem
    const { handleRegister, msg, redirectTo, handleChange, state } = this.props
    return (
      <div>
        { redirectTo ? <Redirect to={ redirectTo } /> : null}
        <Logo/>
        <List>
          { msg ? <p>{msg}</p> : null }
          <InputItem placeholder='用户名' onChange={val => handleChange('user', val)}>用户名</InputItem>
          <InputItem placeholder='密码' type='password' onChange={val => handleChange('password', val)}>密码</InputItem>
          <InputItem placeholder='确认密码' type='password' onChange={val => handleChange('repeatPassword', val)}>确认密码</InputItem>
          <RadioItem name='' defaultChecked={true} checked={state.type === 'genius'}
                     onChange={() => handleChange('type', 'genius')}>牛人</RadioItem>
          <RadioItem name='' checked={state.type === 'boss'}
                     onChange={() => handleChange('type', 'boss')}>BOSS</RadioItem>
          <WingBlank size='md'>
            <WhiteSpace size='lg'/>
            <Button type='primary' onClick={ handleRegister.bind(this) }>注册</Button>
            <WhiteSpace size='lg'/>
            <Button type='primary' onClick={this.toLogin}>登录</Button>
          </WingBlank>
        </List>
      </div>
    )
  }

  toLogin () {
    this.props.history.push('/login')
  }

}

const mapState = (state) => ({
  msg: state.getIn(['user', 'msg']),
  redirectTo: state.getIn(['user', 'redirectTo'])
})

const mapDispatch = dispatch => ({
  handleRegister () {
    const action = actioncCreators.inputRegister(this.props.state)
    dispatch(action)
  }
})

export default withRouter(connect(mapState, mapDispatch)(HigherFrom(Register)))
