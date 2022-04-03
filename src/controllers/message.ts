import * as uuid from "node-uuid";
import { STATUS_PARAMETER_ERROR } from "../constants/backCode";
import { CreateMessageReq, DelMessageReq } from "../types/message";
import * as sanitizeHtml from "sanitize-html";
import MessageService from "../services/message";
import baseResponse from "../utils/baseResponse";

function validateCreateMessage(params: CreateMessageReq, ctx: any) {
  const { account, content } = params;
  if (!account || !content) {
    ctx.throw({ code: STATUS_PARAMETER_ERROR });
  }
  if (content !== sanitizeHtml(content)) {
    ctx.throw({
      code: STATUS_PARAMETER_ERROR,
      msg: "小老弟是不是在XSS，手下留情啊",
    });
  }
}
function validateDelMessage(params: DelMessageReq, ctx: any) {
  if (!params.mid) {
    ctx.throw({ code: STATUS_PARAMETER_ERROR });
  }
}
class MessageController {
  static async createMessage(ctx: any) {
    const params = ctx.request.body;
    await validateCreateMessage(params, ctx);
    const mid = uuid.v1();
    const createTime = new Date().getTime().toString();
    const newParams = {
      mid,
      create_time: createTime,
      account: params.account,
      content: params.content,
    };
    const data = await MessageService.createMessage(newParams);

    ctx.body = baseResponse({
      data,
    });
  }

  static async delMessage(ctx: any) {
    const params = ctx.request.body;
    await validateDelMessage(params, ctx);
    const data = await MessageService.delMessage(params, ctx);

    ctx.body = baseResponse({
      data,
    });
  }

  static async getMessageList(ctx: any) {
    const data = await MessageService.getMessageList();

    ctx.body = baseResponse({
      data,
    });
  }
}

export default MessageController;
