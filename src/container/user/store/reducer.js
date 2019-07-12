import { fromJS } from 'immutable'
import { Auth_ERROR, Auth_SUCCESS, COOKIE_SAVE, UP_DATA, LOGOUT } from './actionType'
import { getRedirectPach } from '../../../util'

const initState = fromJS({
  redirectTo: '',
  user: '',
  type: 'genius',
  msg: ''
})

export default (state = initState, action) => {
  switch (action.type) {
    case Auth_ERROR:
      return state.set('msg', action.msg);
    case Auth_SUCCESS:
      return state.merge({
        ...action.data.data,
        redirectTo: getRedirectPach(action.data.data)
      });
    case COOKIE_SAVE:
      return state.merge({...action.data});
    case UP_DATA:
      return state.merge({...action.data, redirectTo: getRedirectPach(action.data)})
    case LOGOUT:
      return fromJS({...initState.toJS(), redirectTo: '/login'})
    default:
      return state;
  }
}