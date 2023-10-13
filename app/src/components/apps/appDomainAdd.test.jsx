import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import AppDomainAdd from './appDomainAdd'
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
    .intercept('/api/domains/v1/domains', 'OPTIONS')
    .query(true)
    .reply(200, null)
    .post('/api/domains/v1/domains')
    .query(true)
    .reply(201)
})

test('show apps in console page', () => {
  render(<AppDomainAdd org="test-org"/>)
  expect(screen.queryByText(/name/i)).toBeInTheDocument()
})

test('submit domain app wrong response', async () => {
  window.API_URL = 'http://localhost:8080'
  nock.cleanAll()
  nock('http://localhost:8080')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Authorization'
    })
    .persist()
    .intercept('/api/domains/v1/domains', 'OPTIONS')
    .query(true)
    .reply(200, null)
    .post('/api/domains/v1/domains')
    .reply(400)
  render(<AppDomainAdd org="test-org"/>)
  fireEvent.change(screen.getByTestId('domain-add-name'), { target: { value: 'test-aa' } })
  fireEvent.click(screen.getByText('Create'))
  await waitFor(() => expect(screen.getByTestId('domain-add-message')).toHaveTextContent('submit failed'))
})

test('submit domain', async () => {
  window.API_URL = 'http://localhost:8080'
  render(<AppDomainAdd org="qwe"/>)
  expect(screen.getByTestId('domain-add-org')).toHaveDisplayValue('qwe')
  fireEvent.change(screen.getByTestId('domain-add-name'), { target: { value: 'test-aa' } })
  fireEvent.click(screen.getByText('Create'))
  await waitFor(() => expect(screen.getByTestId('domain-add-message')).toHaveTextContent('added'))
})

test('submit app duplicate', async () => {
  window.API_URL = 'http://localhost:8080'
  nock.cleanAll()
  nock('http://localhost:8080')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Authorization'
    })
    .persist()
    .intercept('/api/domains/v1/domains', 'OPTIONS')
    .query(true)
    .reply(200, null)
    .post('/api/domains/v1/domains')
    .query(true)
    .reply(409)
  render(<AppDomainAdd org="test-org"/>)
  fireEvent.change(screen.getByTestId('domain-add-name'), { target: { value: 'test-aa' } })
  fireEvent.click(screen.getByText('Create'))
  await waitFor(() => expect(screen.getByTestId('domain-add-message')).toHaveTextContent('already exists'))
})

test('submit domain no name', async () => {
  render(<AppDomainAdd org="test-org"/>)
  fireEvent.click(screen.getByText('Create'))
  await waitFor(() => expect(screen.getByTestId('domain-add-message')).toHaveTextContent('no field name'))
})
