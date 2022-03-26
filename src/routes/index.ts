import config from "../config";
import * as Router from "koa-router";
import checkToken from "../middleware/checkToken";
import TestController from "../controllers/test";
import UserController from "../controllers/user";
import CommonController from "../controllers/common";

const router = new Router({
  prefix: config.api_prefix,
});

// 用户接口 token
router.get("/u/user/info", UserController.getUserInfo);

// 通用接口
router.post("/c/upload", checkToken, CommonController.uploadPicture);

// Test get请求测试
router.get("/t/getTestDemoByGet", checkToken, TestController.getTestDemoByGet);
// Test post请求测试
router.post(
  "/t/getTestDemoByPost",
  checkToken,
  TestController.getTestDemoByPost
);

export default router;
