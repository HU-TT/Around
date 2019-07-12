import React, { PureComponent } from 'react'
import { Grid } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends PureComponent {
  static propTypes = {
    selectorAvatar: PropTypes.func.isRequired
  }
  render () {
    const avatarList = 'avatar(1),avatar(2),avatar(3),avatar(4),avatar(5),avatar(6),avatar(7),avatar(8),avatar(9),avatar(10),avatar(11),avatar(12),avatar(13),avatar(14),avatar(15),avatar(16)'
      .split(',')
      .map(val => ({
        icon: require(`../../static/${val}.jpg`),
        text: val
      }))
    return (
      <div>
        <Grid
          data={avatarList}
          onClick={ (item) => this.props.selectorAvatar(item) }
        />
      </div>
    )
  }
}

export default AvatarSelector
