import { ResponseStatus } from '../enums/base-response.enum';

export interface BaseResponse {
  status: ResponseStatus;
  message?: string;
  error: any;
}
