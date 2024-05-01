import fs from 'fs';


// 生成日志文件的路径
// const logFilePath = path.join(__dirname, '../logs', 'app.log');
const logFilePath = "src/logs/app.log";

// 打印日志并写入文件
const logs = (...message) => {
  const logMessage = `[${new Date().toISOString()}] ${message.toString()}\n`;
  
  // 打印日志到控制台
  console.log(logMessage);
  
  // 写入日志文件
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('写入日志文件时出错:', err);
    }
  });
};

// module.exports = logs;
export default logs;

