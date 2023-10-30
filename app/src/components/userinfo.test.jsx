import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import UserInfo from './userinfo'

describe('userinfo', () => {
  test('show userinfo', () => {
    const user = {
      login: 'jdoe',
      sn: 'Doe',
      gn: 'John',
      groups: ['g1', 'g2', 'g3']
    }
    act(() => {
      render(
        <MemoryRouter path="/console">
            <UserInfo user={user}/>
          </MemoryRouter>
      )
      const dropdownButton = screen.getByRole('button', { name: 'Avatar here' })
      fireEvent.click(dropdownButton)
    })
    expect(screen.getByText(/jdoe/)).toBeInTheDocument()
    expect(screen.getByText(/John/)).toBeInTheDocument()
    expect(screen.getByText(/Doe/)).toBeInTheDocument()
    expect(screen.getByText(/Logout/)).toBeInTheDocument()
  })
})
