import * as Koa from "koa";
import { backCode } from "../constants/backCode";
import { logger } from "../utils/logger";

// 全局异常处理
const catchError = async (ctx: Koa.BaseContext, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.msg ?? backCode[errorCode] ?? "Unknown error";
    const loggerInfo = `code=${errorCode}&message=${errorMessage}&url=${
      (ctx as any).request.url
    }&method=${(ctx as any).request.method}&query=${JSON.stringify(
      (ctx as any).request.query
    )}&body=${JSON.stringify((ctx as any).request.body)}`;
    logger.error(loggerInfo);
    return (ctx.body = {
      code: errorCode,
      message: errorMessage,
    });
  }
};

export default catchError;
