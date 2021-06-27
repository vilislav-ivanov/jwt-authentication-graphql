import { Response, Request } from 'express';
import { AccessTokenPayload } from './AccessTokenPayload';

// export interface IGetUserAuthInfoRequest extends Request {
//   userId: number;
// }

export interface MyContext {
  req: Request;
  res: Response;
  payload?: AccessTokenPayload;
}
