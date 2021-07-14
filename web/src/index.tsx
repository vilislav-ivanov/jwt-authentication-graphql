import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient, ApolloLink, ApolloProvider, concat, HttpLink, InMemoryCache } from '@apollo/client';

import { App } from './components/App';
import { getAccessToken } from './utils/accessToken';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const addAccessTokenHeader = new ApolloLink((operation, forward) => {
  const token = getAccessToken();
  if (token) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
        custom: 'yoo'
      }
    }));
  }
  return forward(operation);
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
  link: concat(addAccessTokenHeader, httpLink)
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
