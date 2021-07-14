import React, { ReactElement, useState } from 'react'
import { useRegisterMutation } from '../generated/graphql';
import {RouteComponentProps} from 'react-router-dom';

interface Props extends RouteComponentProps {}

export function Register({ history }: Props): ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useRegisterMutation();

  return (
    <form onSubmit={async e => {
      e.preventDefault();
      console.log('form submit');
      const { data } = await register({
        variables: {
          email,
          password
        }
      })
      if (data && data.register) {
        history.push('/');
      }
    }}>
      <input type="text" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <br/>
      <input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <br/>
      <button type='submit'>Register</button>
    </form>
  )
}
