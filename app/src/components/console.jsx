import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Component, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginOrRegister } from '../components/loginregister';
import React from 'react';

const Console = () => {
  const [count, setCount] = useState(0);

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
