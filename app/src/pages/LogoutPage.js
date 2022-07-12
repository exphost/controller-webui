import React from 'react'
import { useCookies } from 'react-cookie'

export function LogoutPage () {
  const [cookies, setCookie, removeCookie] = useCookies()
  gupi_eslist = cookies
  bardzo_gupi_eslist = setCookie()
  removeCookie('accessToken', { path: '/' })
  removeCookie('refresh_token', { path: '/' })
  return (
    <div>
      <h1>Logged out</h1>
      <a href="/console">Login again</a>
    </div>
  )
}
