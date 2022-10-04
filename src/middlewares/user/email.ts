import { Context } from 'koa';
import { getManager } from "typeorm";
import User from '../../entities/User';
import ApiResponse from "../../utils/response";
import nodemail from "../../configs/sendEmail";
import {createSixNum} from "../../utils";
import {emailObject} from "../../types";

export default async (ctx:Context) => {
  try{
    const { email, password } = ctx.request.body;
    const userRepository = getManager().getRepository(User);
    const saveUsers = await userRepository.findOne({where: { email, password }});
    if (saveUsers) {
      ctx.body = new ApiResponse(200, '该邮箱已注册，可直接登录', { status: false });
    } else {
      const code = createSixNum();
      const saveUser = await userRepository.findOne({ where: { email }});
      const currentTime = new Date().getTime();

      const mail: emailObject = {
        from: '',
        to: email,
        subject: '您注册账号的验证码为',
        text:'您的验证码为' + code + ',有效期为五分钟!'
      };
      nodemail(mail);

      if (saveUser) {
        saveUser.captcha = code;
        saveUser.current_captcha = currentTime;
        await userRepository.save(saveUser);
      } else {
        const newUser = new User();
        newUser.email = email;
        newUser.captcha = code;
        newUser.current_captcha = currentTime;
        await userRepository.save(newUser);
      }

      ctx.body = new ApiResponse(200, '邮箱验证码已发送，请注意在有效期内输入', { status: true, captchaTime: currentTime });
    }
  } catch(err: any) {
    ctx.body = {err}
  }
}
