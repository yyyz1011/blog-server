import { STATUS_SUCCESS, backCode } from "../constants/backCode";

const defaultCode = STATUS_SUCCESS;
const defaultMsg = backCode[STATUS_SUCCESS];

interface BaseResponseReq {
  code?: string | number;
  message?: string;
  data?: any;
}
export default function ({
  code = defaultCode,
  message = defaultMsg,
  data,
}: BaseResponseReq) {
  return {
    code,
    message,
    data,
  };
}
