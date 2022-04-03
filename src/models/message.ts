import * as mongoose from "mongoose";

const { Schema, model } = mongoose;

const MessageModel = new Schema({
  mid: {
    type: String,
    required: true,
    unique: true,
  },
  account: {
    type: String,
    required: true,
  },
  nick_name: {
    type: String,
    required: true,
  },
  create_time: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export default model("Message", MessageModel, "message");
