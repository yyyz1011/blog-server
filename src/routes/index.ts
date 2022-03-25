import config from "../config";
import * as Router from "koa-router";
import checkToken from "../middleware/checkToken";
import TestController from "../controllers/test";
import UserController from "../controllers/user";

const router = new Router({
  prefix: config.api_prefix,
});

// 用户接口 token
router.get("/user/getUserInfo", UserController.getUserInfo);

// Test get请求测试
router.get(
  "/test/getTestDemoByGet",
  checkToken,
  TestController.getTestDemoByGet
);
// Test post请求测试
router.post(
  "/test/getTestDemoByPost",
  checkToken,
  TestController.getTestDemoByPost
);

export default router;
