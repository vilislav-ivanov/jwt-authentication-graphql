import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';

import { Hello } from './modules/Hello';
import { User } from './entity/User';

const main = async () => {
  const app = express();
  const schema = await buildSchema({
    resolvers: [Hello],
  });
  const appoloServer = new ApolloServer({ schema });

  const connection = await createConnection();
  console.log('Inserting a new user into the database...');
  const user = new User();
  user.firstName = 'Timber';
  user.lastName = 'Saw';
  user.age = 25;
  await connection.manager.save(user);
  console.log('Saved a new user with id: ' + user.id);

  console.log('Loading users from the database...');
  const users = await connection.manager.find(User);
  console.log('Loaded users: ', users);

  console.log('Here you can setup and run express/koa/any other framework.');

  appoloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server running at port 4000');
  });
};

main();
