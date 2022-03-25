import * as Koa from "koa";
import { backCode } from "../constants/backCode";

// 全局异常处理
const catchError = async (ctx: Koa.BaseContext, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    const errorCode = error.code;
    return (ctx.body = {
      code: errorCode,
      message: error.msg ?? backCode[errorCode] ?? "Unknown error",
    });
  }
};

export default catchError;
