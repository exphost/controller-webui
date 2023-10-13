import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import AppNginxAdd from './appNginxAdd'
import nock from 'nock'
beforeEach(() => {
  nock('http://localhost:8080')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Authorization'
    })
    .persist()
    .intercept('/api/apps/v1/nginx/', 'OPTIONS')
    .reply(200, null)
    .post('/api/apps/v1/nginx/')
    .reply(201)
})

test('show apps in console page', () => {
  render(<AppNginxAdd org="test-org"/>)
  expect(screen.queryByText(/name/i)).toBeInTheDocument()
  expect(screen.queryByText(/git repo/i)).toBeInTheDocument()
  expect(screen.queryByText(/git branch/i)).toBeInTheDocument()
  expect(screen.queryByText(/fqdn/i)).toBeInTheDocument()
  expect(screen.queryByText(/create/i)).toBeInTheDocument()
})

test('submit nginx app wrong response', async () => {
  window.API_URL = 'http://localhost:8080'
  nock.cleanAll()
  nock('http://localhost:8080')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Authorization'
    })
    .persist()
    .intercept('/api/apps/v1/nginx', 'OPTIONS')
    .reply(200, null)
    .post('/api/apps/v1/nginx')
    .reply(400)
  render(<AppNginxAdd org="test-org"/>)
  fireEvent.change(screen.getByTestId('nginx-add-name'), { target: { value: 'test-aa' } })
  fireEvent.click(screen.getByText('Create'))
  await waitFor(() => expect(screen.getByTestId('nginx-add-message')).toHaveTextContent('submit error'))
})

test('submit nginx app', async () => {
  window.API_URL = 'http://localhost:8080'
  render(<AppNginxAdd org="qwe"/>)
  expect(screen.getByTestId('nginx-add-org')).toHaveDisplayValue('qwe')
  fireEvent.change(screen.getByTestId('nginx-add-name'), { target: { value: 'test-aa' } })
  fireEvent.click(screen.getByText('Create'))
  await waitFor(() => expect(screen.getByTestId('nginx-add-message')).toHaveTextContent('added'))
})

test('submit nginx app duplicate', async () => {
  window.API_URL = 'http://localhost:8080'
  nock.cleanAll()
  nock('http://localhost:8080')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Authorization'
    })
    .persist()
    .intercept('/api/apps/v1/nginx/', 'OPTIONS')
    .reply(200, null)
    .post('/api/apps/v1/nginx/')
    .reply(409)
  render(<AppNginxAdd org="test-org"/>)
  fireEvent.change(screen.getByTestId('nginx-add-name'), { target: { value: 'test-aa' } })
  fireEvent.click(screen.getByText('Create'))
  await waitFor(() => expect(screen.getByTestId('nginx-add-message')).toHaveTextContent('already exists'))
})

test('submit nginx app no name', async () => {
  render(<AppNginxAdd org="test-org"/>)
  fireEvent.click(screen.getByText('Create'))
  await waitFor(() => expect(screen.getByTestId('nginx-add-message')).toHaveTextContent('no field name'))
})
