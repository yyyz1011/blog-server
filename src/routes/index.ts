import config from "../config";
import * as Router from "koa-router";
import checkToken from "../middleware/checkToken";
import UserController from "../controllers/user";
import CommonController from "../controllers/common";
import PictureController from "../controllers/picture";
import ArticleController from "../controllers/article";
import ArticleTypeController from "../controllers/article-type";

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

// 笔记接口
router.post("/a/create", checkToken, ArticleController.createArticle);
router.post("/a/update", checkToken, ArticleController.updateArticle);
router.post("/a/del", checkToken, ArticleController.delArticle);
router.get("/a/article/list", checkToken, ArticleController.getArticleList);

// 笔记类型接口
router.post("/at/create", checkToken, ArticleTypeController.createArticleType);
router.get(
  "/at/article/type/list",
  checkToken,
  ArticleTypeController.getArticleTypeList
);

export default router;
