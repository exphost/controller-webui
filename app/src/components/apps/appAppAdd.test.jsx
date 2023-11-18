import React from 'react'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import AppAppAdd from './appAppAdd'
import nock from 'nock'

function nockSetup (returnCode) {
  nock.cleanAll()
  nock('http://localhost:8080')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Authorization'
    })
    .persist()
    .intercept('/api/apps/v1/app/', 'OPTIONS')
    .reply(200, null)
    .persist()
    .post('/api/apps/v1/app/')
    .query(true)
    .reply(returnCode)
}

describe('AppAppAdd', () => {
  test('show create app form', () => {
    nockSetup(201)
    render(<AppAppAdd org="test-org"/>)
    expect(screen.queryByText(/name/i)).toBeInTheDocument()
    expect(screen.queryByText(/create/i)).toBeInTheDocument()
  })

  test('submit app', async () => {
    nockSetup(201)
    window.API_URL = 'http://localhost:8080'
    act(() => {
      render(<AppAppAdd org="qwe" />)
    })
    expect(screen.getByTestId('app-add-org')).toHaveDisplayValue('qwe')
    act(() => {
      fireEvent.change(screen.getByTestId('app-add-name'), { target: { value: 'test-aa' } })
    })
    act(() => {
      fireEvent.click(screen.getByTestId('app-add-submit'))
    })
    await waitFor(() => expect(screen.getByTestId('app-add-message')).toHaveTextContent('added'))
  })

  test('submit app app wrong response', async () => {
    nockSetup(400)
    window.API_URL = 'http://localhost:8080'
    act(() => {
      render(<AppAppAdd org="test-org"/>)
    })
    fireEvent.change(screen.getByTestId('app-add-name'), { target: { value: 'test-aa' } })
    fireEvent.click(screen.getByText('Create'))
    await waitFor(() => expect(screen.getByTestId('app-add-message')).toHaveTextContent('submit failed'))
  })

  test('submit app app duplicate', async () => {
    nockSetup(409)
    window.API_URL = 'http://localhost:8080'
    act(() => {
      render(<AppAppAdd org="test-org"/>)
    })
    act(() => {
      fireEvent.change(screen.getByTestId('app-add-name'), { target: { value: 'test-aa' } })
    })
    act(() => {
      fireEvent.click(screen.getByTestId('app-add-submit'))
    })
    await waitFor(() => expect(screen.getByTestId('app-add-message')).toHaveTextContent('already exists'))
  })

  test('submit app with no name', async () => {
    act(() => {
      render(<AppAppAdd org="test-org"/>)
      fireEvent.click(screen.getByTestId('app-add-submit'))
    })
    await waitFor(() => expect(screen.getByTestId('app-add-message')).toHaveTextContent('no field name'))
  })
})
