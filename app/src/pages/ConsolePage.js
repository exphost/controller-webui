import { Navigate, useNavigate, Routes, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Console from '../components/console'
import AppNginx from '../components/apps/appNginx'
import AppDomain from '../components/apps/appDomain'
import axios from 'axios'
import RegisterPage from './Register'
import TopNav from '../components/top_nav'
import SideMenu from '../components/sidemenu'

const ConsolePage = () => {
  const [user, setUser] = useState({ login: 'initial', groups: [] })
  const [org, setOrg] = useState('ini')
  const navigate = useNavigate()

  function getUserinfoMock () {
    setUser({
      sn: 'test-sn',
      gn: 'test-gn',
      mail: 'test-mail@mail.ru',
      login: 'test-login',
      groups: ['test-group1', 'test-group2']
    })
  }
  function getUserinfo () {
    const query = JSON.stringify({
      query: `{
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
    })
    const requestOptions = {
      url: window.API_URL + '/graphql',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: query,
      responseType: 'json',
      withCredentials: true
    }
    axios
      .request(requestOptions)
      .then(function (response) {
        const res = response.data // Response received from the API
        if (res.data.user.error) {
          setUser(null)
        }
        setUser(res.data.user.user)
        return 0
      })
      .catch(function (err) {
        console.log(err)
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
    if (user.login === 'initial') {
      return
    }
    setOrg(user.groups[0])
  }, [user])

  return (
    <React.Fragment>
    <TopNav user={user}/>
    <Row>
      <Col sm={3} lg={2} className='sidemenu'>
        { org !== 'ini'
          ? <SideMenu currentOrg={org} orgs={user.groups} setOrg={setOrg}/>
          : null
        }
      </Col>
      <Col>
      <Routes>
        <Route>
          <Route index element={<Console/>}/>
          <Route path='apps/domain' element={<AppDomain org={org}/> }/>
          <Route path='apps/nginx' element={<AppNginx org={org}/> }/>
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
