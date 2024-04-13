import React from 'react'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import AppVersionAdd from './appVersionAdd'
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
    .intercept('/api/apps/v1/versions/', 'OPTIONS')
    .reply(200, null)
    .persist()
    .post('/api/apps/v1/versions/')
    .query(true)
    .reply(returnCode)
}

describe('AppVersionAdd', () => {
  test('show create version form', async () => {
    nockSetup(201)
    window.API_URL = 'http://localhost:8080'
    act(() => {
      render(<AppVersionAdd org='org' app='app' />)
    })
    await waitFor(() => {
      expect(screen.getByText('Version')).toBeInTheDocument()
      expect(screen.getByText('Submit')).toBeInTheDocument()
    })
  })
  test('submit create version instance', () => {
    nockSetup(201)
    window.API_URL = 'http://localhost:8080'
    act(() => {
      render(<AppVersionAdd org='org' app='app' />)
    })
    act(() => {
      fireEvent.change(screen.getByLabelText('Version'), { target: { value: 'v0.3.0' } })
      fireEvent.click(screen.getByText('Submit'))
    })
    waitFor(() => {
      expect(screen.getByTestId('version-add-message')).toHaveTextContent('added')
    })
  })
  test('submit create version instance with error', () => {
    nockSetup(500)
    window.API_URL = 'http://localhost:8080'
    act(() => {
      render(<AppVersionAdd org='org' app='app' />)
    })
    act(() => {
      fireEvent.change(screen.getByLabelText('Version'), { target: { value: 'v0.3.0' } })
      fireEvent.click(screen.getByText('Submit'))
    })
    waitFor(() => {
      expect(screen.getByTestId('version-add-message')).toHaveTextContent('error')
    })
  })
  test('submit create version instance with empty version', () => {
    nockSetup(400)
    window.API_URL = 'http://localhost:8080'
    act(() => {
      render(<AppVersionAdd org='org' app='app' />)
    })
    act(() => {
      fireEvent.click(screen.getByText('Submit'))
    })
    waitFor(() => {
      expect(screen.getByTestId('version-add-message')).toHaveTextContent('error')
    })
  })
  test('submit duplicate version instance', () => {
    nockSetup(409)
    window.API_URL = 'http://localhost:8080'
    act(() => {
      render(<AppVersionAdd org='org' app='app' />)
    })
    act(() => {
      fireEvent.change(screen.getByLabelText('Version'), { target: { value: 'v0.3.0' } })
      fireEvent.click(screen.getByText('Submit'))
    })
    waitFor(() => {
      expect(screen.getByTestId('version-add-message')).toHaveTextContent('already exists')
    })
  })
})
