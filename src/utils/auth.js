import Cookies from 'js-cookie'
const storage = global.sessionStorage
const TokenKey = 'Token'
const superKey = 'isSuperuser'
const csrfKey = 'csrftoken'
const sessionKey = 'sessionid'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, rememberMe) {
  if (rememberMe) {
    return Cookies.set(TokenKey, token, { expires: 1 })
  } else return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setsuperUser(isSuperuser) {
  return storage.setItem(superKey, isSuperuser)
}

export function getsuperUser() {
  let isSuper = storage.getItem(superKey)
  if (typeof isSuper === 'string') {
    isSuper = isSuper.toLocaleLowerCase()
    if (['true', 'false'].includes(isSuper)) {
      isSuper = isSuper === 'true'
    } else {
      isSuper = false
    }
  }
  if (typeof isSuper === 'boolean') return isSuper
  return false
}

export function removeCsrfToken() {
  return Cookies.remove(csrfKey)
}

export function removeSessionid() {
  return Cookies.remove(sessionKey)
}
