import { sign } from 'jsonwebtoken';

interface Payload {
  userId: number;
}

export const createRefreshToken = ({ userId }: Payload) => {
  return sign({ userId: userId }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: '7d',
  });
};
