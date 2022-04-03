export interface CreateMessageReq {
  mid?: string;
  account: string;
  nick_name: string;
  content: string;
  create_time?: string;
}

export interface DelMessageReq {
  mid: string;
}
