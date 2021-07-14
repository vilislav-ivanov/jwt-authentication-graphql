import React, { ReactElement } from 'react'
import { useMeQuery } from '../generated/graphql'

export function PrivateMe(): ReactElement {
  const {data, loading, error} = useMeQuery()
  if (loading) {
    return (
    <div>
      loading...
    </div>)
  }
  if (error) {
    return (
      <div>
        error
      </div>
    )
  }
  return (
    <div>
      Hello {data?.me.email}
    </div>
  )
}
