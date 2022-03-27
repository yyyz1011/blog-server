import * as mongoose from "mongoose";

const { Schema, model } = mongoose;

const PictureModel = new Schema({
  pid: {
    type: String,
    required: true,
    unique: true,
  },
  // 图片标题
  title: {
    type: String,
    required: true,
  },
  // 图片拍摄地址
  region: {
    type: String,
    required: true,
  },
  // 图片简介
  desc: {
    type: String,
    required: true,
  },
  // 图片拍摄时间
  create_time: {
    type: String,
    required: true,
  },
  // 图片URL
  picture_url: {
    type: String,
    required: true,
  },
});

export default model("Picture", PictureModel, "picture");
