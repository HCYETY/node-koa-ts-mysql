const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
// import cors from 'koa2-cors';
import authenticate from "./middlewares/authenticate";
import login from './middlewares/user/login';
import logout from './middlewares/user/logout';
import email from './middlewares/user/email';
import register from './middlewares/user/register';
import forget from './middlewares/user/forget';

import { MysqlDB } from "./database/mysqlDB";
import { isDev } from "./utils/index";

const app = new Koa();
const router = new Router();

app.use(async (ctx: { set: (arg0: string, arg1: string) => void; method: string; body: number; }, next: () => any)=> {
  ctx.set('Access-Control-Allow-Origin', isDev() ? 'http://localhost:3000' : 'http://www.syandeg.com');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , Access-Control-Allow-Credentials');
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  ctx.set('Access-Control-Allow-Credentials', 'true');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
})
// // 处理cookie跨域
// const corsOptions ={
//   origin: ORIGINIP,
//   credentials: true,
//   optionSuccessStatus: 200
// }
// app.use(cors(corsOptions));

// 处理 post 请求的参数
app.use(bodyParser());

// 根据登录状态设置登录拦截
router.use(authenticate);

// 匹配接口
router.post('/api/login', login);
router.post('/api/logout', logout);
router.post('/api/forget_password', forget);
router.post('/api/email', email);
router.post('/api/register', register);
router.post('/api/logout', logout);

// 组装匹配好的路由，返回一个合并好的中间件
app.use(router.routes());
MysqlDB.start();

app.listen(8080, () => {
  console.log('网站服务器启动成功，\n开发环境请访问 http://localhost:8080');
})
