import { tokenKey } from "../config/private.config";
import { STATUS_SUCCESS, backCode } from "../constants/backCode";
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

    ctx.body = {
      code: STATUS_SUCCESS,
      message: backCode[STATUS_SUCCESS],
      data: {
        token,
      },
    };
  }
}

export default UserController;
