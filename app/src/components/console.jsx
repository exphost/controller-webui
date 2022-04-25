import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Component, useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginOrRegister } from '../components/loginregister';
import React from 'react';

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
    return(
        <Navigate to='register'/>
    )
  }
  return (
    <React.Fragment>
    <h1>Consoleeeee</h1>
    <h2>Apps</h2>
    <ul>
    <li><Link to='/console/apps/nginx'>Nginx</Link></li>
    </ul>
    </React.Fragment>
    )
}

export default Console;
