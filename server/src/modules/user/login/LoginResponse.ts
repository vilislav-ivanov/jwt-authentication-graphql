import { Field, ObjectType } from 'type-graphql';
import { User } from '../../../entity/User';

@ObjectType()
export class LoginResponse {
  @Field()
  user: User;

  @Field()
  accessToken: string;
}
