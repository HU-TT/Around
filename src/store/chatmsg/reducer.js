import { MSG_LIST, MSG_RECV, MSG_READ } from './actionType'
import { fromJS, toJS } from 'immutable'

const initState = fromJS({
  chatList: [],
  users: {},
  unread: false
})

export default (state = initState, action) => {
  switch (action.type) {
    case MSG_LIST:
      const data = action.data
      return state.merge({chatList: data.data, unread: data.data.filter(item => !item.read && item.to === action.user_id).length, users: action.data.users});
    case MSG_RECV:
      return state.merge({chatList: [...state.get('chatList'), action.data], unread: action.data.to === action.id ? state.get('unread') + 1 : state.get('unread')})
    case MSG_READ:
      const { from, num } = action
      // const chat = state.get('chatList')
      // const chatlist = chat.map(item => {
      //   if (item.from === action.from && item.to === action.userId) {
      //     item.read = true
      //   }
      // })
      return state.merge({chatList: state.get('chatList').map(item => ({...item, read: from === item.from ? true : false})), unread: state.get('unread') - num});
    default:
      return state;
  }
}