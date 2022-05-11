import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import AppNginxAdd from './appNginxAdd'
import nock from 'nock'

test('show apps in console page', () => {
  render(<AppNginxAdd org="test-org"/>)
  expect(screen.queryByText(/Nginx/i)).toBeInTheDocument()
  expect(screen.queryByText(/name/i)).toBeInTheDocument()
  expect(screen.queryByText(/git repo/i)).toBeInTheDocument()
  expect(screen.queryByText(/git branch/i)).toBeInTheDocument()
  expect(screen.queryByText(/fqdn/i)).toBeInTheDocument()
  expect(screen.queryByText(/create/i)).toBeInTheDocument()
})

test('submit nginx app wrong response', async () => {
  window.API_URL = 'http://localhost:8080'
  nock('http://localhost:8080')
    .post('/graphql')
    .reply(400, {
    }, {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json'
    })
  render(<AppNginxAdd org="test-org"/>)
  fireEvent.change(screen.getByTestId('nginx-add-name'), { target: { value: 'test-aa' } })
  fireEvent.click(screen.getByText('Create'))
  await waitFor(() => expect(screen.getByTestId('nginx-add-message')).toHaveTextContent('submit error'))
})

test('submit nginx app', async () => {
  window.API_URL = 'http://localhost:8080'
  nock('http://localhost:8080')
    .post('/graphql')
    .reply(200, {
      data: {
        appNginxCreate: {
          error: ''
        }
      }
    }, {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json'
    })
  render(<AppNginxAdd org="qwe"/>)
  expect(screen.getByTestId('nginx-add-org')).toHaveDisplayValue('qwe')
  fireEvent.change(screen.getByTestId('nginx-add-name'), { target: { value: 'test-aa' } })
  fireEvent.click(screen.getByText('Create'))
  await waitFor(() => expect(screen.getByTestId('nginx-add-message')).toHaveTextContent('added'))
})

test('submit nginx app duplicate', async () => {
  window.API_URL = 'http://localhost:8080'
  nock('http://localhost:8080')
    .post('/graphql')
    .reply(200, {
      data: {
        appNginxCreate: {
          error: 'App already exists'
        }
      }
    }, {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json'
    })
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
