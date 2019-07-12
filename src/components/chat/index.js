import React, { PureComponent, Fragment } from 'react'
import io from 'socket.io-client'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { actionCreator } from '../../store/chatmsg/'
import { getChatId } from '../../util'
const socket = io.connect('http://localhost:9093/')

class Chat extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    if (!this.props.chatList.length) {
      this.props.getMsglist()
      this.props.getMsg(this.props.id)
    }

  }
  
  componentWillUnmount () {
    const from = this.props.match.params.id
    this.props.randMsg(from)
  }

  render () {
    const Item = List.Item
    const { chatList, avatar, users, id } = this.props
    const chatId = getChatId(id, this.props.match.params.id)
    const chat = chatList.filter(item => (item.chatid === chatId))
    const user = users[this.props.match.params.id]
    return (
       <Fragment>
         <NavBar
           icon={<Icon type="left" />}
           onLeftClick={() => this.props.history.goBack()}
           mode='dark' 
           className='navBar'
         >{user !== undefined ? user.name : null}</NavBar>
         <List className='container'>
           { chat.map(item => (item.from === this.props.match.params.id ? (<Item
               key={item._id}
               thumb={ user !== undefined ? require(`../../static/${user.avatar}.jpg`) : null}
             >{item.content}</Item>)
             : ( <Item
                  key={item._id}
                  extra={<img src={require(`../../static/${avatar}.jpg`)} className='avatar' alt='' />}
             >{item.content}</Item>))) }
         </List>
         <List style={{ position: 'fixed', bottom: 0, width: '100%' }}>
           <Item
             extra={<span style={{ background: '#108EE9', padding: '10px 20px', borderRadius: '20px', color: '#fff' }} onClick={this.handleSubmit}>发送</span>}
           >
              <InputItem
                placeholder='输入信息'
                value={this.state.text}
                onChange={val => this.setState({text: val})}
              />
           </Item>
         </List>
       </Fragment>
    )
  }

  handleSubmit () {
    const from = this.props.id
    const to = this.props.match.params.id
    const msg = this.state.text
    socket.emit('sendmsg', {from, to, msg})
    this.setState({text: ''})
  }
}

const mapState = state => ({
  id: state.getIn(['user', '_id']),
  avatar: state.getIn(['user', 'avatar']),
  chatList: state.getIn(['chatMsg', 'chatList']),
  users: state.getIn(['chatMsg', 'users'])
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
  },
  randMsg (from) {
    const action = actionCreator.rand(from)
    dispatch(action)
  }
})

export default connect(mapState, mapDispatch)(Chat)
