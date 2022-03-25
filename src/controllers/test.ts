import { GetTestDemoByGetReq, GetTestDemoByPostReq } from "../types/test";
import { STATUS_PARAMETER_ERROR } from "../constants/backCode";
import baseResponse from "../utils/baseResponse";

function validateGetTestDemoByGet(params: GetTestDemoByGetReq, ctx: any) {
  if (!params.test) {
    ctx.throw({ code: STATUS_PARAMETER_ERROR });
  }
}
function validateGetTestDemoByPost(params: GetTestDemoByPostReq, ctx: any) {
  if (!params.test) {
    ctx.throw({ code: STATUS_PARAMETER_ERROR });
  }
}

class TestController {
  // get 接口调试
  static async getTestDemoByGet(ctx: any, next: () => Promise<any>) {
    const params = ctx.query;
    const test = params.test;

    await validateGetTestDemoByGet(params, ctx);

    ctx.body = baseResponse({
      data: {
        test,
        test_msg: "this is demo",
        method_type: "GET",
      },
    });
  }

  // post 接口调试
  static async getTestDemoByPost(ctx: any, next: () => Promise<any>) {
    const params = ctx.request.body;
    const test = params.test;

    await validateGetTestDemoByPost(params, ctx);

    ctx.body = baseResponse({
      data: {
        test,
        test_msg: "this is demo",
        method_type: "POST",
      },
    });
  }
}

export default TestController;
