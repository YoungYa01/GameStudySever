## Gaming Study's Back-end service

#### 介绍

本仓库是交互式学习的后端服务系统。

#### 软件架构

使用`nodejs` + `express` + `mysql` 搭建的后端服务系统。

#### 特技

1.  支持注册、登录、验证码校验
2.  仿照spring的controller、mapper、service三层解构
3.  封装了scheduler定时任务调度系统
4.  封装了jwt验证中间件
5.  由于没有使用Redis，所以封装了验证码缓存机制


### 安装

```shell
yarn install
# or
npm install
```



### 运行

开发

```shell
yarn run dev
```

生产

```shell
yarn run start
```



### 进程管理

> NODE.JS进程管理工具
>
> [快速开始 | PM2中文网 (fenxianglu.cn)](https://pm2.fenxianglu.cn/docs/start)

安装`pm2`进程管理工具

```shell
npm install -g pm2
```



### 使用

首次启动命令

```shell
pm2 start js文件/json文件
# or
pm2 start start-app.json
```



查看`pm2`管理的程序列表

```shell
pm2 list
```



重启命令

```shell
pm2 restart js文件|json文件|name|id
```



停止命令

```shell
pm2 stop name/id
```



删除`pm2`管理的程序

```shell
pm2 delete id|name
```



保存当前进行的进程

```shell
pm2 save
```



设置开机自启动

```shell
pm2 startup
```

