import * as mongoose from "mongoose";

const { Schema, model } = mongoose;

const ArticleTypeModel = new Schema({
  atid: {
    type: String,
    required: true,
    unique: true,
  },
  // 笔记类型
  label: {
    type: String,
    required: true,
  },
});

export default model("ArticleType", ArticleTypeModel, "articleType");
