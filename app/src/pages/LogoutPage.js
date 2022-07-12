import { useCookies } from 'react-cookie'

export function LogoutPage () {
  localStorage.removeItem('oauth2_state')
  localStorage.removeItem('AUTH_URL')
  localStorage.removeItem('AUTH_CLIENT_ID')
  localStorage.removeItem('AUTH_SECRET')
  return (
    <h1>Logged out</h1>
    <p><a href="https://www.exphost.pl/console">Login again</a></p>
  )
}

