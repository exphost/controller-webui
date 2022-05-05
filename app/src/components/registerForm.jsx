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
    const query = JSON.stringify({
      query: `mutation {
                    userRegister(login: "${input.login}",
                                 mail: "${input.mail}",
                                 sn: "${input.sn}",
                                 gn: "${input.gn}",
                                 password: "${input.password}"
                                )
                        {
                            user {
                                gn,
                                sn,
                                mail,
                                login
                            },
                            error
                        }
                    }`
    })
    const requestOptions = {
      url: window.API_URL + '/graphql',
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
        console.log(error)
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
        <h1>Register Form</h1>
        <form onSubmit={handleSubmit}>
          login: <input name="login" onChange={handleChange}/><br/>
          e-mail: <input type="email" name="mail" onChange={handleChange}/><br/>
          name: <input name="gn" onChange={handleChange}/><br/>
          surname: <input name="sn" onChange={handleChange}/><br/>
          password: <input type="password" name="password" onChange={handleChange}/><br/>
          password2: <input type="password" name="password2" onChange={handleChange}/><br/>
          <button type="submit">Submit</button>
        </form>
        </React.Fragment>
  )
}

export default RegisterForm
