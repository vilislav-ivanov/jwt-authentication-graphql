import { Query, Resolver } from 'type-graphql';

@Resolver()
export class Hello {
  @Query(() => String, { nullable: true })
  helloWorld() {
    return 'Hello world!';
  }
}
