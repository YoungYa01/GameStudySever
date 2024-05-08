import fs from 'fs'
import logs from "./logs.js";
import captchaContainer from "./captchas.js";

// 一天
// const FILE_CLEAR_TASK_TIME = 24 * 60 * 60 * 1000;
const FILE_CLEAR_TASK_TIME = 60 * 1000;
// 文件存放路径
const FILE_CLEAR_TASK_PATH = 'src/public/captcha'

// 定时清除文件任务
const clearFilesTask = () => {
  fs.readdir(FILE_CLEAR_TASK_PATH, (err, files) => {
    if (err) {
      logs(err);
      return
    }
    // 将文件夹中的文件删除
    files.forEach(file => {
      fs.unlink(`${FILE_CLEAR_TASK_PATH}/${file}`, (err) => {
        if (err) {
          console.log(err);
          logs(err);
          return;
        }
        logs(`${FILE_CLEAR_TASK_PATH}/${file}  清除成功`);
      })
    })
    // 同时清理缓存
    captchaContainer.clear();
  })
}
// 定时清除文件任务开始、停止对象
export const clearFilesTaskTimer = {
  timer: null,
  start: () => {
    clearFilesTaskTimer.timer = setInterval(clearFilesTask, FILE_CLEAR_TASK_TIME);
  },
  stop: () => {
    clearInterval(clearFilesTaskTimer.timer);
  }
}

// 所有定时任务的集中启动函数，并收集所有定时任务的句柄
const timingTask = () => {
  const tasks = [
    clearFilesTaskTimer
  ];
  tasks.forEach(task => {
    if (task) {
      task.start();
    }
  })
  logs('Timing task started successfully.');
  return tasks;
}


export default timingTask;
