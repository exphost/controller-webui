import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import AppVersionList from './appVersionList'
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
    .intercept('/api/apps/v1/versions/', 'OPTIONS')
    .query(true)
    .reply(200, null)
    .persist()
    .get('/api/apps/v1/versions/')
    .query(true)
    .reply(returnCode, returnData)
}

describe('AppVersionList', () => {
  test('renders AppVersionList component', async () => {
    nockSetup(200, {
      versions: [
        'v0.1.0',
        'v0.2.0'
      ]
    })
    window.API_URL = 'http://localhost:8080'
    act(() => {
      render(<AppVersionList org='org' app='app' refreshList />)
    })
    await waitFor(() => {
      expect(screen.getByText('Version')).toBeInTheDocument()
      expect(screen.getByText('v0.1.0')).toBeInTheDocument()
      expect(screen.getByText('v0.2.0')).toBeInTheDocument()
    })
  })
})
