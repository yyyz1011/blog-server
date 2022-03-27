export interface CreatePictureReq {
  pid?: string;
  title: string;
  region: string;
  desc: string;
  create_time: string;
  picture_url: string;
}

export interface UpdatePictureReq {
  pid: string;
  title: string;
  region: string;
  desc: string;
  create_time: string;
  picture_url: string;
}
