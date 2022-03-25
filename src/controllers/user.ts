import { tokenKey } from "../config/private.config";
import baseResponse from "../utils/baseResponse";
const jwt = require("jsonwebtoken");

class UserController {
  static async getUserInfo(ctx: any, next: () => Promise<any>) {
    const token = jwt.sign(
      {
        loginTime: new Date().getTime(),
      },
      tokenKey,
      {
        expiresIn: "1h",
      }
    );

    ctx.body = baseResponse({
      data: {
        token,
      },
    });
  }
}

export default UserController;
