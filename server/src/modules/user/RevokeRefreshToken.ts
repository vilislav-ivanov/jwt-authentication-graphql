import { Arg, Mutation, Resolver } from 'type-graphql';

import { User } from '../../entity/User';

@Resolver()
export class RevokeRefreshToken {
  @Mutation(() => Boolean)
  async revokeRefreshToken(@Arg('email') email: string): Promise<Boolean> {
    const updatedUser = await User.getRepository().increment(
      { email },
      'refreshTokenVersion',
      1
    );
    if (!updatedUser) {
      throw Error('no user found');
    }
    return true;
  }
}
