import { sign } from 'jsonwebtoken';
import { User } from '../../entity/User';

export const createAccessToken = ({ id }: User) => {
  return sign({ userId: id }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: '15m',
  });
};
