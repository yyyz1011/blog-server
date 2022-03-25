import config from "../config";
import * as Router from "koa-router";
import TestController from "../controllers/test";

const router = new Router({
  prefix: config.api_prefix,
});

router.get("/test/getTestDemoByGet", TestController.getTestDemoByGet);
router.post("/test/getTestDemoByPost", TestController.getTestDemoByPost);

export default router;
