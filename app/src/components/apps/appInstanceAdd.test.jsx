import React from 'react'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import AppInstanceAdd from './appInstanceAdd'
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
    .intercept('/api/apps/v1/instances/', 'OPTIONS')
    .reply(200, null)
    .persist()
    .post('/api/apps/v1/instances/')
    .query(true)
    .reply(returnCode)
}

describe('AppInstanceAdd', () => {
  test('show create instance form', () => {
    nockSetup(201)
    render(<AppInstanceAdd org="test-org" app='test-1' />)
    expect(screen.getByTestId('instance-add-org')).toBeInTheDocument()
    expect(screen.getByTestId('instance-add-config')).toBeInTheDocument()
    expect(screen.getByTestId('instance-add-submit')).toBeInTheDocument()
  })

  test('submit instance', async () => {
    nockSetup(201)
    window.API_URL = 'http://localhost:8080'
    act(() => {
      render(<AppInstanceAdd org="qwe" app="app-1" />)
    })
    expect(screen.getByTestId('instance-add-org')).toHaveDisplayValue('qwe')
    act(() => {
      fireEvent.change(screen.getByTestId('instance-add-name'), { target: { value: 'test-aa' } })
      fireEvent.change(screen.getByTestId('instance-add-config'), { target: { value: '{"key": "value"}' } })
    })
    act(() => {
      fireEvent.click(screen.getByTestId('instance-add-submit'))
    })
    await waitFor(() => expect(screen.getByTestId('instance-add-message')).toHaveTextContent('added'))
  })

  test('submit app instance wrong response', async () => {
    nockSetup(400)
    window.API_URL = 'http://localhost:8080'
    act(() => {
      render(<AppInstanceAdd org="test-org" app='test-1'/>)
    })
    act(() => {
      fireEvent.change(screen.getByTestId('instance-add-name'), { target: { value: 'test-aa' } })
      fireEvent.change(screen.getByTestId('instance-add-config'), { target: { value: '{"key": "value"}' } })
    })
    act(() => {
      fireEvent.click(screen.getByText('Create'))
    })
    await waitFor(() => expect(screen.getByTestId('instance-add-message')).toHaveTextContent('submit failed'))
  })

  test('submit app instance duplicate', async () => {
    nockSetup(409)
    window.API_URL = 'http://localhost:8080'
    act(() => {
      render(<AppInstanceAdd org="test-org" app='test-1'/>)
    })
    act(() => {
      fireEvent.change(screen.getByTestId('instance-add-name'), { target: { value: 'test-aa' } })
      fireEvent.change(screen.getByTestId('instance-add-config'), { target: { value: '{"key": "value"}' } })
    })
    act(() => {
      fireEvent.click(screen.getByTestId('instance-add-submit'))
    })
    await waitFor(() => expect(screen.getByTestId('instance-add-message')).toHaveTextContent('already exists'))
  })

  test('submit instance with no name', async () => {
    act(() => {
      render(<AppInstanceAdd org="test-org" app='test-1'/>)
      fireEvent.click(screen.getByTestId('instance-add-submit'))
    })
    await waitFor(() => expect(screen.getByTestId('instance-add-message')).toHaveTextContent('no field name'))
  })
})
