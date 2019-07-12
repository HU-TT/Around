import axios from 'axios'
import { Auth_ERROR, Auth_SUCCESS, COOKIE_SAVE, UP_DATA, LOGOUT } from './actionType'

const authErrorMsg = (msg) => ({ type: Auth_ERROR, msg })
const authSuccess = (data) => ({ type: Auth_SUCCESS, data })

export const inputRegister = ({ user, password, repeatPassword, type }) => {
  if (!user || !password || !type) {
    return authErrorMsg('用户名或密码必须输入')
  }
  if (password !== repeatPassword) {
    return authErrorMsg('两次输入的密码不相同')
  }
  return (dispatch) => {
    axios.post('/api/register', { user, password, type })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data
          if (data.success) {
            dispatch(authSuccess(data))
          } else {
            dispatch(authErrorMsg(data.msg))
          }
        }
      })
      .catch((err) => {
        dispatch(authErrorMsg(err))
      })
  }
}

export const inputLogin = ({ user, password }) => {
  if (!user || !password) {
    return authErrorMsg('用户名或密码不能为空')
  }
  return (dispatch) => {
    axios.post('/api/login', { user, password })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data
          if (data.success) {
            dispatch(authSuccess(data))
          } else {
            dispatch(authErrorMsg(data.msg))
          }
        }
      })
      .catch((err) => {
        dispatch(authErrorMsg('服务器错误'))
      })
  }
}

export const cookieSave = (data) => ({ type: COOKIE_SAVE, data })
const getUpData = (data) => ({type: UP_DATA, data})
export const upData = (data) => {
  return (dispatch) => {
    axios.post('/api/updata', data)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data
          if (data.success) {
            dispatch(getUpData(data.data))
          } else {
            dispatch(authErrorMsg(data.msg))
          }
        }
      })
      .catch((err) => {
        dispatch(authErrorMsg('服务器错误'))
      })
  }
}

export const logOutAction = () => ({type: LOGOUT})

