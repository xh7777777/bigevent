import request from '@/utils/request'
/**
 * 注册接口
 * @param {*} param0 {username: 用户名, password: 密码 , repassword: 确认密码}
 * @returns
 */
export const registerAPI = ({ username, password, repassword }) => {
  return request({
    url: '/api/reg',
    method: 'post',
    data: {
      username,
      password,
      repassword
    }
  })
}

/**
 * 登录接口
 * @param {*} param0 {username:用户名, password: 密码}
 * @returns Promise对象
 */
export const loginAPI = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
/**
 * 获取用户数据
 * @param {*} param0 {Authorization: 令牌}
 * @returns
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/my/userinfo'
  })
}

export const getMenusInfoAPI = () => {
  return request({
    url: 'my/menus'
  })
}
