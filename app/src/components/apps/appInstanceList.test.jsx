import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import AppInstanceList from './appInstanceList'
import nock from 'nock'

function nockSetup (returnCode, returnData) {
  nock.cleanAll()
  nock('http://localhost:8080')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Authorization'
    })
    .persist()
    .intercept('/api/apps/v1/instances/', 'OPTIONS')
    .query(true)
    .reply(200, null)
    .persist()
    .get('/api/apps/v1/instances/')
    .query(true)
    .reply(returnCode, returnData)
}

describe('AppInstanceList', () => {
  test('list instances', async () => {
    nockSetup(200, {
      master: {
        values: {
          env: 'prod'
        }
      },
      dev: {
        values: {
          env: 'devel'
        }
      }
    })
    window.API_URL = 'http://localhost:8080'
    act(() => {
      render(<AppInstanceList org="test-org" app='test-1' refreshList={true} />)
    })
    await waitFor(() => expect(screen.getByText('master')).toBeInTheDocument())
    await waitFor(() => expect(screen.getByText('dev')).toBeInTheDocument())
  })
})
