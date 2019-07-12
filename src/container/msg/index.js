import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

class Msg extends PureComponent {
  getLast (arr) {
    return arr[arr.length - 1]
  }
  render () {
    const { chatList, userId, users } = this.props
    const msgGroup = {}
    const { Item } = List
    const { Brief } = Item
    chatList.forEach(item => {
      msgGroup[item.chatid] = msgGroup[item.chatid] || []
      msgGroup[item.chatid].push(item)
    })
    const chat = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last - a_last
    })
    return (
      <div>
        <List>
          {chat.map(item => {
            const lastItem = this.getLast(item)
            const targetId = item[0].from === userId ? item[0].to : item[0].from
            const unread = item.filter(item => !item.read && item.to === userId).length
            if (!users[targetId]) {
              return null
            } 
            return (
              <Item
                extra={<Badge text={unread}/>}
                key={lastItem._id}
                thumb={require(`../../static/${users[targetId].avatar}.jpg`)}
                onClick={() => this.handleClick(targetId)}
              >
                {lastItem.content}
                <Brief>{users[targetId].name}</Brief>
              </Item>
            )
          })}
        </List>
      </div>
    )
  }
  handleClick (id) {
    this.props.history.push(`/chat/${id}`)
  }
}

const mapState = state => ({
  chatList: state.getIn(['chatMsg', 'chatList']),
  userId: state.getIn(['user', '_id']),
  users: state.getIn(['chatMsg', 'users'])
})

export default connect(mapState, null)(Msg)
