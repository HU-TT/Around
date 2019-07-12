import { USER_LIST } from './actionType'
import { fromJS } from 'immutable'

const initState = fromJS({
  userList: []
})

export default (state = initState, action) => {
  switch (action.type) {
    case USER_LIST:
      return state.merge({userList: action.data.data});
    default:
      return state;
  }
}