import * as uuid from "node-uuid";
import baseResponse from "../utils/baseResponse";
import { CreateArticleTypeReq } from "../types/article-type";
import { STATUS_PARAMETER_ERROR } from "../constants/backCode";
import ArticleTypeService from "../services/article-type";

function validateCreateArticleType(params: CreateArticleTypeReq, ctx: any) {
  const label = params.label;
  if (!label) {
    ctx.throw({ code: STATUS_PARAMETER_ERROR });
  }
}
class ArticleTypeController {
  static async createArticleType(ctx: any) {
    const params = ctx.request.body;
    await validateCreateArticleType(params, ctx);
    const newParams = {
      atid: uuid.v1(),
      label: params.label,
    };
    const data = await ArticleTypeService.createArticleType(newParams, ctx);

    ctx.body = baseResponse({
      data,
    });
  }

  static async getArticleTypeList(ctx: any) {
    const data = await ArticleTypeService.getArticleTypeList();

    ctx.body = baseResponse({
      data,
    });
  }
}

export default ArticleTypeController;
