import multer from "multer";
import path from "path";
import decodingToken from "../decodingToken.js";

/**
 * 上传文件存储配置
 * @type {DiskStorage}
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/uploads');
  },
  filename: function (req, file, cb) {
    const username = decodingToken(req.headers.authorization);
    
    const fileExtension = path.extname(file.originalname);
    
    const fileName = username + "_" + Date.now();
    
    cb(null, fileName + fileExtension);
  }
})

/**
 * 文件过滤为图片
 * @param req 请求对象
 * @param file 文件对象
 * @param cb 回调函数
 */
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

export const upload = multer({storage: storage, fileFilter: fileFilter});
