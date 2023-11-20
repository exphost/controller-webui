import React from 'react'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import AppEmailAdd from './appEmailAdd'
import nock from 'nock'

describe('AppEmailAdd', () => {
  beforeEach(() => {
    nock.cleanAll()
    nock('http://localhost:8080')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true',
        'access-control-allow-headers': 'Authorization'
      })
      .persist()
      .intercept('/api/users/v1/emails/', 'OPTIONS')
      .query(true)
      .reply(200, null)
      .persist()
      .post('/api/users/v1/emails/')
      .query(true)
      .reply(201, {
        password: 'pass123'
      })
  })

  test('show apps in console page', () => {
    const dummyFunc = () => {}
    act(() => {
      render(<AppEmailAdd org="test-org" onAddElement={dummyFunc} />)
    })
    expect(screen.queryByText(/Email:/)).toBeInTheDocument()
    expect(screen.queryByText(/Name:/)).toBeInTheDocument()
    expect(screen.queryByText(/Surname:/)).toBeInTheDocument()
  })

  test('submit email app wrong response', async () => {
    window.API_URL = 'http://localhost:8080'
    nock.cleanAll()
    nock('http://localhost:8080')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true',
        'access-control-allow-headers': 'Authorization'
      })
      .persist()
      .intercept('/api/users/v1/emails/', 'OPTIONS')
      .query(true)
      .reply(200, null)
      .persist()
      .post('/api/users/v1/emails/')
      .query(true)
      .reply(400)
    const dummyFunc = () => {}
    act(() => {
      render(<AppEmailAdd org="test-org" onAddElement={dummyFunc} />)
    })
    fireEvent.change(screen.getByTestId('email-add-mail'), { target: { value: 'test-aa' } })
    fireEvent.change(screen.getByTestId('email-add-cn'), { target: { value: 'test-aa' } })
    fireEvent.change(screen.getByTestId('email-add-sn'), { target: { value: 'test-aa' } })
    fireEvent.click(screen.getByText('Create'))
    await waitFor(() => expect(screen.getByTestId('email-add-message')).toHaveTextContent('submit failed'))
  })

  test('submit email', async () => {
    window.API_URL = 'http://localhost:8080'
    const dummyFunc = () => {}
    act(() => {
      render(<AppEmailAdd org="qwe" onAddElement={dummyFunc} />)
    })
    expect(screen.getByTestId('email-add-org')).toHaveDisplayValue('qwe')
    fireEvent.change(screen.getByTestId('email-add-mail'), { target: { value: 'test-aa' } })
    fireEvent.change(screen.getByTestId('email-add-cn'), { target: { value: 'test-aa' } })
    fireEvent.change(screen.getByTestId('email-add-sn'), { target: { value: 'test-aa' } })
    fireEvent.click(screen.getByText('Create'))
    await waitFor(() => expect(screen.getByTestId('email-add-message')).toHaveTextContent('added'))
    await waitFor(() => expect(screen.getByTestId('email-add-message')).toHaveTextContent('pass123'))
  })

  // test('submit app duplicate', async () => {
  //   window.API_URL = 'http://localhost:8080'
  //   nock('http://localhost:8080')
  //     .post('/graphql')
  //     .reply(200, {
  //       data: {
  //         emailRegister: {
  //           error: 'App already exists'
  //         }
  //       }
  //     }, {
  //       'Access-Control-Allow-Origin': '*',
  //       'Content-type': 'application/json'
  //     })
  //   render(<AppEmailAdd org="test-org"/>)
  //   fireEvent.change(screen.getByTestId('email-add-name'), { target: { value: 'test-aa' } })
  //   fireEvent.click(screen.getByText('Create'))
  //   await waitFor(() => expect(screen.getByTestId('email-add-message')).toHaveTextContent('already exists'))
  // })
  //
  test('submit email no name', async () => {
    const dummyFunc = () => {}
    act(() => {
      render(<AppEmailAdd org="test-org" onAddElement={dummyFunc} />)
    })
    fireEvent.click(screen.getByText('Create'))
    await waitFor(() => expect(screen.getByTestId('email-add-message')).toHaveTextContent('no field Mail'))
    fireEvent.change(screen.getByTestId('email-add-mail'), { target: { value: 'test-aa' } })
    fireEvent.click(screen.getByText('Create'))
    await waitFor(() => expect(screen.getByTestId('email-add-message')).toHaveTextContent('no field Name'))
    fireEvent.change(screen.getByTestId('email-add-cn'), { target: { value: 'test-aa' } })
    fireEvent.click(screen.getByText('Create'))
    await waitFor(() => expect(screen.getByTestId('email-add-message')).toHaveTextContent('no field Surname'))
  })
})
