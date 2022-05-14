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
            org: 'test-org',
            git: null,
            fqdns: null
          },
          {
            name: 'example-app2',
            org: 'test-org',
            fqdns: ['www.test.pl', 'www.example.com'],
            git: {
              repo: 'https://github.com/test/test.git',
              branch: 'devel'
            }
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
  await waitFor(() => expect(screen.getByText('www.test.pl')).toBeInTheDocument)
  await waitFor(() => expect(screen.getByText('www.example.com')).toBeInTheDocument)
  await waitFor(() => expect(screen.getByText('https://github.com/test/test.git / devel')).toBeInTheDocument)
})
