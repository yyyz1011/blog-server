import config from "../config";
import * as Router from "koa-router";
import checkToken from "../middleware/checkToken";
import UserController from "../controllers/user";
import CommonController from "../controllers/common";
import PictureController from "../controllers/picture";

const router = new Router({
  prefix: config.api_prefix,
});

// 用户接口 token
router.get("/u/user/info", UserController.getUserInfo);

// 通用接口
router.post("/c/upload", checkToken, CommonController.uploadPicture);

// 图库接口
router.post("/p/create", checkToken, PictureController.createPicture);
router.post("/p/update", checkToken, PictureController.updatePicture);
router.post("/p/del", checkToken, PictureController.delPicture);
router.get("/p/picture/list", checkToken, PictureController.getPictureList);

export default router;
