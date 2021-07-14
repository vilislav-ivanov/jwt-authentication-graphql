import React, { ReactElement, useEffect, useState} from 'react';
import { setAccessToken } from '../utils/accessToken';
import { Routes } from './Routes';


export function App(): ReactElement {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('http://localhost:4000/auth/refresh_token', { method: 'post', credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data && data.accessToken) {
          const accessToken = data.accessToken;
          setAccessToken(accessToken);
        }
        setLoading(false);
      })
  }, [])
 return (
   <div>
     {
      !loading && <Routes />
     }
   </div>
 )
}
