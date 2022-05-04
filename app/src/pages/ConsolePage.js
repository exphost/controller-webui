import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Component, useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Console from '../components/console';
import React from 'react';
import AppNginx from '../components/apps/nginx';
import RegisterPage from './Register';
import UserInfo from '../components/userinfo';
import axios from 'axios';
import { LoginPageRedirect } from './LoginPage';

const ConsolePage = () => {
  const [cookies, setCookie] = useCookies();
  const [user, setUser] = useState('initial');
  const navigate = useNavigate();

  function getUserInfo() {
        const query = JSON.stringify({
          query: `query {
					user {
                      user {
						sn
						gn
						mail
						login
						groups
                      }
                      error
					}
                  }`
        });
        const requestOptions = {
            url: window.API_URL+'/graphql',
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            data: query,
            responseType: 'json',
            withCredentials: true
        }
        axios
            .request(requestOptions)
            .then(function (response) {
                const res = response.data; // Response received from the API
                console.log("A");
                console.log(res);
                console.log("B");
                console.log(response);
                //console.log("B");
                //console.log(res);
                //console.log("C");
                //alert("Submit successfuly");
                if(res.data.user.error) {
                    setUser({})
                }
                setUser(res.data.user.user)
                return 0
            })
            .catch(function (err) {
                console.error(err);
      			setUser({})
                //alert("Submit failed")
            });
  }

  useEffect(() => {
    getUserInfo()
  }, []);

  useEffect(() => {
    console.log("not logged?", user)
    if(user == "initial") {
        console.log("initial")
        return
    }
    if(!user.login) {
        console.log("redirect")
        navigate('register')
    }
  }, [user])

  return (
    <React.Fragment>
    <p><Link to='/console'>Console</Link></p>
    <UserInfo user={user}/>
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
