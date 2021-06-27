import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { AuthInput } from './shared/AuthInput';
import { compare } from 'bcrypt';

import { User } from '../../entity/User';
import { createAccessToken } from '../utils/createAccessToken';
import { createRefreshToken } from '../utils/createRefreshToken';
import { LoginResponse } from './login/LoginResponse';
import { MyContext } from '../../types/MyContex';
import { isAuth } from '../middlewares/isAuth';
import { sendRefreshToken } from '../utils/sendRefreshToken';

@Resolver()
export class LoginResolver {
  @UseMiddleware(isAuth)
  @Query(() => User)
  async me(@Ctx() { payload }: MyContext): Promise<User | undefined> {
    return await User.findOne(payload?.userId);
    // return await User.findOne(res.locals.userId);
  }
  @Mutation(() => LoginResponse)
  async login(
    @Arg('data') { email, password }: AuthInput,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw Error('no user found');
    }
    const doPasswordMatch = await compare(password, user.password);

    if (!doPasswordMatch) {
      throw Error('wrong password');
    }
    const refreshToken = createRefreshToken(user);
    const accessToken = createAccessToken(user);

    sendRefreshToken(res, refreshToken);

    return {
      user,
      accessToken,
    };
  }
}
