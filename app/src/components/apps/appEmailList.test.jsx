import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import AppEmailList from './appEmailList'
import nock from 'nock'

beforeEach(() => {
  nock.cleanAll()
  nock('http://localhost:8080')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Authorization'
    })
    .persist()
    .intercept('/api/users/v1/emails/', 'OPTIONS')
    .query(true)
    .reply(200, null)
    .get('/api/users/v1/emails/')
    .query(true)
    .reply(200, {
      emails: [
        {
          mail: 'aa@example.com',
          cn: 'Jan',
          sn: 'Barski',
          aliases: [
            'aa@example.com',
            'bb@example.com'
          ]
        },
        {
          mail: 'john@snow.com',
          cn: 'John',
          sn: 'Snow',
          aliases: [
            'john@snow.com',
            'winter@iscomming.com'
          ]
        }
      ]
    })
})

test('list emails', async () => {
  window.API_URL = 'http://localhost:8080'
  render(<AppEmailList org='test-org'/>)
  await waitFor(() => expect(screen.getAllByText('aa@example.com')).toBeInTheDocument)
  await waitFor(() => expect(screen.getByText('winter@iscomming.com')).toBeInTheDocument)
})
