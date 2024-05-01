import db from "../../mysql/index.js";
import {insertCarousel, updateCarousel} from "../../mapper/admin/index.js";

/**
 * 更新轮播图
 * @param req
 * @param res
 */
export const reFixCarousel = (req, res) => {
  const {id, src} = req.body;
  if (!id || !src) {
    res.send({
      code: 400,
      message: '参数错误',
      data: null
    })
  }
  db.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.send({
        code: 500,
        message: '服务器错误'
      })
    } else {
      connection.query(updateCarousel(), [src, id], (err, result) => {
        if (err) {
          console.log(err);
          res.send({
            code: 500,
            message: '服务器错误'
          })
        }
        if (result.affectedRows > 0) {
          res.send({
            code: 200,
            message: '更新成功',
            data: null
          })
        } else {
          res.send({
            code: 400,
            message: '更新失败',
            data: null
          })
        }
      })
    }
    connection.release();
  })
}

/**
 * 新增轮播图
 * @param req
 * @param res
 */
export const newCarousel = (req, res) => {
  const {src, title, order, show} = req.body;
  if (!src || !title || !order || !show) {
    res.send({
      code: 400,
      message: '参数错误',
      data: null
    })
  }
  db.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.send({
        code: 500,
        message: '服务器错误'
      })
    } else {
      connection.query(insertCarousel(), [src, title, order, show], (err, result) => {
        if (err) {
          console.log(err);
          res.send({
            code: 500,
            message: '服务器错误'
          })
        }
        if (result.affectedRows > 0) {
          res.send({
            code: 200,
            message: '添加成功',
            data: null
          })
        }else{
          res.send({
            code: 400,
            message: '添加失败',
            data: null
          })
        }
      })
    }
    connection.release();
  })
}
