import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

export function Header(): ReactElement {
  return (
    <header>
      <Link to='/'>Home</Link>
      <Link to='/register'>Register</Link>
      <Link to='/login'>Login</Link>
    </header>
  )
}
