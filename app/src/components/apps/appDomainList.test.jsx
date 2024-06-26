import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import AppDomainList from './appDomainList'
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
    .intercept('/api/domains/v1/domains/', 'OPTIONS')
    .query(true)
    .reply(200, null)
    .persist()
    .get('/api/domains/v1/domains/')
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
  act(() => {
    render(<AppDomainList org='test-org' refreshList={false} onChangeElement={() => {}} />)
  })
  await waitFor(() => expect(screen.getByText('example.com')).toBeInTheDocument)
  await waitFor(() => expect(screen.getByText('example2.com')).toBeInTheDocument)
})

// test('delete domain', async () => {
//   window.API_URL = 'http://localhost:8080'
//   nock('http://localhost:8080')
//     .delete('/api/domains/v1/domains/')
//     .query(true)
//     .reply(204)
//   act(() => {
//     render(<AppDomainList org='test-org'/>)
//   })
//   await waitFor(() => expect(screen.getByText('example.com')).toBeInTheDocument)
//   await waitFor(() => expect(screen.getByText('example2.com')).toBeInTheDocument)
//   await waitFor(() => expect(screen.getByTestId('delete-example.com')).toBeInTheDocument)
//   act(() => {
//     screen.getByTestId('delete-example.com').click()
//   })
//   await waitFor(() => expect(screen.queryByText('example.com')).not.toBeInTheDocument)
//   await waitFor(() => expect(screen.getByText('example2.com')).toBeInTheDocument)
// }
