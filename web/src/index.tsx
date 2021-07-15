import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient, ApolloLink, ApolloProvider, from, HttpLink, InMemoryCache } from '@apollo/client';
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwt_decode from "jwt-decode";
// import { onError } from "@apollo/client/link/error";


import { App } from './components/App';
import { getAccessToken, setAccessToken } from './utils/accessToken';
// import { getNewToken } from './utils/getNewToken';

const httpLink = new HttpLink({ 
  uri: 'http://localhost:4000/graphql', 
  credentials: 'include' 
});
const addAccessTokenHeader = new ApolloLink((operation, forward) => {
  const token = getAccessToken();
  if (token) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      }
    }));
  }
  return forward(operation);
})

// const errorLink = onError(({ graphQLErrors, operation, forward }) => {
//   if (graphQLErrors) {
//     for (let err of graphQLErrors) {
//       console.log('in error', err.extensions?.code);
//       switch (err.extensions?.code) {
//         case 'INTERNAL_SERVER_ERROR':
//           // error code is set to UNAUTHENTICATED
//           // when AuthenticationError thrown in resolver
  
//           // modify the operation context with a new token
//           return fromPromise(
//             getNewToken().catch((error) => {
//               // Handle token refresh errors e.g clear stored tokens, redirect to login
//               return;
//             })
//           )
//             .filter((value) => Boolean(value))
//             .flatMap((accessToken) => {
//               const oldHeaders = operation.getContext().headers;
//               setAccessToken(accessToken);
//               // modify the operation context with a new token
              
//               operation.setContext({
//                 headers: {
//                   ...oldHeaders,
//                   authorization: `Bearer ${accessToken}`,
//                 },
//               });

//               // retry the request, returning the new observable
//               return forward(operation);
//             });
//       }
//     }
// }})

const errorLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    try {
      const token = getAccessToken();
      if (token === '') {
        return true;
      }
      const { exp } = jwt_decode<{exp: number}>(token);
      if (Date.now()  > exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      return true;
    }
  },
  fetchAccessToken: () => {
    return fetch('http://localhost:4000/auth/refresh_token', {
      method: 'post',
      credentials: 'include',
    })
  },
  handleFetch: (accessToken: string) => {
    setAccessToken(accessToken)
  },
  // handleResponse?: (operation, accessTokenField) => response => any,
  // handleError?: (err: Error) => void,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/graphql',
  // credentials: 'include',
  link: from([errorLink, addAccessTokenHeader, httpLink])
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
