import ArticleModel from "../models/article";
import {
  CreateArticleReq,
  UpdateArticleReq,
  DelArticleReq,
} from "../types/article";
import { STATUS_PARAMETER_ERROR } from "../constants/backCode";

class ArticleService {
  static async createArticle(params: CreateArticleReq) {
    const newArticle = await new ArticleModel(params).save();
    return {
      aid: newArticle.aid,
    };
  }

  static async updateArticle(params: UpdateArticleReq, ctx: any) {
    const article = await ArticleModel.findOne({ aid: params.aid });
    if (!article) {
      ctx.throw({
        code: STATUS_PARAMETER_ERROR,
        msg: "未找到对应aid的笔记",
      });
      return;
    }
    const newArticle = await ArticleModel.findOneAndUpdate(
      { aid: params.aid },
      {
        $set: {
          title: params.title,
          desc: params.desc,
          atid: params.atid,
          content: params.content,
          create_time: params.create_time,
          modify_time: params.modify_time,
        },
      }
    );

    return {
      aid: newArticle.aid,
    };
  }

  static async delArticle(params: DelArticleReq, ctx: any) {
    const article = await ArticleModel.findOne({ aid: params.aid });
    if (!article) {
      ctx.throw({
        code: STATUS_PARAMETER_ERROR,
        msg: "未找到对应aid的笔记",
      });
      return;
    }

    await ArticleModel.deleteOne({ aid: params.aid });

    return {
      aid: article.aid,
    };
  }

  static async getArticleList() {}

  static async addArticleLike() {}

  static async assArticleVv() {}
}

export default ArticleService;
