import React, { ReactElement, useState } from 'react'
import { useLoginMutation } from '../generated/graphql';
import {RouteComponentProps} from 'react-router-dom';
import { setAccessToken } from '../utils/accessToken';

interface Props extends RouteComponentProps {}
export function Login({ history }: Props): ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useLoginMutation();
  
  return (
    <form onSubmit={async e => {
      e.preventDefault();
      console.log('form submit');
      const { data } = await login({
        variables: {
          email,
          password
        }
      })
      if (data && data.login.accessToken) {
        const accessToken = data.login.accessToken
        setAccessToken(accessToken)
        history.push('/');
      }
    }}>
      <input type="text" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <br/>
      <input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <br/>
      <button type='submit'>Login</button>
    </form>
  )
}
