import { render, screen, waitFor, getByText} from '@testing-library/react';
import ConsolePage from './ConsolePage';
import { Cookies, CookiesProvider } from 'react-cookie';
import { MemoryRouter, Switch, BrowserRouter, Routes, Route } from "react-router-dom";

test('show login/register page if not logged', async () => {
  render(
    <MemoryRouter path="/console">
        <ConsolePage/>
      </MemoryRouter>
  )
  expect(screen.getByText(/register/i)).toBeInTheDocument();
  let login = screen.getByRole("link", {name: /login/i})
  expect(login).toBeInTheDocument();
  expect(login).toHaveAttribute("href", "/console/login");
});

test('show console page when logged in', () => {
  const cookies = new Cookies()
  cookies.set("accessToken", "sometoken")
  render(
    <MemoryRouter path="/console">
      <ConsolePage/>
    </MemoryRouter>
  )
  expect(screen.queryByText(/register/i)).not.toBeInTheDocument();
  expect(() => screen.getByText(/login/i)).toThrow();
});

test('show apps in console page', () => {
  const cookies = new Cookies()
  cookies.set("accessToken", "sometoken")
  render(
    <MemoryRouter path="/console">
      <ConsolePage/>
    </MemoryRouter>
  )
  expect(screen.queryByText(/Apps/i)).toBeInTheDocument();
  expect(screen.queryByText(/Nginx/i)).toBeInTheDocument();
});
