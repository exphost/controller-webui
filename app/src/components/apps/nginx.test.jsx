import { render, screen, waitFor, getByText, fireEvent} from '@testing-library/react';
import AppNginx from './nginx';
import nock from 'nock';
import API_URL from '../../../public/env_vars.js';

test('show apps in console page', () => {
  render(
      <AppNginx/>
  )
  expect(screen.queryByText(/Nginx/i)).toBeInTheDocument();
  expect(screen.queryByText(/name/i)).toBeInTheDocument();
  expect(screen.queryByText(/create/i)).toBeInTheDocument();
});

test('submit nginx app wrong response', async () => {
  window.API_URL="http://localhost:8080"
  const scope = nock('http://localhost:8080')
  .post('/graphql')
  .reply(400, {
  }, {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json'
  });
  render(<AppNginx/>)
  fireEvent.change(screen.getByTestId("nginx-add-name"), {target: {value: "test-aa"}})
  fireEvent.click(screen.getByText("Create"))
  await waitFor(() => expect(screen.getByTestId("nginx-add-message")).toHaveTextContent("submit error"))
});

test('submit nginx app', async () => {
  window.API_URL="http://localhost:8080"
  const scope = nock('http://localhost:8080')
  .post('/graphql')
  .reply(200, {
    data: {
      appNginxCreate: {
        error: ""
      }
    }
  }, {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json'
  });
  render(<AppNginx org="qwe"/>)
  expect(screen.getByTestId("nginx-add-org")).toHaveDisplayValue("qwe")
  fireEvent.change(screen.getByTestId("nginx-add-name"), {target: {value: "test-aa"}})
  fireEvent.click(screen.getByText("Create"))
  await waitFor(() => expect(screen.getByTestId("nginx-add-message")).toHaveTextContent("added"))
});

test('submit nginx app duplicate', async () => {
  window.API_URL="http://localhost:8080"
  const scope = nock('http://localhost:8080')
  .post('/graphql')
  .reply(200, {
    data: {
      appNginxCreate: {
        error: "App already exists"
      }
    }
  }, {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json'
  });
  render(<AppNginx/>)
  fireEvent.change(screen.getByTestId("nginx-add-name"), {target: {value: "test-aa"}})
  fireEvent.click(screen.getByText("Create"))
  await waitFor(() => expect(screen.getByTestId("nginx-add-message")).toHaveTextContent("already exists"))
});

test('submit nginx app no name', async () => {
  render(<AppNginx/>)
  fireEvent.click(screen.getByText("Create"))
  await waitFor(() => expect(screen.getByTestId("nginx-add-message")).toHaveTextContent("no field name"))
    
});

