import { Context } from 'koa';
import { invalidJwtTokenArr } from "../../constants";

export default async (ctx:Context) => {
  const { authorization = '' } = ctx.request.header;
  invalidJwtTokenArr.push(authorization);
}
