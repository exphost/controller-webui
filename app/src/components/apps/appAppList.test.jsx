import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import AppAppList from './appAppList'
import nock from 'nock'

beforeEach(() => {
  nock('http://localhost:8080')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Authorization'
    })
    .persist()
    .intercept('/api/apps/v1/app/', 'OPTIONS')
    .query(true)
    .reply(200, null)
    .persist()
    .get('/api/apps/v1/app/')
    .query(true)
    .reply(200, [
      'app1', 'app2'
    ])
    .persist()
})

test('list app apps', async () => {
  window.API_URL = 'http://localhost:8080'
  act(() => {
    render(<AppAppList org='test-org' refreshList={false}/>)
  })
  await waitFor(() => expect(screen.getByText('app1')).toBeInTheDocument)
  await waitFor(() => expect(screen.getByText('app2')).toBeInTheDocument)
})
