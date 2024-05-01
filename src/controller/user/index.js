import express from "express";
import db from "../../mysql/index.js";
import logs from "../../utils/logs.js";
import {queryAllUserInfo, queryUserInfo, updateUserInfo, updateUserPassword} from "../../mapper/user/index.js";
import decodingToken from "../../utils/decodingToken.js";
import {createMail} from "../../service/email/index.js";

const router = express.Router();
/**
 * @api {get} /user/info 用户信息
 */
router.get('/info', (req, res) => {
  const {username} = req.query;
  logs('username: ', username);
  db.getConnection((err, connection) => {
    if (err) {
      logs('数据库连接错误', err);
      return res.status(200).json({code: 500, message: '服务器错误', data: null});
    }
    
    connection.query(queryUserInfo(username), (err, result) => {
      if (err) {
        logs('数据库查询错误', err);
        return res.status(200).json({code: 500, message: '服务器错误', data: null});
      }
      
      logs(result);
      res.status(200).json({code: 200, message: '查询成功', data: result[0] || null});
    })
    
    connection.release();
  })
})

/**
 * @api {post} /user/update 更新用户信息
 */
router.post('/update', (req, res) => {
  const {username, nickname, avatar, role, sex, remark} = req.body;
  const tokenName = decodingToken(req.headers.authorization);
  if (tokenName !== username) {
    logs('用户名错误' + tokenName);
    return res.status(200).json({code: 401, message: '用户名错误', data: null});
  }
  logs(req.body);
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(200).json({code: 500, message: '服务器错误', data: null});
    }
    connection.query(updateUserInfo(username, nickname, avatar, role, sex, remark), (err, result) => {
      if (err) {
        logs(err);
        return res.status(200).json({code: 500, message: '服务器错误', data: null});
      }
      logs(result);
      if (result.length === 0) {
        return res.status(200).json({code: 401, message: '用户不存在', data: null});
      }
      return res.status(200).json({code: 200, message: 'success', data: null});
    })
    connection.release();
  })
})

/**
 * @api {POST} /user/update/pwd 修改密码
 */
router.post('/update/pwd', (req, res) => {
  const {password, newPassword} = req.body;
  // 取出token中username
  const token = req.headers.authorization;
  
  if (!token || !password || !newPassword) {
    return res.status(200).json({code: 400, message: '参数错误', data: null});
  }
  // 解码token
  const username = decodingToken(token);
  
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(200).json({code: 500, message: '数据库连接失败', data: null});
    }
    
    connection.query(queryAllUserInfo(username), (err, results) => {
      if (err) {
        return res.status(200).json({code: 500, message: '数据库查询失败', data: null});
      }
      if (results.length === 0 || results[0].username !== username) {
        return res.status(200).json({code: 201, message: '用户名不一致，修改失败', data: null});
      }
      // 检查旧密码是否正确
      if (results[0].password !== password) {
        return res.status(200).json({code: 201, message: '原密码错误，修改失败', data: null});
      }
      
      // 更新密码
      connection.query(updateUserPassword(username, password, newPassword), (err, results) => {
        if (err) {
          return res.status(200).json({code: 500, message: '服务器错误', data: null});
        }
        if (results.affectedRows === 1) {
          logs(`修改密码成功：username=${username}, password=${password}, newPassword=${newPassword}`)
          return res.status(200).json({code: 200, message: '修改密码成功', data: null});
        }
      });
      
    })
    
    connection.release();
  })
})

/**
 * @api {POST} /user/sendEmail 发送邮件
 */
router.post('/sendEmail', (req, res) => {
  const emailInfo = req.body;
  logs(emailInfo);
  createMail(emailInfo)
    .then((msg) => {
      logs(msg);
      res.status(200).json({code: 200, message: msg, data: null});
    })
    .catch((err) => {
      logs(err);
      res.status(200).json({code: 500, message: '服务器错误', data: null});
    })
})

export default router;
