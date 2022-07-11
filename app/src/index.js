import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ConsolePage from './pages/ConsolePage'
import { LoginPageCallback, LoginPageRedirect } from './pages/LoginPage'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/Register'
import 'bootstrap/dist/css/bootstrap.min.css'

// ReactDOM.render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>,
//  document.getElementById('root')
// );

export default function App () {
  return (
    <BrowserRouter basename={'/console'}>
      <Routes>
        <Route path="/">
          <Route index element={<ConsolePage />} />
          <Route path="login" element={<LoginPageRedirect/> }/>
          <Route path="register" element={<RegisterPage/> }/>
          <Route path="*" element={<ConsolePage />}/>
          <Route path="oauth2/callback" element={<LoginPageCallback />} />
          <Route path="logout" element={<LogoutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
