import React, { useEffect } from 'react'

export function LoginPageRedirect () {
  const state = Math.random().toString(32).substr(2)
  localStorage.setItem('oauth2_state', state)
  localStorage.setItem('AUTH_URL', window.AUTH_URL)
  localStorage.setItem('AUTH_CLIENT_ID', window.AUTH_CLIENT_ID)
  localStorage.setItem('AUTH_SECRET', window.AUTH_SECRET)
  useEffect(() => {
    window.location.href = window.AUTH_URL + '/auth?client_id=' + window.AUTH_CLIENT_ID + '&redirect_uri=' + window.location.origin + '/console/oauth2/callback&scope=openid%20email profile groups offline_access&state=' + state + '&response_type=code'
  }, [])
  return (
    <h1>Redirecting to auth service</h1>
  )
}

export function LoginPageCallback () {
  const params = new URLSearchParams(window.location.search)
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'client_id=' + localStorage.getItem('AUTH_CLIENT_ID') + '&' +
      'client_secret=' + localStorage.getItem('AUTH_SECRET') + '&' +
      'grant_type=authorization_code&' +
      'code=' + params.get('code') + '&' +
      'redirect_uri=' + window.location.origin + '/console/oauth2/callback'
  }
  fetch(localStorage.getItem('AUTH_URL') + '/token', requestOptions)
    .then(response => response.json())
    .then(function (data) {
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
      localStorage.removeItem('oauth2_state')
      localStorage.removeItem('AUTH_URL')
      localStorage.removeItem('AUTH_CLIENT_ID')
      localStorage.removeItem('AUTH_SECRET')
      window.location.href = window.location.origin + '/console'
    }
    )

  return (
    <h1><p>{params.get('code')}</p>
      <p>{params.get('state')}</p>
      <p>Logging in...</p>
      </h1>
  )
}
