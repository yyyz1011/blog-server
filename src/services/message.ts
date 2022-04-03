import MessageModel from "../models/message";
import { CreateMessageReq, DelMessageReq } from "../types/message";
import { STATUS_PARAMETER_ERROR } from "../constants/backCode";

class MessageService {
  static async createMessage(params: CreateMessageReq) {
    const newMessage = await new MessageModel(params).save();
    return {
      mid: newMessage.mid,
    };
  }

  static async delMessage(params: DelMessageReq, ctx: any) {
    const message = await MessageModel.findOne({ mid: params.mid });
    if (!message) {
      ctx.throw({
        code: STATUS_PARAMETER_ERROR,
        msg: "未找到对应mid的留言",
      });
      return;
    }

    await MessageModel.deleteOne({ mid: params.mid });

    return {
      mid: message.mid,
    };
  }

  static async getMessageList() {
    const messageList = await MessageModel.find(
      {},
      {
        mid: 1,
        account: 1,
        content: 1,
        create_time: 1,
        _id: 0,
      }
    );
    return messageList.sort(
      (a, b) => Number(b.create_time) - Number(a.create_time)
    );
  }
}

export default MessageService;
