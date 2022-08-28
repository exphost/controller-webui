import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import ConsolePage from './ConsolePage'
import { Cookies } from 'react-cookie'
import { MemoryRouter, Router } from 'react-router-dom'
import nock from 'nock'
import { createMemoryHistory } from 'history'
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'
test('show login/register page if not logged', async () => {
  window.API_URL = 'http://localhost:8080'
  nock('http://localhost:8080')
    .post('/graphql')
    .reply(200, {
      data: {
        user: {
          error: 'Unauthorized'
        }
      }
    }, {
      'Access-Control-Allow-Origin': '*',
      'access-control-allow-credentials': 'true',
      'Content-type': 'application/json'
    })
  render(
    <MemoryRouter path="/console">
        <ConsolePage/>
      </MemoryRouter>
  )
  await waitFor(() => expect(screen.getByText(/confirm password/i)).toBeInTheDocument())
  const login = screen.getByRole('link', { name: /login/i })
  expect(login).toBeInTheDocument()
  expect(login).toHaveAttribute('href', '/login')
})

test('show console page when logged in', () => {
  const cookies = new Cookies()
  cookies.set('accessToken', 'sometoken')
  render(
    <MemoryRouter path="/">
      <ConsolePage/>
    </MemoryRouter>
  )
  expect(screen.queryByText(/Register/)).not.toBeInTheDocument()
  expect(screen.queryByText(/Consoleee/)).toBeInTheDocument()
})

test('show userinfo in console page', async () => {
  window.API_URL = 'http://localhost:8080'
  nock('http://localhost:8080')
    .post('/graphql')
    .twice()
    .reply(200, {
      data: {
        user: {
          user: {
            sn: 'John',
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
      'access-control-allow-credentials': 'true',
      'Content-type': 'application/json'
    })
  const cookies = new Cookies()
  cookies.set('accessToken', 'sometoken')
  render(
    <MemoryRouter path="/console">
      <ConsolePage/>
    </MemoryRouter>
  )
  const dropdownButton = screen.getByRole('button', { name: 'Avatar here' })
  fireEvent.click(dropdownButton)
  await waitFor(() => expect(screen.getByText('sn: John')).toBeInTheDocument())
  // expect(screen.queryByText(/John/)).toBeInTheDocument()
})

test('show nginx app in console page', async () => {
  window.API_URL = 'http://localhost:8080'
  nock('http://localhost:8080')
    .post('/graphql')
    .twice()
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
  axios.defaults.adapter = httpAdapter
  render(
    <Router location={history.location} navigator={history}>
      <ConsolePage/>
    </Router>
  )
  // await waitFor(() => expect(screen.getByTestId("nginx-add-org2")).toBeInTheDocument())
  await waitFor(() => expect(screen.getByTestId('nginx-add-org')).toHaveDisplayValue('test-pr'))
})

test('show domains in console page', async () => {
  window.API_URL = 'http://localhost:8080'
  nock('http://localhost:8080')
    .post('/graphql')
    .twice()
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
  history.push('/apps/domain')
  axios.defaults.adapter = httpAdapter
  render(
    <Router location={history.location} navigator={history}>
      <ConsolePage/>
    </Router>
  )
  await waitFor(() => expect(screen.getByTestId('domain-add-org')).toHaveDisplayValue('test-pr'))
})
