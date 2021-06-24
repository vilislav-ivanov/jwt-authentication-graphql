import { Response } from 'express';

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('jid', token, { maxAge: 1000 * 60 * 60 * 24 * 7 });
};
