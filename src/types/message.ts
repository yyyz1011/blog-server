export interface CreateMessageReq {
  mid?: string;
  account: string;
  content: string;
  create_time?: string;
}

export interface DelMessageReq {
  mid: string;
}
