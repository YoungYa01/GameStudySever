import svgCaptcha from 'svg-captcha';
import {v4 as uuidv4} from 'uuid'
import sharp from "sharp";

export const createCaptcha = () => {
  return new Promise((resolve, reject) => {
    // 生成图片验证码
    // 数字验证码
    // const captcha = svgCaptcha.create();
    const flag = parseInt(Math.random() * 10) % 2 === 0;
    const conf = {
      size: 4, // 验证码位数
      ignoreChars: '0o1iIlL', // 忽略的字符
      noise: 1, // 干扰线的数量
      color: true, // 启用颜色
      background: '#f0f0f0', // 背景色
      width: 200, // 验证码图片宽度
      height: 30 // 验证码图片高度
    }
    // 数学公式
    const captcha = flag ? svgCaptcha.createMathExpr(conf) : svgCaptcha.create(conf);
    
    // 验证码图片数据
    const captchaData = captcha.data;
    
    const fileName = uuidv4();
    //将验证码图片保存到公共访问文件夹
    const captchaPath = `src/public/captcha/${fileName}.png`;
    
    sharp(Buffer.from(captchaData))
      .png()
      .toFile(captchaPath, (err, info) => {
        if (err) {
          reject(err);
        } else {
          const path = `/profile/captcha/${fileName}.png`;
          resolve(
            {
              path,
              id: fileName,
              ...captcha,
            })
        }
      })
  })
}
