import * as Koa from "koa";
import * as KoaBody from "koa-body";
import * as KoaStatic from "koa-static";
import * as path from "path";
import * as mongoose from "mongoose";
import * as cors from "@koa/cors";
import config from "./config";
import router from "./routes";
import catchError from "./middleware/catchError";

const mongooseUrl = `mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`;
mongoose.connect(mongooseUrl);
const db = mongoose.connection;
db.on("error", () => {
  console.log("DB连接出错");
});
db.once("open", () => {
  console.log("DB连接成功");
});

const App = new Koa();

App.use(cors());

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
