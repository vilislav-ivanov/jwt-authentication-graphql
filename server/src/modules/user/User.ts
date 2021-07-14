import { Query, Resolver } from 'type-graphql';

import { User } from '../../entity/User';
@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[] | undefined> {
    return await User.find();
  }
}
