import { MiddlewareFn } from 'type-graphql/dist/interfaces/Middleware';
import { verify } from 'jsonwebtoken';

import { User } from '../../entity/User';
import { MyContext } from '../../types/MyContex';
import { AccessTokenPayload } from '../../types/AccessTokenPayload';

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authorizationHeader = context.req.headers['authorization'];
  if (!authorizationHeader) throw new Error('no authorization header provided');
  const accessToken = authorizationHeader.split(' ')[1];
  if (!accessToken) {
    throw new Error('not authenticated');
  }
  try {
    const payload = verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    ) as AccessTokenPayload;

    const user = await User.findOne(payload.userId);

    if (!user) {
      throw new Error('user not found');
    }
    context.res.locals.userId = user.id;
    context.payload = payload;
    return next();
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
