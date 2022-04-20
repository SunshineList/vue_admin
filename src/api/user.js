import request from '@/utils/request'


export function login(data) {
  return request({
    url: '/user/login/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info/',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/login/',
    method: 'delete'
  })
}

// 获取验证码
export function fetchCaptcha() {
  return request({
    url: '/user/captcha/',
    method: 'post',
  })
}
