import React, { PureComponent } from 'react'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class NavLink extends PureComponent {
  render () {
    const { Item } = TabBar
    const { navlist, unread } = this.props
    const navList = navlist.filter(value => !value.hide)
    return (
      <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <TabBar>
          {navList.map(value => (
            <Item
              badge={ value.path === '/msg' ? unread : null }
              key={value.path}
              title={value.text} 
              icon={{ uri: require(`../../static/${value.icon}.svg`) }}
              selectedIcon={{ uri: require(`../../static/${value.icon}-active.svg`) }}
              selected={ this.props.location.pathname === value.path }
              onPress={() => {
                this.props.history.push(value.path)
              }}
            />
          ))}
        </TabBar>
      </div>
    )
  }
}

const mapSteta = state => ({
  unread: state.getIn(['chatMsg', 'unread'])
})

export default withRouter(connect(mapSteta, null)(NavLink))