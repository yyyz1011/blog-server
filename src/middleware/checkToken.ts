import { tokenKey } from "../config/private.config";
import { STATUS_INVALID_TOKEN } from "../constants/backCode";
const jwt = require("jsonwebtoken");

export default async function (ctx: any, next: () => Promise<any>) {
  try {
    const { token } = ctx.request.header;
    jwt.verify(token, tokenKey);
  } catch {
    ctx.throw({ code: STATUS_INVALID_TOKEN });
    return;
  }
  await next();
}
