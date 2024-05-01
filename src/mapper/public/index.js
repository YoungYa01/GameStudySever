/**
 * 查询用户信息
 * @param username
 * @param password
 * @return {string}
 */
export function queryUserInfo(username, password) {
  return `SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`
}

/**
 * 插入用户信息
 * @return {string}
 */
export function insertUserInfo() {
  return `INSERT INTO user (username, password, role, nickname, sex, avatar, remark, create_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
}

/**
 * 查询轮播图data
 * @return {string}
 */
export function queryCarousel(){
  return `SELECT * FROM carousel`
}

/**
 * 查询课程
 * @param keyword
 * @return {string}
 */
export function queryCourse(keyword){
  return `SELECT * FROM course WHERE title LIKE '%${keyword}%'`
}
