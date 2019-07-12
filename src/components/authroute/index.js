import React, { PureComponent } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { actioncCreators, actionType } from '../../container/user/store/'

class AuthRoute extends PureComponent {
  render () {
    return null
  }

  componentDidMount () {
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname) > -1) {
      return null
    }
    this.props.getCookie.bind(this)()
  }
}

const mapDisPatch = dispatch => ({
  getCookie () {
    axios.get('/api/info')
      .then(res => {
        const data = res.data
        if (res.status === 200) {
          if (data.success) {
            const action = actioncCreators.cookieSave(data.data)
            dispatch(action)
          } else {
            this.props.history.push('/login')
          }
        }
      })
  }
})

export default withRouter(connect(null, mapDisPatch)(AuthRoute))
