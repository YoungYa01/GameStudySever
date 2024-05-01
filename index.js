import fs from 'fs';
import yaml from 'js-yaml';
import {app} from './src/main.js';
import logs from './src/utils/logs.js'


const filePath = './src/conf/config.yml';
// 读取文件内容
const fileContents = fs.readFileSync(filePath, 'utf8');
// 处理读取到的 YML 数据
const conf = yaml.load(fileContents);

// 监听的端口号
let port = conf.development.port;
/**
 * 启动服务器
 * 如果端口被占用，则尝试下一个端口
 */
const startServer = () => {
    app.listen(port, () => {
        logs(`Server is running on port ${port}`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            logs(`Port ${port} is already in use. Trying the next port...`);
            port++;
            startServer(); // 递归调用尝试启动服务器
        } else {
            logs('An error occurred:', err);
        }
    })
}

startServer();
