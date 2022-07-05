import { Link, Navigate, useNavigate, Routes, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Console from '../components/console'
import AppNginx from '../components/apps/appNginx'
import UserInfo from '../components/userinfo'
import axios from 'axios'
import RegisterPage from './Register'

const ConsolePage = () => {
  const [user, setUser] = useState('initial')
  const [org, setOrg] = useState('ini')
  const navigate = useNavigate()

  function getUserInfo () {
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
          setUser({})
        }
        setUser(res.data.user.user)
        return 0
      })
      .catch(function (err) {
        console.log(err)
        setUser({})
        // alert("Submit failed")
      })
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  useEffect(() => {
    if (user === 'initial') {
      return
    }
    if (!user.login) {
      navigate('register')
    } else { setOrg(user.groups[0]) }
  }, [user])

  return (
    <React.Fragment>
    <p><Link to='/'>Console</Link></p>
    <UserInfo user={user}/>
      <Routes>
        <Route>
          <Route index element={<Console/>}/>
          <Route path='apps/nginx' element={<AppNginx org={org}/> }/>
          <Route path='*' element={<Navigate to='/'/>}/>
          <Route path="register" element={<RegisterPage/> }/> {/* needed for tests :| */}
        </Route>
      </Routes>
    <p>bottom</p>
    </React.Fragment>
  )
}

export default ConsolePage
