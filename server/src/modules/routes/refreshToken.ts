import { Router } from 'express';
import { verify } from 'jsonwebtoken';
import { RefreshTokenPayload } from '../../types/RefreshTokenPayload';
import { User } from '../../entity/User';
import { createAccessToken } from '../utils/createAccessToken';
import { createRefreshToken } from '../utils/createRefreshToken';
import { sendRefreshToken } from '../utils/sendRefreshToken';

export const refreshToken = (router: Router) => {
  return router.post('/refresh_token', async (req, res) => {
    const { jid } = req.cookies;
    console.log('cookies: ', req.cookies);
    if (!jid) {
      return res.json({
        success: false,
        accessToken: null,
        message: 'No refresh token provided',
      });
    }
    const payload = verify(
      jid,
      process.env.REFRESH_TOKEN_SECRET!
    ) as RefreshTokenPayload;

    const user = await User.findOne(payload.userId);

    if (!user) {
      return res.json({
        success: false,
        accessToken: null,
        message: 'no user',
      });
    }

    if (user.refreshTokenVersion !== payload.tokenVersion) {
      return res.json({
        success: false,
        accessToken: null,
        message: 'token version',
      });
    }

    const newRefreshToken = createRefreshToken(user);
    const newAccessToken = createAccessToken(user);

    sendRefreshToken(res, newRefreshToken);

    return res.json({
      success: true,
      accessToken: newAccessToken,
    });
  });
};
