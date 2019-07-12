import React, { PureComponent, Fragment } from 'react'
import { Result, WhiteSpace, List, Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import browserCookies from 'browser-cookies'
import { actioncCreators } from '../user/store/'

class Me extends PureComponent {
  constructor (props) {
    super(props)
    this.logOut = this.logOut.bind(this)
  }
  render () {
    const { user, avatar, id, desc, money, company, title, redirectTo } = this.props
    const { Item } = List
    const { Brief } = Item
    return user !== '' ? (
     <Fragment>
       <Result
         img={<img src={ avatar !== undefined ? require(`../../static/${avatar}.jpg`) : null } alt='' />}
         title={ user !== undefined ? user : null }
         message={<p>{ company !== undefined ? company : null }</p>}
       />
       <List renderHeader={() => '简介'} className="my-list">
         <Item
           multipleLine
         >
           { title !== undefined ? title : null }
           { desc !== undefined ? (desc.split('\n').map(item => (<Brief key={item}>{item}</Brief>))) : null }
           { money !== undefined ? <Brief>薪资：{money}</Brief> : null }
         </Item>
       </List>
       <WhiteSpace size='lg'/>
       <List>
         <Item onClick={ this.logOut }>
           退出登录
         </Item>
       </List>
     </Fragment>
    ) : (<Redirect to={redirectTo}/>)
  }

  logOut () {
    const { alert } = Modal
    alert('注销', '确认注销', [
      { text: '再想一下' },
      { text: '确认', onPress: () => {
        browserCookies.erase('user_id')
        this.props.logOutSubmit()
      } },
    ])
  }
}

const mapState = state => ({
  user: state.getIn(['user', 'user']),
  avatar: state.getIn(['user', 'avatar']),
  desc: state.getIn(['user', 'desc']),
  money: state.getIn(['user', 'money']),
  company: state.getIn(['user', 'company']),
  title: state.getIn(['user', 'title']),
  redirectTo: state.getIn(['user', 'redirectTo'])
})

const mapDispatch = dispatch => ({
  logOutSubmit() {
    const action = actioncCreators.logOutAction()
    dispatch(action)
  }
})

export default connect(mapState, mapDispatch)(Me)
