import jwt from "jsonwebtoken";
import {secretKey} from "./secret.js";

/**
 * token 解码
 * @param token
 * @return {*}
 */
export default (token) => {
  // 解码 token 获取用户名
  const tokenWithoutBearer = token.replace('Bearer ', '');
  const decodedToken = jwt.verify(tokenWithoutBearer, secretKey);
  return decodedToken.username;
}
