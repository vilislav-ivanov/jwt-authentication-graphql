import React, { ReactElement } from 'react'
import { useHelloWorldQuery } from '../generated/graphql'

export function Home(): ReactElement {
  const {data, loading, error} = useHelloWorldQuery();

  if(loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>error...</div>
  }

  return (
    <div>
      {data?.helloWorld}
    </div>
  )
}
