import React from 'react'
import { useCookies } from 'react-cookie'

export function LogoutPage () {
  removeCookie('accessToken')
  removeCookie('refresh_token')
  return (
    <div>
      <h1>Logged out</h1>
      <a href="/console">Login again</a>
    </div>
  )
}
