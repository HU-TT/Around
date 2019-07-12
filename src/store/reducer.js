import { combineReducers } from 'redux-immutable'
import { reducer as userReducer } from '../container/user/store/'
import { reducer as chatReducer } from './chat/'
import { reducer as chatMsgReducer } from './chatmsg/'

export default combineReducers({
  user: userReducer,
  chat: chatReducer,
  chatMsg: chatMsgReducer
})
