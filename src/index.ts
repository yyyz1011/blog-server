import * as Koa from "koa";
import * as KoaBody from "koa-body"; 
import config from "./modules/config";
import router from "./routes";
import catchError from "./middleware/catchError";

const App = new Koa();

App.use(catchError);

App.use(KoaBody()); 

App.use(router.routes()).use(router.allowedMethods());

App.listen(config.port, () => {
  console.log(`server is running at http://localhost:${config.port}`);
});
