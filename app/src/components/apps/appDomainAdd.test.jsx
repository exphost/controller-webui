import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import AppDomainAdd from './appDomainAdd'
import nock from 'nock'

test('show apps in console page', () => {
  render(<AppDomainAdd org="test-org"/>)
  expect(screen.queryByText(/name/i)).toBeInTheDocument()
})

test('submit domain app wrong response', async () => {
  window.API_URL = 'http://localhost:8080'
  nock('http://localhost:8080')
    .post('/graphql')
    .reply(400, {
    }, {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json'
    })
  render(<AppDomainAdd org="test-org"/>)
  fireEvent.change(screen.getByTestId('domain-add-name'), { target: { value: 'test-aa' } })
  fireEvent.click(screen.getByText('Create'))
  await waitFor(() => expect(screen.getByTestId('domain-add-message')).toHaveTextContent('submit error'))
})

test('submit domain', async () => {
  window.API_URL = 'http://localhost:8080'
  nock('http://localhost:8080')
    .post('/graphql')
    .reply(200, {
      data: {
        domainRegister: {
          error: ''
        }
      }
    }, {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json'
    })
  render(<AppDomainAdd org="qwe"/>)
  expect(screen.getByTestId('domain-add-org')).toHaveDisplayValue('qwe')
  fireEvent.change(screen.getByTestId('domain-add-name'), { target: { value: 'test-aa' } })
  fireEvent.click(screen.getByText('Create'))
  await waitFor(() => expect(screen.getByTestId('domain-add-message')).toHaveTextContent('added'))
})

test('submit app duplicate', async () => {
  window.API_URL = 'http://localhost:8080'
  nock('http://localhost:8080')
    .post('/graphql')
    .reply(200, {
      data: {
        domainRegister: {
          error: 'App already exists'
        }
      }
    }, {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json'
    })
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
