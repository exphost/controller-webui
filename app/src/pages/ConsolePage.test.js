import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import ConsolePage from './ConsolePage'
import { Cookies } from 'react-cookie'
import { MemoryRouter, Router } from 'react-router-dom'
import nock from 'nock'
import { createMemoryHistory } from 'history'
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'

test('show login/register page if not logged', async () => {
  render(
    <MemoryRouter path="/console">
        <ConsolePage/>
      </MemoryRouter>
  )
  await waitFor(() => expect(screen.getByText(/register/i)).toBeInTheDocument())
  const login = screen.getByRole('link', { name: /login/i })
  expect(login).toBeInTheDocument()
  expect(login).toHaveAttribute('href', '/console/login')
})

test('show console page when logged in', () => {
  const cookies = new Cookies()
  cookies.set('accessToken', 'sometoken')
  render(
    <MemoryRouter path="/console">
      <ConsolePage/>
    </MemoryRouter>
  )
  expect(screen.queryByText(/Register Form/)).not.toBeInTheDocument()
})

test('show apps in console page', () => {
  const cookies = new Cookies()
  cookies.set('accessToken', 'sometoken')
  render(
    <MemoryRouter path="/console">
      <ConsolePage/>
    </MemoryRouter>
  )
  expect(screen.queryByText(/Apps/i)).toBeInTheDocument()
  expect(screen.queryByText(/Nginx/i)).toBeInTheDocument()
})

test('show userinfo in console page', () => {
  window.API_URL = 'http://localhost:8080'
  nock('http://localhost:8080')
    .post('/graphql')
    .reply(200, {
      data: {
        user: {
          user: {
            sn: 'pr',
            gn: 'test',
            mail: 'test-pr@mail.ru',
            login: 'test-pr',
            groups: [
              'test-pr'
            ]
          }
        }
      }
    }, {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json'
    })
  const cookies = new Cookies()
  cookies.set('accessToken', 'sometoken')
  render(
    <MemoryRouter path="/console">
      <ConsolePage/>
    </MemoryRouter>
  )
  expect(screen.queryByText(/userinfo/i)).toBeInTheDocument()
})

test('show nginx app in console page', async () => {
  nock('http://localhost:8080')
    .post('/graphql')
    .reply(200, {
      data: {
        user: {
          user: {
            sn: 'pr',
            gn: 'test',
            mail: 'test-pr@mail.ru',
            login: 'test-pr',
            groups: [
              'test-pr'
            ]
          }
        }
      }
    }, {
      'Access-Control-Allow-Origin': '*',
      'access-control-allow-headers': 'Authorization',
      'Content-type': 'application/json'
    })
  const cookies = new Cookies()
  cookies.set('accessToken', 'sometoken')
  const history = createMemoryHistory()
  history.push('/apps/nginx')
  window.API_URL = 'http://localhost:8080'
  axios.defaults.adapter = httpAdapter
  render(
    <Router location={history.location} navigator={history}>
      <ConsolePage/>
    </Router>
  )
  expect(screen.queryByText(/userinfo/i)).toBeInTheDocument()
  // await waitFor(() => expect(screen.getByTestId("nginx-add-org2")).toBeInTheDocument())
  await waitFor(() => expect(screen.getByTestId('nginx-add-org')).toHaveDisplayValue('test-pr'))
})
