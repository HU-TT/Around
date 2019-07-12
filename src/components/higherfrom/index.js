import React, { PureComponent } from 'react'

export default function HigherFrom (Comp) {
  return class From extends PureComponent {
    constructor (props) {
      super(props)
      this.state = {
        user: '',
        password: '',
        repeatPassword: '',
        type: 'genius'
      }
    }

    handleChange (key, val) {
      this.setState({
        [key]: val
      })
    }

    render () {
      return (<Comp handleChange={this.handleChange.bind(this)} state={this.state} {...this.props}/>)
    }
  }
}
