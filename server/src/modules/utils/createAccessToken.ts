import { sign } from 'jsonwebtoken';

interface Payload {
  userId: number;
}

export const createAccessToken = ({ userId }: Payload) => {
  return sign({ userId: userId }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: '15m',
  });
};
