import { MSG_LIST, MSG_RECV, MSG_READ } from './actionType'
import axios from 'axios'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:9093/')

const msgList = (data, user_id) => ({type: MSG_LIST, data, user_id})

export function getMsgList () {
  return (dispatch, getState) => {
    axios.get('/api/msgList')
      .then(res => {
        const data = res.data
        const user_id = getState().getIn(['user', '_id'])
        if (data.success) {
          const action = msgList(data, user_id)
          dispatch(action)
        }
      })
  }
}

export const msgRecv = (data, id) => ({type: MSG_RECV, data, id})

const msgRead = (from, userId, num) => ({type: MSG_READ, from, userId, num})

export function rand (from) {
  return (dispatch, getState) => {
    axios.post('/api/readmsg', {from})
      .then(res => {
        const userId = getState().getIn(['user', '_id'])
        const data = res.data
        if (data.success) {
          dispatch(msgRead(from, userId, data.num))
        }
      })
  }
}
