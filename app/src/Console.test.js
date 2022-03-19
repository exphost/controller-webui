import { render, screen, waitFor, getByText} from '@testing-library/react';
import Console from './Console';
import { LoginOrRegister } from './components/loginregister';
import { BrowserRouter, Routes, Route } from "react-router-dom";

test('show login/register page if not logged', () => {
  render(
    <BrowserRouter>
    <Routes>
      <Route path="/*" element={<Console/>}/>
    </Routes>
    </BrowserRouter>
  )
  const registerElement = screen.getByText(/register/i);
  expect(registerElement).toBeInTheDocument();
  const loginElement = screen.getAllByText(/login/i);
  expect(loginElement[0]).toBeInTheDocument();
});

