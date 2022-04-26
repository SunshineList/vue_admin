import request from '@/utils/request'

export function getFileList(data) {
  return request({
    url: '/common/file_list/',
    method: 'get',
    data
  })
}

export function getWeatherList(data) {
  return request({
    url: '/common/weather/',
    method: 'get',
    params: {
      city_name: data
    }
  })
}
