import { Navigate, useNavigate, Routes, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Console from '../components/console'
import AppNginx from '../components/apps/appNginx'
import AppDomain from '../components/apps/appDomain'
import AppEmail from '../components/apps/appEmail'
import AppApp from '../components/apps/appApp'
import axios from 'axios'
import RegisterPage from './Register'
import TopNav from '../components/top_nav'
import SideMenu from '../components/sidemenu'

const ConsolePage = () => {
  const [user, setUser] = useState({ username: 'initial', groups: [] })
  const [org, setOrg] = useState('ini')
  const [app, setApp] = useState('ini')
  const [apps, setApps] = useState(['none'])
  const navigate = useNavigate()

  function getUserinfoMock () {
    setUser({
      sn: 'test-sn',
      gn: 'test-gn',
      mail: 'test-mail@mail.ru',
      username: 'test-login',
      groups: ['test-group1', 'test-group2']
    })
  }

  function getApps (org) {
    const requestOptions = {
      url: window.API_URL + '/api/apps/v1/app/',
      params: {
        org
      },
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      },
      responseType: 'json',
      withCredentials: true
    }
    axios
      .request(requestOptions)
      .then(function (response) {
        const res = response.data // Response received from the API
        setApps(res)
      })
      .catch(function (err) {
        console.log('getApps error', err.response)
        setApps(['none'])
        // alert("Submit failed")
      })
  }

  function getUserinfo () {
    const requestOptions = {
      url: window.API_URL + '/api/users/v1/users/userinfo',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      },
      responseType: 'json',
      withCredentials: true
    }
    axios
      .request(requestOptions)
      .then(function (response) {
        const res = response.data // Response received from the API
        setUser(res)
        return 0
      })
      .catch(function (err) {
        console.log('getUserinfo error', err.response)
        setUser(null)
        // alert("Submit failed")
      })
  }

  useEffect(() => {
    if (process.env.REACT_APP_TESTING) {
      getUserinfoMock()
      return
    }
    getUserinfo()
  }, [])

  useEffect(() => {
    if (user === null || !user) {
      navigate('register')
      return
    }
    if (user.username === 'initial') {
      return
    }
    setOrg(user.groups[0])
  }, [user])

  useEffect(() => {
    getApps(org)
  }, [org])

  useEffect(() => {
    if (apps.length === 0) {
      navigate('apps/app')
      return
    }
    setApp(apps[0])
  }, [apps])

  return (
    <React.Fragment>
    <TopNav user={user}/>
    <Row>
      <Col sm={3} lg={2} className='sidemenu'>
        { org !== 'ini'
          ? <SideMenu currentOrg={org} orgs={user.groups} setOrg={setOrg} currentApp={app} setApp={setApp} apps={apps}/>
          : null
        }
      </Col>
      <Col>
      <Routes>
        <Route>
          <Route index element={<Console/>}/>
          <Route path='apps/domain' element={<AppDomain org={org}/> }/>
          <Route path='apps/emails' element={<AppEmail org={org}/> }/>
          <Route path='apps/nginx' element={<AppNginx org={org} app={app}/> }/>
          <Route path='apps/app' element={<AppApp org={org}/> }/>
          <Route path='*' element={<Navigate to='/'/>}/>
          <Route path="register" element={<RegisterPage/> }/> {/* needed for tests :| */}
        </Route>
      </Routes>
      </Col>
    </Row>
    <p>bottom</p>
    </React.Fragment>
  )
}

export default ConsolePage
