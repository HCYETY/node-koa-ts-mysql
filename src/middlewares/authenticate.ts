import { Context } from 'koa';
import ApiResponse from "../utils/response";
import JWT from "../utils/jwt";
import {invalidJwtTokenArr} from "../constants";

export default async function authenticate (ctx:Context, next:any) {
  // 若用户请求登录或注册，则可以通过
  const dontNeedCheck = [
    '/api/login',
    '/api/register',
    '/api/forget_password',
    '/api/modify_password',
    '/api/email'
  ];
  if (dontNeedCheck.indexOf(ctx.url) > -1) {
    await next();
    return;
  }

  const { authorization = '' } = ctx.request.header;
  const isJwt: boolean = invalidJwtTokenArr.includes(authorization);
  const jwtInfo: boolean | object = !isJwt && JWT.verify(authorization);
  if (invalidJwtTokenArr.length > 4) {
    invalidJwtTokenArr.length = 0;
  }
  if (jwtInfo) {
    ctx.state.jwtInfo = jwtInfo; // 将信息存放到 state 中
    console.log('你已登陆');
    await next();
    return;

    // ctx.body = new ApiResponse(200, '你已登陆');
  } else {
    console.log('token invalid or token error');
    ctx.body = new ApiResponse(401, 'token invalid or token error');
  }
}
