import * as path from "path";
const RUNTIME_PATH = path.resolve(__dirname, "../");
const LOG_PATH = path.join(RUNTIME_PATH, "log");
const log4js = require("koa-log4");

log4js.configure({
  // 日志的输出
  appenders: {
    access: {
      type: "dateFile",
      pattern: "-yyyy-MM-dd.log", //生成文件的规则
      alwaysIncludePattern: true, // 文件名始终以日期区分
      encoding: "utf-8",
      filename: path.join(LOG_PATH, "access.log"), //生成文件名
    },
    application: {
      type: "dateFile",
      pattern: "-yyyy-MM-dd.log",
      alwaysIncludePattern: true,
      encoding: "utf-8",
      filename: path.join(LOG_PATH, "application.log"),
    },
    out: {
      type: "console",
    },
  },
  categories: {
    default: { appenders: ["out"], level: "info" },
    access: { appenders: ["access"], level: "info" },
    application: { appenders: ["application"], level: "all" },
  },
});

// getLogger 传参指定的是类型
export const accessLogger = () => log4js.koaLogger(log4js.getLogger("access")); // 记录所有访问级别的日志
export const logger = log4js.getLogger("application");
