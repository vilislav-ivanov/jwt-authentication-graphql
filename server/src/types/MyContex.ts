import { Response, Request } from 'express';

// export interface IGetUserAuthInfoRequest extends Request {
//   userId: number;
// }

export interface MyContext {
  req: Request;
  res: Response;
}
