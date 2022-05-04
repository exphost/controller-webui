import { render, screen, waitFor, getByText} from '@testing-library/react';
import ConsolePage from './ConsolePage';
import { Cookies, CookiesProvider } from 'react-cookie';
import { MemoryRouter, Switch, BrowserRouter, Routes, Route } from "react-router-dom";
import { act } from 'react-dom/test-utils';
import nock from 'nock';

test('show login/register page if not logged', async () => {
  render(
    <MemoryRouter path="/console">
        <ConsolePage/>
      </MemoryRouter>
  )
  await waitFor(() => expect(screen.getByText(/register/i)).toBeInTheDocument());
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
  expect(screen.queryByText(/Register Form/)).not.toBeInTheDocument();
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

test('show userinfo in console page', () => {
  window.API_URL="http://localhost:8080"
  const scope = nock('http://localhost:8080')
  .post('/graphql')
  .reply(200, {
    data: {
      user: {
        user: {
          sn: "pr",
          gn: "test",
          mail: "test-pr@mail.ru",
          login: "test-pr",
          groups: [
            "test-pr"
          ]
        }
      }
    }
  }, {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json'
  });
  const cookies = new Cookies()
  cookies.set("accessToken", "sometoken")
  render(
    <MemoryRouter path="/console">
      <ConsolePage/>
    </MemoryRouter>
  )
  expect(screen.queryByText(/userinfo/i)).toBeInTheDocument();
});
