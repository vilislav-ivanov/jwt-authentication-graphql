import { MyContext } from '../../types/MyContex';
import { MiddlewareFn } from 'type-graphql/dist/interfaces/Middleware';
import { verify } from 'jsonwebtoken';

import { User } from '../../entity/User';

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  // console.log(context.req.cookies);
  const authorizationHeader = context.req.headers['authorization'];
  if (!authorizationHeader) throw new Error('no authorization header provided');
  const accessToken = authorizationHeader.split(' ')[1];
  if (!accessToken) {
    throw new Error('not authenticated');
  }
  try {
    const payload = verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as {
      userId: number;
    };

    const user = await User.findOne(payload.userId);

    if (!user) {
      throw new Error('user not found');
    }
    context.req.userId = user.id;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
  return next();
};
