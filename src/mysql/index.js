import fs from 'fs';
import yaml from "js-yaml";
import mysql from 'mysql';
import logs from '../utils/logs.js';


const filePath = 'src/conf/config.yml';

// 数据库
let db = null;

try {
    // 读取文件内容
    const fileContents = fs.readFileSync(filePath, 'utf8');
    // 处理读取到的 YML 数据
    const conf = yaml.load(fileContents);
    if (process.env.ENV === 'development') {
        db = mysql.createPool({
            // 数据库的IP
            host: conf.development.host,
            // 登录数据库的账号
            user: conf.development.username,
            // 登录数据库的密码
            password: conf.development.password,
            // 指定要操作的数据库
            database: conf.development.database
        })
    } else {
        db = mysql.createPool({
            // 数据库的IP
            host: conf.production.host,
            // 登录数据库的账号
            user: conf.production.username,
            // 登录数据库的密码
            password: conf.production.password,
            // 指定要操作的数据库
            database: conf.production.database
        })
    }

} catch (err) {
    logs('读取文件时出错:', err);
}

db.getConnection(function (err, connection) {
    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');
    }
    connection.release();
});


export default db;
