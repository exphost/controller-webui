import { render, screen, waitFor, getByText} from '@testing-library/react';
import Console from './Console';
import { LoginOrRegister } from './components/loginregister';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Cookies from 'universal-cookie';
import { Cookies, useCookies, withCookies, CookiesProvider } from 'react-cookie';

test('show login/register page if not logged', () => {
  render(
    <Console/>
  )
  expect(screen.getByText(/register/i)).toBeInTheDocument();
  let login = screen.getByRole("link", {name: /login/i})
  expect(login).toBeInTheDocument();
  expect(login).toHaveAttribute("href", "/login");
});

test('show console page when logged in', () => {
  const cookies = new Cookies()
  cookies.set("accessToken", "sometoken")
  render(
    <CookiesProvider cookies={cookies}>
      <Console/>
    </CookiesProvider>
  )
  expect(screen.queryByText(/register/i)).not.toBeInTheDocument();
  expect(() => screen.getByText(/login/i)).toThrow();
});

