import React, { PureComponent } from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'
import { actionCreator } from '../../store/chat/'



class Personnel extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      list: []
    }
  }

  componentDidMount () {
    const type = this.props.location.pathname === '/boss' ? 'genius' : 'boss'
    this.props.getList(type)
  }

  render () {
    const { Header, Body, Footer } = Card
    return (
      <WingBlank size='lg'>
        {this.props.list.map(item => (item.avatar ? (
          <div  key={item._id}>
            <WhiteSpace size='lg'/>
            <Card
              onClick={() => this.handleClick(item)}
            >
              <Header
                title={item.user}
                thumb={item.avatarUrl}
                extra={<span>{item.title}</span>}
              />
              <Body>
                {item.desc.split('\n').map(item => (<p key={item}>{item}</p>))}
              </Body>
              { item.type === 'boss' ? (<Footer content={`公司：${item.company}`} extra={<div>{`月薪：${item.money}`}</div>} />) : null }
            </Card>
          </div>
        ) : null))}
      </WingBlank>
    )
  }
  handleClick (val) {
    this.props.history.push(`/chat/${val._id}`)
  }
}

const mapState = state => ({
  list: state.getIn(['chat', 'userList'])
})

const mapDispatch = (dispatch) => ({
  getList (type) {
    const action = actionCreator.getUserList(type)
    dispatch(action)
  }
})

export default connect(mapState, mapDispatch)(Personnel)
