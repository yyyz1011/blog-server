import ArticleModel from "../models/article";
import ArticleTypeModel from "../models/article-type";
import {
  CreateArticleReq,
  UpdateArticleReq,
  DelArticleReq,
  GetArticleListReq,
  AddArticleLikeReq,
  AddArticleVvReq,
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

  static async getArticleList(params: GetArticleListReq, ctx: any) {
    const atid = params.atid;
    if (atid) {
      const articleType = await ArticleTypeModel.findOne({ atid });
      if (!articleType) {
        ctx.throw({
          code: STATUS_PARAMETER_ERROR,
          msg: "未找到对应atid的笔记类型",
        });
        return;
      }
    }

    // TODO 需要获取list之后根据list的atid获取article-type表中atid对应的label
    // TODO @彬哥
    const data = await ArticleModel.find();
    let res: any[] = data
      .map((item) => {
        if (atid) {
          if (item.atid === atid) {
            return item;
          }
        } else {
          return item;
        }
      })
      .filter((item) => item);
    let realRes = [];

    for (let i in res) {
      const atInfo = await ArticleTypeModel.findOne({ atid: res[i].atid });
      realRes.push({
        aid: res[i].aid,
        title: res[i].title,
        desc: res[i].desc,
        atid: res[i].atid,
        content: res[i].content,
        create_time: res[i].create_time,
        modify_time: res[i].modify_time,
        article_like: res[i].article_like,
        article_vv: res[i].article_vv,
        atLabel: atInfo.label,
      });
    }

    return realRes;
  }

  static async addArticleLike(params: AddArticleLikeReq, ctx: any) {
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
          article_like: article.article_like + 1,
        },
      }
    );

    return {
      aid: newArticle.aid,
    };
  }

  static async addArticleVv(params: AddArticleVvReq, ctx: any) {
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
          article_vv: article.article_vv + 1,
        },
      }
    );

    return {
      aid: newArticle.aid,
    };
  }
}

export default ArticleService;
