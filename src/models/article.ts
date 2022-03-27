import * as mongoose from "mongoose";

const { Schema, model } = mongoose;

const ArticleModel = new Schema({
  aid: {
    type: String,
    required: true,
    unique: true,
  },
  // 笔记标题
  title: {
    type: String,
    required: true,
  },
  // 笔记介绍
  desc: {
    type: String,
    required: true,
  },
  // 笔记类型
  atid: {
    type: String,
    required: true,
  },
  // 笔记内容
  content: {
    type: String,
    required: true,
  },
  // 创建时间
  create_time: {
    type: String,
    required: true,
  },
  // 修改时间
  modify_time: {
    type: String,
    required: true,
  },
  // 点赞量
  article_like: {
    type: Number,
    default: 0,
  },
  // 阅读量
  article_vv: {
    type: Number,
    default: 0,
  },
});

export default model("Article", ArticleModel, "article");
