import React, { PureComponent, Fragment } from 'react'
import { InputItem, NavBar, TextareaItem, WhiteSpace, Button, List } from 'antd-mobile/lib/index'
import AvatarSelector  from '../../components/avatarSelector'
import { connect } from 'react-redux'
import { actioncCreators } from '../user/store/'
import { Redirect } from 'react-router-dom'

class BossInfo extends PureComponent{
  constructor (props) {
    super(props)
    this.state = {
      avatar: '',
      avatarUrl: '',
      title: '',
      company: '',
      money: '',
      desc: ''
    }
  }
  render () {
    const Item = List.Item
    const { handleClick, redirectTo } = this.props
    const pathname = this.props.location.pathname
    return (
      <Fragment>
        { redirectTo && redirectTo !== pathname ? (<Redirect to={redirectTo}/>) : null }
        <NavBar mode='dark'>完善BOSS信息</NavBar>
        <List>
          { this.state.avatarUrl ? (<Item>当前选择的头像<img src={this.state.avatarUrl} style={{ width: '26px', height: '26px' }} alt=''/></Item>) : null }
        </List>
        <AvatarSelector selectorAvatar={ this.handleselectAvatar.bind(this) } />
        <InputItem placeholder='招聘职位' onChange={ val => this.handleChange('title', val) }>招聘职位</InputItem>
        <InputItem placeholder='公司名称' onChange={ val => this.handleChange('company', val) }>公司名称</InputItem>
        <InputItem placeholder='职位薪资' onChange={ val => this.handleChange('money', val) }>职位薪资</InputItem>
        <TextareaItem placeholder='职位要求' title='职位要求' rows='2' autoHeight={true} onChange={ val => this.handleChange('desc', val) }/>
        <WhiteSpace size='lg'/>
        <Button type='primary' onClick={ handleClick.bind(this) }>提交</Button>
      </Fragment>
    )
  }
  handleselectAvatar (item) {
    this.setState({
      avatar: item.text,
      avatarUrl: item.icon
    })
  }
  handleChange (key, val) {
    this.setState({
      [key]: val
    })
  }
}

const mapState = (state) => ({
  redirectTo: state.getIn(['user', 'redirectTo'])
})

const mapDisPatch = (dispatch) => ({
  handleClick() {
    const action = actioncCreators.upData(this.state)
    dispatch(action)
  }
})

export default connect(mapState, mapDisPatch)(BossInfo)
