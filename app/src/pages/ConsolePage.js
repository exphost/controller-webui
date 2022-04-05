import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Component, useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Console from '../components/console';
import RegisterPage from './Register';
import { LoginPageRedirect } from './LoginPage';

const ConsolePage = () => {

  return (
      <Routes>
        <Route>
          <Route index element={<Console/> }/>
          <Route path="login" element={<LoginPageRedirect/> }/>
          <Route path="register" element={<RegisterPage/> }/>
        </Route>
      </Routes>
    )
}

export default ConsolePage;
