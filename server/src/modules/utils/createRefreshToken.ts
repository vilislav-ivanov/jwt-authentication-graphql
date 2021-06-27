import { sign } from 'jsonwebtoken';
import { User } from '../../entity/User';

export const createRefreshToken = ({ id, refreshTokenVersion }: User) => {
  return sign(
    { userId: id, tokenVersion: refreshTokenVersion },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: '7d',
    }
  );
};
