import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import AppNginxList from './appNginxList'
import nock from 'nock'

test('list nginx apps', async () => {
  nock('http://localhost:8080')
    .post('/graphql')
    .reply(200, {
      data: {
        nginx: [
          {
            name: 'example-app1',
            org: 'test-org'
          },
          {
            name: 'example-app2',
            org: 'test-org'
          }
        ]

      }
    }, {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json'
    })
  window.API_URL = 'http://localhost:8080'
  render(<AppNginxList org='test-org'/>)
  await waitFor(() => expect(screen.getByText('example-app1')).toBeInTheDocument)
  await waitFor(() => expect(screen.getByText('example-app2')).toBeInTheDocument)
})
