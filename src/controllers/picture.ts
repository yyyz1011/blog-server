import * as uuid from "node-uuid";
import {
  CreatePictureReq,
  UpdatePictureReq,
  DelPictureReq,
} from "../types/picture";
import { STATUS_PARAMETER_ERROR } from "../constants/backCode";
import PictureService from "../services/picture";
import baseResponse from "../utils/baseResponse";

function validateCreatePicture(params: CreatePictureReq, ctx: any) {
  const {
    title,
    region,
    desc,
    create_time: createTime,
    picture_url: pictureUrl,
  } = params;
  if (!title || !region || !desc || !createTime || !pictureUrl) {
    ctx.throw({ code: STATUS_PARAMETER_ERROR });
  }
}
function validateUpdatePicture(params: UpdatePictureReq, ctx: any) {
  const {
    pid,
    title,
    region,
    desc,
    create_time: createTime,
    picture_url: picture_url,
  } = params;
  if (!pid || !title || !region || !desc || !createTime || !picture_url) {
    ctx.throw({ code: STATUS_PARAMETER_ERROR });
  }
}
function validateDelPicture(params: DelPictureReq, ctx: any) {
  const pid = params.pid;
  if (!pid) {
    ctx.throw({ code: STATUS_PARAMETER_ERROR });
  }
}
class PictureController {
  static async createPicture(ctx: any) {
    const params = ctx.request.body;

    await validateCreatePicture(params, ctx);

    const pid = uuid.v1();

    const data = await PictureService.createPicture({
      pid,
      ...params,
    });

    ctx.body = baseResponse({
      data,
    });
  }

  static async updatePicture(ctx: any) {
    const params = ctx.request.body;

    await validateUpdatePicture(params, ctx);

    const data = await PictureService.updatePicture(params, ctx);

    ctx.body = baseResponse({
      data,
    });
  }

  static async delPicture(ctx: any) {
    const params = ctx.request.body;

    await validateDelPicture(params, ctx);

    const data = await PictureService.delPicture(params, ctx);

    ctx.body = baseResponse({
      data,
    });
  }

  static async getPictureList(ctx: any) {
    const data = await PictureService.getPictureList();

    ctx.body = baseResponse({
      data,
    });
  }
}

export default PictureController;
