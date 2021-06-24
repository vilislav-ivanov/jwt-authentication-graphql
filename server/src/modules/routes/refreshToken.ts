import { Router } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../../entity/User';
import { createAccessToken } from '../utils/createAccessToken';
import { createRefreshToken } from '../utils/createRefreshToken';
import { sendRefreshToken } from '../utils/sendRefreshToken';

export const refreshToken = (router: Router) => {
  return router.post('/refresh_token', async (req, res) => {
    const { jid } = req.cookies;
    console.log(req.cookies);
    if (!jid) throw new Error('No refresh token provided');
    const payload = verify(jid, process.env.REFRESH_TOKEN_SECRET!) as {
      userId: number;
    };

    const user = await User.findOne(payload.userId);

    if (!user) throw new Error('No user found');

    const newRefreshToken = createRefreshToken(user);
    const newAccessToken = createAccessToken(user);

    sendRefreshToken(res, newRefreshToken);

    return res.json({
      accessToken: newAccessToken,
    });
  });
};
