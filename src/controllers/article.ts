import * as uuid from "node-uuid";
import baseResponse from "../utils/baseResponse";
import {
  CreateArticleReq,
  UpdateArticleReq,
  DelArticleReq,
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
    // TODO params 根据atid搜索笔记列表
    // 由于传递的是atid，所以需要在回传的时候根据atid找到对应的笔记类型
    ctx.body = baseResponse({
      data: "获取笔记列表",
    });
  }

  static async addArticleLike(ctx: any) {
    // TODO 点赞
    ctx.body = baseResponse({
      data: "点赞",
    });
  }

  static async addArticleVv(ctx: any) {
    // TODO 阅读量
    ctx.body = baseResponse({
      data: "阅读量",
    });
  }
}

export default ArticleController;
