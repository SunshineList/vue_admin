import request from '@/utils/request'

export function getAccountList(data){
  return request({
    url: '/user/account/',
    method: 'get',
    data
  })
}
