import ArticleTypeModel from "../models/article-type";
import { CreateArticleTypeReq } from "../types/article-type";
import { STATUS_PARAMETER_ERROR } from "../constants/backCode";

class ArticleTypeService {
  static async createArticleType(params: CreateArticleTypeReq, ctx: any) {
    const articleType = await ArticleTypeModel.findOne({ label: params.label });
    if (articleType) {
      ctx.throw({
        code: STATUS_PARAMETER_ERROR,
        msg: "相同类型已经存在，眼睛呢~",
      });
      return;
    }
    const newArticleType = await new ArticleTypeModel(params).save();
    return {
      atid: newArticleType.atid,
    };
  }

  static async getArticleTypeList() {
    const articleTypeList = await ArticleTypeModel.find(
      {},
      {
        atid: 1,
        label: 1,
        _id: 0,
      }
    );
    return articleTypeList;
  }
}

export default ArticleTypeService;
