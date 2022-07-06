import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import UserInfo from './userinfo'

test('show userinfo', () => {
  const user = {
    login: 'jdoe',
    sn: 'Doe',
    gn: 'John',
    groups: ['g1', 'g2', 'g3']
  }
  render(
    <MemoryRouter path="/console">
        <UserInfo user={user}/>
      </MemoryRouter>
  )
  const dropdownButton = screen.getByRole('button', { name: 'Avatar here' })
  fireEvent.click(dropdownButton)
  expect(screen.queryByText(/jdoe/)).toBeInTheDocument()
  expect(screen.queryByText(/John/)).toBeInTheDocument()
  expect(screen.queryByText(/Doe/)).toBeInTheDocument()
  expect(screen.queryByText(/Logout/)).toBeInTheDocument()
})
