// jwt 验证中间件
import jwt from "jsonwebtoken";
import {secretKey} from "../secret.js";

// 验证 Token 的中间件
const authenticateToken = (req, res, next) => {
    // 从请求头中获取 Token
    const token = req.header('Authorization');

    // 如果没有提供 Token，返回 401 Unauthorized 错误
    if (!token) {
        return res.status(200).json({ code: 401, message: 'Token 无效', data: null });
    }

    try {
        // 验证 Token
        const decoded = jwt.verify(token, secretKey);

        // 将解码后的用户信息存储在请求对象中，以供后续中间件和路由处理
        req.user = decoded;

        // 继续请求处理
        next();
    } catch (error) {
        // 验证失败，返回 403 Forbidden 错误
        return res.status(200).json({ code: 403, message: 'Token 无效' });
    }
};

// module.exports = authenticateToken;
export default authenticateToken;
