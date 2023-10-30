import React from 'react'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import ConsolePage from './ConsolePage'
import { MemoryRouter, Router } from 'react-router-dom'
import nock from 'nock'
import { createMemoryHistory } from 'history'
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'

describe('ConsolePage', () => {
  beforeEach(() => {
    nock.cleanAll()
    nock('http://localhost:8080')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true',
        'access-control-allow-headers': 'Authorization'
      })
      .persist()
      .intercept('/api/users/v1/users/userinfo', 'OPTIONS')
      .reply(200, null)
      .get('/api/users/v1/users/userinfo')
      .reply(200, {
        sn: 'John',
        gn: 'test',
        mail: 'test-pr@mail.ru',
        username: 'test-pr',
        groups: [
          'test-pr'
        ]
      })
      .persist()
      .intercept('/api/apps/v1/app/', 'OPTIONS')
      .query(true)
      .reply(200, null)
      .get('/api/apps/v1/app/')
      .query(true)
      .reply(200, [
        'app1',
        'app2'
      ])
  })

  test('show login/register page if not logged', async () => {
    window.API_URL = 'http://localhost:8080'
    nock.cleanAll()
    nock('http://localhost:8080')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true',
        'access-control-allow-headers': 'Authorization'
      })
      .persist()
      .intercept('/api/users/v1/users/userinfo', 'OPTIONS')
      .query(true)
      .reply(200, null)
      .persist()
      .intercept('/api/apps/v1/app/', 'OPTIONS')
      .query(true)
      .reply(200, null)
      .persist()
      .get('/api/users/v1/users/userinfo')
      .reply(401)
      .persist()
    act(() => {
      render(
        <MemoryRouter path="/console">
            <ConsolePage/>
          </MemoryRouter>
      )
    })
    await waitFor(() => expect(screen.getByText(/confirm password/i)).toBeInTheDocument())
    const login = screen.getByRole('link', { name: /login/i })
    expect(login).toBeInTheDocument()
    expect(login).toHaveAttribute('href', '/login')
  })

  test('show console page when logged in', () => {
    act(() => {
      render(
        <MemoryRouter path="/">
          <ConsolePage/>
        </MemoryRouter>
      )
    })
    expect(screen.queryByText(/Register/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Consoleee/)).toBeInTheDocument()
  })

  test('show userinfo in console page', async () => {
    window.API_URL = 'http://localhost:8080'
    act(() => {
      render(
        <MemoryRouter path="/console">
          <ConsolePage/>
        </MemoryRouter>
      )
      const dropdownButton = screen.getByRole('button', { name: 'Avatar here' })
      fireEvent.click(dropdownButton)
    })
    await waitFor(() => expect(screen.getByText('sn: John')).toBeInTheDocument())
    // expect(screen.queryByText(/John/)).toBeInTheDocument()
  })

  test('show nginx app in console page', async () => {
    window.API_URL = 'http://localhost:8080'
    const history = createMemoryHistory()
    history.push('/apps/nginx')
    axios.defaults.adapter = httpAdapter
    act(() => {
      render(
        <Router location={history.location} navigator={history}>
          <ConsolePage/>
        </Router>
      )
    })
    // await waitFor(() => expect(screen.getByTestId("nginx-add-org2")).toBeInTheDocument())
    await waitFor(() => expect(screen.getByTestId('nginx-add-org')).toHaveDisplayValue('test-pr'))
  })

  test('show domains in console page', async () => {
    window.API_URL = 'http://localhost:8080'
    const history = createMemoryHistory()
    history.push('/apps/domain')
    axios.defaults.adapter = httpAdapter
    act(() => {
      render(
        <Router location={history.location} navigator={history}>
          <ConsolePage/>
        </Router>
      )
    })
    await waitFor(() => expect(screen.getByTestId('domain-add-org')).toHaveDisplayValue('test-pr'))
  })
})
