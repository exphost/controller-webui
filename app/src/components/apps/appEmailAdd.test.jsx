import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import AppEmailAdd from './appEmailAdd'
import nock from 'nock'

test('show apps in console page', () => {
  render(<AppEmailAdd org="test-org"/>)
  expect(screen.queryByText(/Email:/)).toBeInTheDocument()
  expect(screen.queryByText(/Name:/)).toBeInTheDocument()
  expect(screen.queryByText(/Surname:/)).toBeInTheDocument()
})

test('submit email app wrong response', async () => {
  window.API_URL = 'http://localhost:8080'
  nock('http://localhost:8080')
    .post('/graphql')
    .reply(400, {
    }, {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json'
    })
  render(<AppEmailAdd org="test-org"/>)
  fireEvent.change(screen.getByTestId('email-add-mail'), { target: { value: 'test-aa' } })
  fireEvent.change(screen.getByTestId('email-add-cn'), { target: { value: 'test-aa' } })
  fireEvent.change(screen.getByTestId('email-add-sn'), { target: { value: 'test-aa' } })
  fireEvent.click(screen.getByText('Create'))
  await waitFor(() => expect(screen.getByTestId('email-add-message')).toHaveTextContent('submit error'))
})

test('submit email', async () => {
  window.API_URL = 'http://localhost:8080'
  nock('http://localhost:8080')
    .post('/graphql')
    .reply(200, {
      data: {
        emailCreate: {
          email: {
            mail: 'aa@aa.com',
            cn: 'John',
            sn: 'Brown',
            password: 'pass123'
          },
          error: ''
        }
      }
    }, {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json'
    })
  render(<AppEmailAdd org="qwe"/>)
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
  render(<AppEmailAdd org="test-org"/>)
  fireEvent.click(screen.getByText('Create'))
  await waitFor(() => expect(screen.getByTestId('email-add-message')).toHaveTextContent('no field Mail'))
  fireEvent.change(screen.getByTestId('email-add-mail'), { target: { value: 'test-aa' } })
  fireEvent.click(screen.getByText('Create'))
  await waitFor(() => expect(screen.getByTestId('email-add-message')).toHaveTextContent('no field Name'))
  fireEvent.change(screen.getByTestId('email-add-cn'), { target: { value: 'test-aa' } })
  fireEvent.click(screen.getByText('Create'))
  await waitFor(() => expect(screen.getByTestId('email-add-message')).toHaveTextContent('no field Surname'))
})
