import { Arg, Mutation, Resolver } from 'type-graphql';
import { AuthInput } from './shared/AuthInput';
import { genSalt, hash } from 'bcrypt';

import { User } from '../../entity/User';

@Resolver()
export class RegisterResolver {
  @Mutation(() => Boolean)
  async register(
    @Arg('data') { email, password }: AuthInput
  ): Promise<Boolean> {
    try {
      const salt = await genSalt(12);
      const hashedPass = await hash(password, salt);

      await User.create({
        email,
        password: hashedPass,
      }).save();

      return true;
    } catch (error) {
      throw error;
    }
  }
}
