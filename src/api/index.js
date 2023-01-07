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
 * @returns Promise对象
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/my/userinfo'
  })
}

/**
 * 获取菜单栏数据
 * @param {*} param0 {Authorization: 令牌}
 * @returns Promise对象
 */
export const getMenusInfoAPI = () => {
  return request({
    url: 'my/menus'
  })
}

/**
 * 提交用户信息
 * @param {*} param0 {id,username,nickname,email,email,user_pic}
 * @returns Promise对象
 */
export const subUserInfoAPI = ({ id, username, nickname, email, user_pic }) => {
  return request({
    url: 'my/userinfo',
    method: 'PUT',
    data: {
      id,
      username,
      nickname,
      email,
      user_pic
    }
  })
}

/**
 * 提交用户头像
 * @param {*} avater 头像图片base64字符串
 * @returns Promise对象
 */
export const subUserProfileAPI = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'PATCH',
    body: {
      avatar
    }
  })
}

/**
 * 更新用户密码
 * @param {*} param0 { old_pwd, new_pwd, re_pwd }
 * @returns Promise对象
 */
export const updatePwdAPI = ({ old_pwd, new_pwd, re_pwd }) => {
  return request({
    method: 'PATCH',
    url: '/my/updatepwd',
    data: {
      old_pwd,
      new_pwd,
      re_pwd
    }
  })
}

/**
 * 获取文章分类
 * @param {*} param0 token
 * @returns Promise对象
 */
export const getArtCategory = () => {
  return request({
    url: '/my/cate/list'
  })
}

/**
 * 增加文章分类
 * @param {*} param0 {cate_name,cate_alias}
 * @returns Promise对象
 */
export const addArtCategory = ({ cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/add',
    method: 'POST',
    data: {
      cate_name,
      cate_alias
    }
  })
}

/**
 * 修改文章分类
 * @param {*} param0 {cate_name,cate_alias}
 * @returns Promise对象
 */
export const updateArtCategory = ({ cate_name, cate_alias, id }) => {
  return request({
    url: '/my/cate/info',
    method: 'put',
    data: {
      cate_alias,
      cate_name,
      id
    }
  })
}

/**
 * 删除文章分类
 * @param {*} param0 {id}
 * @returns Promise对象
 */
export const deleteArtCategory = (id) => {
  return request({
    method: 'DELETE',
    url: '/my/cate/del',
    params: {
      id
    }
  })
}
