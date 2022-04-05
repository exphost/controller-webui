import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Component, useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginOrRegister } from '../components/loginregister';

const Console = () => {
  const [cookies, setCookie] = useCookies();
  const [count, setCount] = useState(0);
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
        <Navigate to='register'/>
    )
  }
  return (
    <h1>Consoleeeee</h1>
    )
}

export default Console;
