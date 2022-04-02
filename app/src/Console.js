import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Component, useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from './pages/Register';
import { LoginOrRegister } from './components/loginregister';

const Console = () => {
  const [cookies, setCookie] = useCookies();
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Marcin");
  const [user, setUser] = useState({});

  function getUserInfo() {
    if(cookies.accessToken) {
      if(user.name != "Dummy user") {
        setUser({name: "Dummy user"})
      }
    }
  }

  getUserInfo()
  if(!user.name) {
    console.log("No user, showing login/register");
    return(
      <LoginOrRegister/>
    )
  }

  return (
    <h1>Consolee</h1>
    )
}

export default Console;
