import PictureModel from "../models/picture";
import { CreatePictureReq, UpdatePictureReq } from "../types/picture";
import { STATUS_PARAMETER_ERROR } from "../constants/backCode";

class PictureService {
  static async createPicture(params: CreatePictureReq) {
    const newPicture = await new PictureModel(params).save();
    return {
      pid: newPicture.pid,
    };
  }

  static async updatePicture(params: UpdatePictureReq, ctx: any) {
    const picture = await PictureModel.findOne({ pid: params.pid });
    if (!picture) {
      ctx.throw({
        code: STATUS_PARAMETER_ERROR,
        msg: "未找到对应pid的图片",
      });
      return;
    }
    const newPicture = await PictureModel.findOneAndUpdate(
      { pid: params.pid },
      {
        $set: {
          title: params.title,
          region: params.region,
          desc: params.desc,
          create_time: params.create_time,
          picture_url: params.picture_url,
        },
      }
    );

    return {
      pid: newPicture.pid,
    };
  }
}

export default PictureService;
