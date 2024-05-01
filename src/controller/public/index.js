import logs from "../../utils/logs.js";
import db from "../../mysql/index.js";
import {queryCarousel, queryCourse} from "../../mapper/public/index.js";
import express from "express";
import {startPage} from '../../utils/index.js'


const router = express.Router();
/**
 * 上传图片
 * @param req
 * @param res
 */
export const publicUploadImage = (req, res) => {
  try {
    logs(`上传文件 ${req.file}`);
    const path = req.file.path.split('\\');
    logs(`上传文件 ${path[path.length - 1]}`);
    res.json({
      code: 200,
      message: '上传成功',
      data: `/profile/uploads/${path[path.length - 1]}`
    })
  } catch (error) {
    logs(`文件上传失败 ${error}`)
    res.json({
      code: 500,
      message: '上传失败',
      data: null
    })
  }
}
/**
 * 获取轮播图
 * @param req
 * @param res
 */
const getCarousel = (req, res) => {
  
  db.getConnection((err, connection) => {
    if (err) {
      logs('数据库连接错误:', err);
      res.status(200).json({code: 500, data: null, message: '服务器错误'});
      return;
    }
    
    connection.query(queryCarousel(), (err, result) => {
      if (err) {
        logs('数据库查询错误:', err);
        res.status(200).json({code: 500, data: null, message: '服务器错误'});
        return;
      }
      res.status(200).json({code: 200, data: result, message: '查询成功'});
    })
    
    connection.release();
  })
}

/**
 * 获取课程
 * @param req
 * @param res
 */
const getAllCourseList = (req, res) => {
  const {currentPage, pageSize} = req.query;
  
  db.getConnection((err, connection) => {
    if (err) {
      logs('数据库连接错误:', err);
      res.status(200).json({code: 500, data: null, message: '服务器错误'});
      return;
    }
    connection.query(`SELECT *
                      FROM course`, (err, result) => {
      console.log(err);
      console.log("==========================")
      if (err) {
        logs('数据库查询错误:', err);
        res.status(200).json({code: 500, data: null, message: '服务器错误'});
        return;
      }
      console.log(result)
      
      res.status(200).json({
        code: 200,
        data: startPage(result, parseInt(currentPage), parseInt(pageSize)),
        message: '查询成功'
      });
      logs(`查询结果 ${result}`);
      /** 释放连接 */
      connection.release();
    })
  })
}

/**
 * 模糊查询课程
 * @param req
 * @param res
 */
const getCourse = (req, res) => {
  const {keyword} = req.query;
  logs(`查询关键字 ${keyword}`);
  db.getConnection((err, connection) => {
    if (err) {
      logs('数据库连接错误:', err);
      res.status(200).json({code: 500, data: null, message: '服务器错误'});
      return;
    }
    connection.query(queryCourse(keyword), (err, result) => {
      if (err) {
        logs('数据库查询错误:', err);
        res.status(200).json({code: 500, data: null, message: '服务器错误'});
        return;
      }
      res.status(200).json({
        code: 200,
        data: startPage(result),
        message: '查询成功'
      });
      logs(`查询结果 ${result}`);
    })
    
    connection.release();
  })
}


// 轮播图
router.get('/carousel', getCarousel);
// 课程
router.get('/all-course', getAllCourseList);
// 模糊查询课程
router.get('/fuzzy/course', getCourse);

export default router;
