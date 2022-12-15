import request from '@/utils/request'

export const registerAPI = () => {
  return request({
    url: '/api/reg',
    method: 'post',
    data: {
      username: 'gkxxx',
      password: '20020625',
      repassword: '20020625'
    }
  })
}
