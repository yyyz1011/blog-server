export interface CreateArticleReq {
  aid?: string;
  title: string;
  desc: string;
  atid: string;
  content: string;
  create_time?: string;
  modify_time?: string;
}

export interface UpdateArticleReq {
  aid: string;
  title: string;
  desc: string;
  atid: string;
  content: string;
  create_time: string;
  modify_time?: string;
}

export interface DelArticleReq {
  aid: string;
}
