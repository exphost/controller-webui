import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from '../components/registerForm'
function LoginOrRegister () {
  return <div className='container justify-content-center align-items-center mt-5'>
    <div className='container text-center'>
    <Link className='btn-primary btn' to='/login'>Login</Link><br/>
    </div>
    <div className='container text-center'>
    or
    </div>
    <RegisterForm/>
  </div>
}

export { LoginOrRegister }
