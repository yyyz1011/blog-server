interface BackCodeType {
  [name: string]: string;
}

export const STATUS_SERVER_EXCEPTION = 500;
export const STATUS_SUCCESS = 200;
export const STATUS_INVALID_TOKEN = 401;
export const STATUS_PARAMETER_ERROR = 400;

export const backCode: BackCodeType = {
  /**
   * 服务器异常
   */
  500: "Server Exception",
  /**
   * 请求成功，无异常
   */
  200: "success",
  /**
   * token 无效
   */
  401: "Invalid token",
  /**
   * 参数错误
   */
  400: "Parameter error",
};
