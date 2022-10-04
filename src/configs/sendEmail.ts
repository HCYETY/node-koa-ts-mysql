import {emailObject} from "../types";

const nodemailer = require('nodemailer');

const config = {
  service: 'qq',
  host: 'smtp.qq.com',
  port: 465,
  auth: {
    user: '',
    pass: ''
  }
};

const transporter = nodemailer.createTransport(config);

export default function nodemail(email: emailObject) {
  transporter.sendMail(email, (error: any, info: { response: any; }) => {
    if (error) {
      return console.log(error);
    } else {
      console.log('email 已经发送成功：', info.response)
    }
  })
  return;
}
