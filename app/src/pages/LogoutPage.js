import React from 'react'
import { useCookies } from 'react-cookie'

export function LogoutPage () {
  const removeCookie = useCookies()[2]
  setCookie('accessToken', '', { path: '/' })
  removeCookie('accessToken', { path: '/' })
  removeCookie('refresh_token', { path: '/' })
  console.log(cookies)
  return (
    <div>
      <h1>Logged out</h1>
      <a href="/console">Login again</a>
    </div>
  )
}
