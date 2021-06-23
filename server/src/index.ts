import 'reflect-metadata';
import { config } from 'dotenv';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';

import { Hello } from './modules/Hello';
import { RegisterResolver } from './modules/user/Register';
import { LoginResolver } from './modules/user/Login';

config();

const main = async () => {
  const app = express();
  const schema = await buildSchema({
    resolvers: [Hello, RegisterResolver, LoginResolver],
  });
  const appoloServer = new ApolloServer({ schema });

  await createConnection();

  appoloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server running at port 4000');
  });
};

main();
