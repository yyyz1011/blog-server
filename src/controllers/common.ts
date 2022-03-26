import * as path from "path";
import baseResponse from "../utils/baseResponse";

class CommonController {
  static async uploadPicture(ctx: any, next: () => Promise<any>) {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
    );
    ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    const file = ctx.request.files.file;
    const basename = path.basename(file.path);
    ctx.body = baseResponse({
      data: {
        url: `${ctx.origin}/${basename}`,
      },
    });
  }
}

export default CommonController;
