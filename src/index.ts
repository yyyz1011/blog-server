import * as Koa from "koa";
import * as KoaBody from "koa-body";
import * as KoaStatic from "koa-static";
import * as path from "path";
import config from "./config";
import router from "./routes";
import catchError from "./middleware/catchError";

const App = new Koa();

App.use(catchError);

App.use(
  KoaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, `../${config.upload_path}`),
      keepExtensions: true,
      maxFieldsSize: config.upload_img_size,
    },
  })
);

App.use(KoaStatic(path.join(__dirname, `../${config.upload_path}`)));

App.use(router.routes()).use(router.allowedMethods());

App.listen(config.port, () => {
  console.log(`server is running at http://localhost:${config.port}`);
});
