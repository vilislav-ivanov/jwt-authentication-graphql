import 'reflect-metadata';
import 'dotenv/config';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';

import { Hello } from './modules/Hello';
import { RegisterResolver } from './modules/user/Register';
import { LoginResolver } from './modules/user/Login';
import { MyContext } from './types/MyContex';
import { refreshTokenRouteHandler } from './modules/routes';

const main = async () => {
  const app = express();

  // Middlewares
  app.use(cookieParser());

  // Routes
  app.use('/auth', refreshTokenRouteHandler);

  const schema = await buildSchema({
    resolvers: [Hello, RegisterResolver, LoginResolver],
  });

  const appoloServer = new ApolloServer({
    schema,
    context: ({ req, res }): MyContext => ({ req, res }),
  });

  // Connect to TypeORM
  await createConnection();

  appoloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server running at port 4000');
  });
};

main();
