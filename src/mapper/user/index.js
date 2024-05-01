/**
 * 查询用户信息
 * @param username
 * @return {`select * from user where username = '${string}'`}
 */
export const queryUserInfo = (username) => {
  return `select username, password, nickname, role, avatar, email, phone, sex, create_time from user where username = '${username}'`
}
/**
 * 查询用户所有信息，仅限服务端/管理员使用，不对外暴露
 * @param username 用户名
 * @return {`select * from user where username = '${string}'`}
 */
export const queryAllUserInfo = (username) => {
  return `select * from user where username = '${username}'`
}
/**
 * 更新用户信息
 * @param username 用户名
 * @param nickname 昵称
 * @param avatar 头像
 * @param role 角色
 * @param sex 性别
 * @param email 邮箱
 * @param phone 手机号
 * @param remark 备注
 * @return {`update user set nickname = '${string}' , avatar = '${string}' , role = '${string}' , sex = '${string}' , remark = '${string}' where username = '${string}'`}
 */
export const updateUserInfo = (username, nickname, avatar, role, sex, remark) => {
  return `update user set nickname = '${nickname}' , avatar = '${avatar}' , role = '${role}' , sex = '${sex}' , remark = '${remark}' where username = '${username}'`
}

// 如何用户名和旧密码正确，则修改密码
export const updateUserPassword = (username, password, newPassword) => {
  return `update user set password = '${newPassword}' where username = '${username}' and password = '${password}'`
}
