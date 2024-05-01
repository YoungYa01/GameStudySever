import db from '../mysql/index.js';
import logs from "../utils/logs.js";
import {queryUserInfo, insertUserInfo} from '../mapper/public/index.js';
import {generateToken} from "../utils/generateToken.js";


// 登录控制器
const login = (req, res) => {
  // 在这里进行用户身份验证...
  const {username, password} = req.body;
  db.getConnection((err, connection) => {
    if (err) {
      logs('数据库连接错误:', err);
      res.status(200).json({code: 500, data: null, message: '服务器错误'});
      return;
    }
    
    connection.query(queryUserInfo(username, password), (error, results) => {
      if (error) {
        logs('数据库查询错误:', error);
        res.status(200).json({code: 500, data: null, message: '服务器错误'});
        return;
      }
      
      if (results.length === 0) {
        res.status(200).json({code: 401, message: '用户名或密码不正确'});
      } else {
        // 验证成功，生成 Token
        const user = {
          username: username,
          password: password
        };
        // user是存入token的信息
        // 并且设置token过期时间
        const token = generateToken(user);
        /**
         * 延时一下，等待一下
         */
        setTimeout(() => {
          // 返回 Token 给用户
          res.status(200).json({code: 200, message: '登录成功', data: token});
        }, 1000)
      }
    });
    
    connection.release();
  });
  
};

// 注册控制器
const register = (req, res) => {
  // 在这里进行用户身份验证...
  const {username, password, role, nickname, sex, avatar, remark} = req.body;
  logs('register', req.body);
  logs('register info', username, password, role, nickname, sex, avatar, remark);
  db.getConnection((err, connection) => {
    if (err) {
      logs('数据库连接错误:', err);
      res.status(200).json({code: 500, data: null, message: '服务器错误'});
      return;
    }
    
    // 在这里进行输入验证
    if (!username || !password || !role) {
      logs(`输入验证错误:username=${username}, password=${password}, role=${role}, err=${err}`);
      return res.status(200).json({message: '信息不完整', code: 400, data: null});
    }
    
    const values = [username, password, nickname, role || '', sex || '', avatar || '', remark || '', new Date().toLocaleString()];
    
    connection.query(insertUserInfo(), values, (error, results) => {
      if (error) {
        logs(`无法插入用户数据:, ${error}`);
        res.status(200).json({code: 500, data: null, message: '用户数据有误,或用户名重复,注册失败'});
        return;
      }
      
      if (results.affectedRows === 0) {
        res.status(200).json({code: 401, message: '用户名或密码不正确'});
      }
      
      logs(`插入用户数据成功: ${values}`);
      res.status(200).json({code: 200, message: '注册成功', data: null});
      
    })
    
    connection.release();
  })
};

// 扫码登录控制器
const scanLogin = (req, res) => {
  const url = `http://192.168.6.11`;
}


export {
  login,
  register
}
