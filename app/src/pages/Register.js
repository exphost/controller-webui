import React from 'react'
import './Register.css'
import { LoginOrRegister } from '../components/loginregister'
import TopNav from '../components/top_nav'

function RegisterPage () {
  return (
    <React.Fragment>
      <TopNav/>
      <LoginOrRegister/>
    </React.Fragment>
  )
}

export default RegisterPage
