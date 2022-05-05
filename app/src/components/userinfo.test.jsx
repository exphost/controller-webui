import React from 'react'
import { render, screen } from '@testing-library/react'
import UserInfo from './userinfo'

test('show userinfo', () => {
  const user = {
    login: 'jdoe',
    sn: 'Doe',
    gn: 'John',
    groups: ['g1', 'g2', 'g3']
  }
  render(
        <UserInfo user={user}/>
  )
  expect(screen.queryByText(/jdoe/)).toBeInTheDocument()
  expect(screen.queryByText(/John/)).toBeInTheDocument()
  expect(screen.queryByText(/Doe/)).toBeInTheDocument()
  expect(screen.queryByText(/g1/)).toBeInTheDocument()
  expect(screen.queryByText(/g3/)).toBeInTheDocument()
})
