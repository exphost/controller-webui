import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from '../components/registerForm'
function LoginOrRegister () {
  return <div>
    <Link to='/console/login'>Login</Link><br/>
    or<br/>
    <RegisterForm/>
  </div>
}

export { LoginOrRegister }
