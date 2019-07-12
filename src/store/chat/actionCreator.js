import { USER_LIST } from './actionType'
import axios from 'axios'

const userListAction = data => ({type: USER_LIST, data})

export const getUserList = (type) => {
  return dispatch => {
    axios.get('/api/list?t=' + type)
      .then((res) => {
        const data = res.data
        if (data.success) {
          const action = userListAction(data)
          dispatch(action)
        }
      })
  }
}

