import React from 'react'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import AppNginxAdd from './appNginxAdd'
import nock from 'nock'

describe('AppNginxAdd', () => {
  beforeEach(() => {
    nock.cleanAll()
    nock('http://localhost:8080')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true',
        'access-control-allow-headers': 'Authorization'
      })
      .persist()
      .intercept('/api/apps/v1/components/', 'OPTIONS')
      .reply(200, null)
      .post('/api/apps/v1/components/')
      .reply(201)
  })

  test('show apps in console page', () => {
    render(<AppNginxAdd org="test-org" onAddElement={() => {}} app="test-app"/>)
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
      .intercept('/api/apps/v1/components/', 'OPTIONS')
      .reply(200, null)
      .post('/api/apps/v1/components/')
      .reply(400)
    act(() => {
      render(<AppNginxAdd org="test-org" onAddElement={() => {}} app="test-app"/>)
    })
    fireEvent.change(screen.getByTestId('nginx-add-name'), { target: { value: 'test-aa' } })
    fireEvent.click(screen.getByText('Create'))
    await waitFor(() => expect(screen.getByTestId('nginx-add-message')).toHaveTextContent('submit failed'))
  })

  test('submit nginx app', async () => {
    window.API_URL = 'http://localhost:8080'
    render(<AppNginxAdd org="qwe" onAddElement={() => {}} app="test-app"/>)
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
      .intercept('/api/apps/v1/components/', 'OPTIONS')
      .reply(200, null)
      .post('/api/apps/v1/components/')
      .reply(409)
    render(<AppNginxAdd org="test-org" onAddElement={() => {}} app="test-app"/>)
    fireEvent.change(screen.getByTestId('nginx-add-name'), { target: { value: 'test-aa' } })
    fireEvent.click(screen.getByText('Create'))
    await waitFor(() => expect(screen.getByTestId('nginx-add-message')).toHaveTextContent('already exists'))
  })

  test('submit nginx app no name', async () => {
    render(<AppNginxAdd org="test-org" onAddElement={() => {}} app="test-app"/>)
    fireEvent.click(screen.getByText('Create'))
    await waitFor(() => expect(screen.getByTestId('nginx-add-message')).toHaveTextContent('no field name'))
  })

  test('submit nginx app with git', async () => {
    window.API_URL = 'http://localhost:8080'
    render(<AppNginxAdd org="qwe" onAddElement={() => {}} app="test-app"/>)
    expect(screen.getByTestId('nginx-add-org')).toHaveDisplayValue('qwe')
    fireEvent.change(screen.getByTestId('nginx-add-name'), { target: { value: 'test-aa' } })
    fireEvent.change(screen.getByTestId('nginx-add-git-repo'), { target: { value: 'https://github.com/user/repo' } })
    fireEvent.change(screen.getByTestId('nginx-add-git-branch'), { target: { value: 'master' } })
    fireEvent.click(screen.getByText('Create'))
    await waitFor(() => expect(screen.getByTestId('nginx-add-message')).toHaveTextContent('added'))
  })
})
