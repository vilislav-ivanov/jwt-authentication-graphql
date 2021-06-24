import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { AuthInput } from './shared/AuthInput';
import { compare } from 'bcrypt';

import { User } from '../../entity/User';
import { createAccessToken } from '../utils/createAccessToken';
import { createRefreshToken } from '../utils/createRefreshToken';
import { LoginResponse } from './login/LoginResponse';
import { MyContext } from '../../types/MyContex';

@Resolver()
export class LoginResolver {
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
    const refreshToken = createRefreshToken({ userId: user.id });
    const accessToken = createAccessToken({ userId: user.id });

    res.cookie('jid', refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 7 });

    return {
      user,
      accessToken,
    };
  }
}
