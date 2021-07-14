import React, { ReactElement } from 'react'
import { useUsersQuery } from '../generated/graphql'

export function Home(): ReactElement {
  const {data, loading, error} = useUsersQuery({fetchPolicy: 'network-only'});

  if(loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>error...</div>
  }

  return (
    <div>
      <div>Users</div>
      {data?.users.map(user => 
        <li key={user.id}>{user.email}, {user.id}</li>
      )}
    </div>
  )
}
