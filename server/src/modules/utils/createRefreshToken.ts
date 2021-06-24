import { sign } from 'jsonwebtoken';
import { User } from '../../entity/User';

export const createRefreshToken = ({ id }: User) => {
  return sign({ userId: id }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: '7d',
  });
};
