import { Context } from 'koa';
const { getManager } = require("typeorm");
import ApiResponse from "../../utils/response";
import User from "../../entities/User";
import JWT from "../../utils/jwt";

export default async function login (ctx:Context, next:any) {
  const { email, cypher } = ctx.request.body;

  const userRepository = getManager().getRepository(User);
  const saveUsers = await userRepository.findOne({ where: { email }});

  const data = { isLogin: false, token: '' };

  if (!saveUsers || !saveUsers.cypher) {
    ctx.body = new ApiResponse(200, '你还未注册，请先注册', data);
  } else if (saveUsers) {
    if (cypher === saveUsers.cypher) {
      const token = JWT.generate({ email, cypher }, '15d');
      data.token = token;
      data.isLogin = true;
      ctx.body = new ApiResponse(200, '登录成功', data);
    } else {
      ctx.body = new ApiResponse(401, '邮箱账号或密码输入错误', data);
    }
  }
}
