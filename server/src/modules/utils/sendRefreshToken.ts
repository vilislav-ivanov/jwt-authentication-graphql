import { Response } from 'express';

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('jid', token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    // path: 'http://localhost:4000/auth/refresh_token',
    // sameSite: 'none',
  });
};
