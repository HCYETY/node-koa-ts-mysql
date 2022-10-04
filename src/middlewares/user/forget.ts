import { Context } from 'koa';
import JWT from "../../utils/jwt";
import ApiResponse from "../../utils/response";
import { getManager } from "typeorm";
import User from "../../entities/User";

export default async (ctx: Context) => {
  // const { authorization = '' } = ctx.request.header;
  // const info = JWT.verify(authorization);
  // console.log('forget info', info)

  try{
    const { email, captcha, password } = ctx.request.body;
    const userRepository = getManager().getRepository(User);
    const saveUser = await userRepository.findOne({where: { email, captcha }});
    if (!saveUser) {
      ctx.body = new ApiResponse(200, '请输入正确的验证码', { status: false });
    } else {
      saveUser.password = password;
      await userRepository.save(saveUser);
      ctx.body = new ApiResponse(200, '密码修改成功', { status: true });
    }
  } catch (err: any) {
    ctx.body = {err}
  }
}
