import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App2 from './App';
import RegisterPage from './pages/Register';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//ReactDOM.render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>,
//  document.getElementById('root')
//);


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<App2 />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes> 
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
