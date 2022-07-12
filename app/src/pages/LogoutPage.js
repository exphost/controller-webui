import React from 'react'
import { useCookies } from 'react-cookie'

export function LogoutPage () {
  const removeCookie = useCookies()[2]
  removeCookie('accessToken', { path: '/' })
  removeCookie('refresh_token', { path: '/' })
  window.location.href = window.location.origin + '/console'
  return (
    <div>
      <h1>Logged out</h1>
      <a href="/console">Login again</a>
    </div>
  )
}
