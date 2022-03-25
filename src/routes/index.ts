import config from "../config";
import * as Router from "koa-router";
import checkToken from "../middleware/checkToken";
import TestController from "../controllers/test";
import UserController from "../controllers/user";

const router = new Router({
  prefix: config.api_prefix,
});

router.get("/user/getUserInfo", UserController.getUserInfo);

router.get(
  "/test/getTestDemoByGet",
  checkToken,
  TestController.getTestDemoByGet
);
router.post(
  "/test/getTestDemoByPost",
  checkToken,
  TestController.getTestDemoByPost
);

export default router;
