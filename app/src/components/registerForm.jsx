import React, { useState } from 'react'
import axios from 'axios'

function RegisterForm () {
  const [input, setInputs] = useState({
    login: '',
    mail: '',
    sn: '',
    gn: '',
    password: '',
    password2: ''
  })
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const fields = [['login', 'login'], ['mail', 'email'], ['sn', 'surname'], ['gn', 'name'], ['password', 'password'], ['password2', 'password2']]
    for (let i = 0; i < fields.length; i++) {
      if (input[fields[i][0]] === '') {
        alert('Field ' + fields[i][1] + ' cannot be empty')
        return 2
      }
    }
    if (input.password !== input.password2) {
      alert("Passwords didn't match")
      return 1
    }
    // const query = JSON.stringify(`{
    const query = {
      login: input.login,
      mail: input.mail,
      sn: input.sn,
      gn: input.gn,
      password: input.password
    }
    const requestOptions = {
      url: window.API_URL + '/api/users/v1/users/users/',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: query,
      responseType: 'json'
    }
    axios
      .request(requestOptions)
      .then(function (response) {
        // const res = response.data // Response received from the API
        alert('Submit successfuly')
      })
      .catch(function (error) {
        // console.log('Submit failed', error.response)
        setMessage('Error submit failed', error.response)
        alert('Submit failed')
      })
  }
  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
  }
  return (
        <React.Fragment>
        <div className='col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3 container mb-3'>
          <h2 className='text-center'>Register</h2>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='form_login'>login:</label>
                <input className='form-control' id='form_login' name="login" onChange={handleChange}/>
              </div>
              <div className='form-group'>
                <label htmlFor='form_email'>e-mail:</label>
                 <input className='form-control' type="email" id='form_email' name="mail" onChange={handleChange}/>
              </div>
              <div className='form-group'>
                <label htmlFor='form_name'>name:</label>
                <input className='form-control' id='form_name' name="gn" onChange={handleChange}/>
              </div>
              <div className='form-group'>
                <label htmlFor='form_surname'>surname:</label>
                <input className='form-control' id='form_surname' name="sn" onChange={handleChange}/>
              </div>
              <div className='form-group'>
                <label htmlFor='form_password1'>password:</label>
                <input className='form-control' type="password" id='form_password1' name="password" onChange={handleChange}/>
              </div>
              <div className='form-group'>
                <label htmlFor='form_password2'>confirm password:</label>
                <input className='form-control' type="password" id='form_password2' name="password2" onChange={handleChange}/>
              </div>
              <div className='text-center'>
              <button className='btn btn-primary mt-3' type="submit">Register</button>
              </div>
            </form>
        </div>
        <p data-testid="message">{message}</p>
        </React.Fragment>
  )
}

export default RegisterForm
