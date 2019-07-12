import React, { PureComponent } from 'react'
import { LogoWrapper } from './style'
import LogoImg from '../../static/logo.png'

class Logo extends PureComponent {
  render () {
    return (
      <LogoWrapper>
        <img src={ LogoImg } alt=""/>
      </LogoWrapper>
    )
  }
}

export default Logo