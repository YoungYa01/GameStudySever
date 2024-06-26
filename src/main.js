import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import * as authController from './controller/authController.js'
import authenticateToken from './utils/middleWare/jwtMiddleWare.js'
import userRouter from "./controller/user/index.js";
import {upload} from "./utils/middleWare/multerMiddleWare.js";
import {publicUploadImage} from "./controller/public/index.js";
import {globalError, routerError} from "./controller/public/error.js";
import publicer from './controller/public/index.js'
import session from "express-session";
import timingTask from "./utils/timingTask.js";

const app = express();
// cross-origin
app.use(cors());
// body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//配置中间件
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: ('name', 'value',{maxAge:  5*60*1000,secure: false})
}));

// 配置静态文件访问目录
app.use('/profile', express.static('src/public'));

// 根路由
app.get('/', (_, res) => {
  res.send('欢迎访问Gaming Study系统，如使用请访问前端');
})

// 登录路由
app.post('/login', authController.login);

// 注册路由
app.post('/register', authController.register);

// 验证码
app.get('/getCaptcha', authController.getCaptcha);

// 公共访问路由
app.use('/public', publicer);

// 上传文件请求
app.post('/upload', authenticateToken, upload.single('file'), publicUploadImage);

/**
 * @api /user 路由
 */
app.use('/user', authenticateToken, userRouter);

// 错误路由链接处理
app.use(routerError);

// 全局错误处理
app.use(globalError);

timingTask();

export {app};
