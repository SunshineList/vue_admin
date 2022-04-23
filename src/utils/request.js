import axios from 'axios'
import router from '@/router'
import { Notification, MessageBox } from 'element-ui'
import store from '../store'
import { getToken, removeCsrfToken, removeSessionid } from '@/utils/auth'

console.log('process.env.BASE_API', process.env.VUE_APP_BASE_API)

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 60000, // 请求超时时间
  withCredentials: true
})

// request拦截器
service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Token ${token}`
    } else {
      delete config.headers.Authorization
    }
    config.headers['Content-Type'] = 'application/json'
    if (config.data !== undefined) {
      if (config.data.excu !== undefined) {
        if (config.data.excu === 'tail_start') {
          config.timeout = 60000 * 20
        } else {
          config.timeout = 20000
        }
      }
    }

    config.url = config.url.replace(/\?$/, '').replace(/\/+/, '/')
    if (/^(\/rest\/v1)/.test(config.url)) {
      config.baseURL = ''
    }

    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const code = response.status
    if (code >= 400) {
      return Promise.reject(new Error(response.data))
    } else {
      return response.data
    }
  },
  error => {
    const code = error.response.status || 0
    let errMsg = '出错了'
    if (!code) {
      errMsg = '请求超时'
      // Notification.error({
      //   title: '错误',
      //   message: '请求超时!'
      // })
    } else if (code === 400 && error.response.data.user_id) {
      errMsg = error.response.data.error
      MessageBox.confirm('密码已经过期,请修改密码', '系统提示', {
        confirmButtonText: '修改密码',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 赶时间写了一个究极丑陋的嵌套
        MessageBox.prompt('设置新密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: new RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,30}'),
          inputErrorMessage: '密码需要包含大小写字母、数组与特殊字符'
        }).then(({ value }) => {
          // setOutTimePassword(error.response.data.user_id, value).then(result => {
          MessageBox.alert('密码修改成功', '系统提示', {
            confirmButtonText: '确定',
            showClose: false
          }).then(() => {
            location.reload() //
          })
          // })
        }).catch(() => {

        })
      })
    } else if (code === 401) {
      errMsg = '登录状态过期'
      MessageBox.confirm('登录状态过期了哦，您可以继续留在该页面，或者重新登录', '系统提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/logout').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    } else if (code === 403) {
      console.warn(403)
      errMsg = error.response.data.error || '登录状态过期'
      // router.push({ path: '/401' })
      if (errMsg.indexOf('csrf') !== -1) {
        store.dispatch('user/logout')
        removeCsrfToken()
        removeSessionid()
        router.replace({ path: '/login' })
      }
    } else if (code >= 500) {
      errMsg = '后端服务器连接失败'
    } else {
      errMsg = error.response.data.error || '出错了'
    }
    if (code == 400 && error.response.data.user_id) {
      console.log('不弹窗')
    } else {
      Notification.error({
        title: '错误',
        message: errMsg,
        duration: 2500
      })
    }
    return Promise.reject(error)
  }
)
export default service

export async function post(...params) {
  const response = await service.post(...params)
  return response
}

/**
 * 过滤url的请求域(origin)
 * @param {string} url
 * @returns {string}
 */
function filterUrlOrigin(url) {
  if (!url) return ''
  try {
    var url_obj = new URL(url)
  } catch (err) {
    return url
  }

  return url.replace(url_obj.origin, '')
}

export async function get(...rest) {
  let [, config] = rest

  config = handleGetRequestPagationParams(config)
  rest[1] = config

  let response = await service.get(...rest)
  const temp = response

  // 根据返回数据特征判断是否分页
  if ('next' in temp && 'previous' in temp && 'count' in temp && 'results' in temp) {
    // 分页接口解析成element-ui分页组件可用的数据
    // {page:1,size:10,results:[...]}
    response = parsePageResponse(temp)

    // dev环境下，返回的下一页和上一页数据都是带域名的，会导致跨域，把域名过滤掉
    // if (IS_DEV) {
    response.next = filterUrlOrigin(response.next)
    response.previous = filterUrlOrigin(response.previous)
    // }
  }
  return response
}

export async function del(...params) {
  const response = await service.delete(...params)
  return response
}

export async function put(...params) {
  const response = await service.put(...params)
  return response
}

export async function patch(...params) {
  const response = await service.patch(...params)
  return response
}

export function getUploadHeaders() {
  return {
    Authorization: `Token ${getToken()}`
  }
}
