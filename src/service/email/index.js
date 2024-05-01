import nodemailer from 'nodemailer';
import yaml from "js-yaml";
import fs from 'fs';

const content = fs.readFileSync('src/service/email/email.yml', 'utf8')

const mailConfig = yaml.load(content);

const mailPort = nodemailer.createTransport({
  service: 'qq',
  port: 465,
  secure: true,
  auth: {
    user: mailConfig.user,
    pass: mailConfig.pass
  }
})

export const createMail = ({email, subject, text}) => {
  return new Promise((resolve, reject) => {
    mailPort.sendMail({
      to: email,  // 收件人
      from: mailConfig.user, // 发件人
      subject,    // 主题
      text        // 内容
    }, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    })
  })
}

