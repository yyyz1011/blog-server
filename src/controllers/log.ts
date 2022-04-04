import baseResponse from "../utils/baseResponse";
import { STATUS_SERVER_EXCEPTION } from "../constants/backCode";
import { readdir } from "fs/promises";
import { readFileSync } from "fs";
import * as path from "path";

class LogController {
  static async getLogList(ctx: any) {
    let logInfo: any = {};
    const logPath = path.resolve(__dirname, "../log");
    try {
      const files = await readdir(logPath);
      const applicationFiles = files
        .filter((fileName) => fileName.match("application.log-"))
        .reverse();
      applicationFiles.forEach((item) => {
        const date = item.replace("application.log-", "").replace(".log", "");
        const fileData = readFileSync(logPath + "/" + item, "utf-8");
        logInfo[date] = fileData
          .split("\r\n")
          .filter((item) => item)
          .map((item) => {
            const innerSplit = item.split(" application - ");
            const innerDate = innerSplit[0].split(" ")[0];
            const innerType = innerSplit[0].split(" ")[1];
            const innerInfo: any = {};
            innerSplit[1].split("&").forEach((cItem: any) => {
              const infoList = cItem.split("=");
              innerInfo[infoList[0]] = infoList[1];
            });
            return {
              date: innerDate,
              type: innerType,
              ...innerInfo,
            };
          });
      });
    } catch (err) {
      ctx.throw({ code: STATUS_SERVER_EXCEPTION });
    }
    ctx.body = baseResponse({
      data: logInfo,
    });
  }
}

export default LogController;
