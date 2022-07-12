import React from 'react'
import { useCookies } from 'react-cookie'

export function LogoutPage () {
  const [cookies, setCookie, removeCookie] = useCookies()
  const gupiEslist = cookies
  const bardzoGupiEslist = setCookie()
  removeCookie('accessToken', { path: '/' })
  removeCookie('refresh_token', { path: '/' })
  return (
    <div>
      <h1>Logged out</h1>
      <a href="/console">Login again</a>
    </div>
  )
}
