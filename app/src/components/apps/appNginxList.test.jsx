import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import AppNginxList from './appNginxList'
import nock from 'nock'

beforeEach(() => {
  nock('http://localhost:8080')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Authorization'
    })
    .persist()
    .intercept('/api/apps/v1/components/', 'OPTIONS')
    .query(true)
    .reply(200, null)
    .persist()
    .intercept('/api/domains/v1/domains/', 'OPTIONS')
    .query(true)
    .reply(200, null)
    .persist()
    .get('/api/apps/v1/components/')
    .query(true)
    .reply(200, {
      'example-app1': {
        config: {}
      },
      'example-app2': {
        config: {
          hostnames: ['www.test.pl', 'www.example.com'],
          git: {
            repo: 'https://github.com/test/test.git',
            branch: 'devel'
          }
        }
      }
    })
    .persist()
    .get('/api/domains/v1/domains/')
    .query(true)
    .reply(200, [
      'example.com'
    ])
})

test('list nginx apps', async () => {
  window.API_URL = 'http://localhost:8080'
  act(() => {
    render(<AppNginxList org='test-org' refreshList={false} app='test-app' />)
  })

  await waitFor(() => {
    expect(screen.getByText('example-app1')).toBeInTheDocument()
    expect(screen.getByText('example-app2')).toBeInTheDocument()
    // expect(screen.getByText('www.test.pl')).toBeInTheDocument()
    // expect(screen.getByText('www.example.com')).toBeInTheDocument()
    expect(screen.getByText('https://github.com/test/test.git / devel')).toBeInTheDocument()
  })
})
