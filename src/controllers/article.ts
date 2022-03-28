import * as uuid from "node-uuid";
import baseResponse from "../utils/baseResponse";
import {
  CreateArticleReq,
  UpdateArticleReq,
  DelArticleReq,
  AddArticleLikeReq,
  AddArticleVvReq,
} from "../types/article";
import { STATUS_PARAMETER_ERROR } from "../constants/backCode";
import ArticleService from "../services/article";

function validateCreateArticle(params: CreateArticleReq, ctx: any) {
  const { title, desc, atid, content } = params;
  if (!title || !desc || !atid || !content) {
    ctx.throw({ code: STATUS_PARAMETER_ERROR });
  }
}
function validateUpdateArticle(params: UpdateArticleReq, ctx: any) {
  const { aid, title, desc, atid, content, create_time: createTime } = params;
  if (!aid || !title || !desc || !atid || !content || !createTime) {
    ctx.throw({ code: STATUS_PARAMETER_ERROR });
  }
}
function validateDelArticle(params: DelArticleReq, ctx: any) {
  const aid = params.aid;
  if (!aid) {
    ctx.throw({ code: STATUS_PARAMETER_ERROR });
  }
}
function validateAddArticleLike(params: AddArticleLikeReq, ctx: any) {
  const aid = params.aid;
  if (!aid) {
    ctx.throw({ code: STATUS_PARAMETER_ERROR });
  }
}
function validateAddArticleVv(params: AddArticleVvReq, ctx: any) {
  const aid = params.aid;
  if (!aid) {
    ctx.throw({ code: STATUS_PARAMETER_ERROR });
  }
}
class ArticleController {
  static async createArticle(ctx: any) {
    const params = ctx.request.body;
    await validateCreateArticle(params, ctx);
    const aid = uuid.v1();
    const createTime = new Date().getTime().toString();
    const modifyTime = createTime;
    const newParams = {
      aid,
      title: params.title,
      desc: params.desc,
      atid: params.atid,
      content: params.content,
      create_time: createTime,
      modify_time: modifyTime,
    };
    const data = await ArticleService.createArticle(newParams);

    ctx.body = baseResponse({
      data,
    });
  }

  static async updateArticle(ctx: any) {
    const params = ctx.request.body;
    await validateUpdateArticle(params, ctx);
    const modifyTime = new Date().getTime().toString();
    const newParams = {
      aid: params.aid,
      title: params.title,
      desc: params.desc,
      atid: params.atid,
      content: params.content,
      create_time: params.create_time,
      modify_time: modifyTime,
    };
    const data = await ArticleService.updateArticle(newParams, ctx);

    ctx.body = baseResponse({
      data,
    });
  }

  static async delArticle(ctx: any) {
    const params = ctx.request.body;
    await validateDelArticle(params, ctx);
    const data = await ArticleService.delArticle(params, ctx);

    ctx.body = baseResponse({
      data,
    });
  }

  static async getArticleList(ctx: any) {
    const params = ctx.request.query;
    const data = await ArticleService.getArticleList(params, ctx);
    ctx.body = baseResponse({
      data,
    });
  }

  static async addArticleLike(ctx: any) {
    const params = ctx.request.query;
    await validateAddArticleLike(params, ctx);
    const data = await ArticleService.addArticleLike(params, ctx);

    ctx.body = baseResponse({
      data,
    });
  }

  static async addArticleVv(ctx: any) {
    const params = ctx.request.query;
    await validateAddArticleVv(params, ctx);
    const data = await ArticleService.addArticleVv(params, ctx);

    ctx.body = baseResponse({
      data,
    });
  }
}

export default ArticleController;
