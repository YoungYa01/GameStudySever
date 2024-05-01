import logs from "../../utils/logs.js";

export const routerError = (_, res) => {
  res.json({
    code: 404,
    message: '404 Not Found',
    data: null
  })
}

export const globalError = (err, req, res, next) => {
  logs(err);
  res.json({
    code: 500,
    message: '服务器错误',
    data: null
  })
}
