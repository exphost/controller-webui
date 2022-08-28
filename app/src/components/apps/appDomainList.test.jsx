import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import AppDomainList from './appDomainList'
import nock from 'nock'

test('list domains', async () => {
  nock('http://localhost:8080')
    .post('/graphql')
    .reply(200, {
      data: {
        domain: {
          domains: [
            {
              name: 'example.com',
              org: 'test-org'
            },
            {
              name: 'example2.com',
              org: 'test-org'
            }
          ]
        }

      }
    }, {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json'
    })
  window.API_URL = 'http://localhost:8080'
  render(<AppDomainList org='test-org'/>)
  await waitFor(() => expect(screen.getByText('example.com')).toBeInTheDocument)
  await waitFor(() => expect(screen.getByText('example2.com')).toBeInTheDocument)
})
