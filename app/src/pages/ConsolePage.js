import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Component, useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Console from '../components/console';
import React from 'react';
import AppNginx from '../components/apps/nginx';
import RegisterPage from './Register';
import { LoginPageRedirect } from './LoginPage';

const ConsolePage = () => {

  return (
    <React.Fragment>
    <p><Link to='/console'>Console</Link></p>
      <Routes>
        <Route>
          <Route index element={<Console/> }/>
//          <Route path="login" element={<LoginPageRedirect/> }/>
//          <Route path="register" element={<RegisterPage/> }/>
          <Route path='apps/nginx' element={<AppNginx/> }/>
          <Route path='*' element={<Navigate to='/console'/>}/>
        </Route>
      </Routes>
    <p>bottom</p>
    </React.Fragment>
    )
}

export default ConsolePage;
