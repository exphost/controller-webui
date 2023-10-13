import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import AppDomainList from './appDomainList'
import nock from 'nock'

beforeEach(() => {
  nock('http://localhost:8080')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Authorization'
    })
    .persist()
    .intercept('/api/domains/v1/domains', 'OPTIONS')
    .query(true)
    .reply(200, null)
    .get('/api/domains/v1/domains')
    .query(true)
    .reply(200, [
      {
        name: 'example.com',
        org: 'test-org'
      },
      {
        name: 'example2.com',
        org: 'test-org'
      }
    ])
})

test('list domains', async () => {
  window.API_URL = 'http://localhost:8080'
  render(<AppDomainList org='test-org'/>)
  await waitFor(() => expect(screen.getByText('example.com')).toBeInTheDocument)
  await waitFor(() => expect(screen.getByText('example2.com')).toBeInTheDocument)
})
