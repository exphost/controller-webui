import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import AppEmailList from './appEmailList'
import nock from 'nock'

test('list emails', async () => {
  nock('http://localhost:8080')
    .post('/graphql')
    .reply(200, {
      data: {
        email: {
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
        }

      }
    }, {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json'
    })
  window.API_URL = 'http://localhost:8080'
  render(<AppEmailList org='test-org'/>)
  await waitFor(() => expect(screen.getAllByText('aa@example.com')).toBeInTheDocument)
  await waitFor(() => expect(screen.getByText('winter@iscomming.com')).toBeInTheDocument)
})
