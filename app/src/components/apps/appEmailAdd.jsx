import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import PropTypes from 'prop-types'

function AppEmailAdd (props) {
  const [input, setInputs] = useState({})
  const [message, setMessage] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    const fields = [['mail', 'Mail'], ['cn', 'Name'], ['sn', 'Surname']]
    for (let i = 0; i < fields.length; i++) {
      console.log(input[fields[i][0]])
      if (input[fields[i][0]] == null || input[fields[i][0]] === '') {
        // alert("Field "+fields[i][1]+" cannot be empty");
        setMessage('no field ' + fields[i][1])
        return 2
      }
    }
    const values = `mail: "${input.mail}",
              org: "${props.org}",
              cn: "${input.cn}",
              sn: "${input.sn}"`
    const query = JSON.stringify({
      query: `mutation {
                    emailCreate(${values})
                        {
                            email {
                                mail,
                                sn,
                                cn,
                                aliases,
                                password
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
        const res = response.data // Response received from the API
        if (res.data.emailCreate.error &&
                   res.data.emailCreate.error.includes('already exists')) {
          setMessage('error 1: already exists')
          return 1
        }
        if (res.data.emailCreate.error) {
          setMessage('error 2: submit failed')
          return 2
        }
        setMessage('added. password: ' + res.data.emailCreate.email.password)
        return 0
      })
      .catch(function (err) {
        console.log(err)
        setMessage('error 3: submit error')
        // alert("Submit failed")
      })
    setMessage('adding...')
  }

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
  }

  return (
        <React.Fragment>
        <div data-testid='email-add-message'>{ message }</div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="mail">
            <Form.Label>Email:</Form.Label>
            <Form.Control data-testid="email-add-mail" name="mail" onChange={handleChange}/>
          </Form.Group>
          <Form.Group controlId="cn">
            <Form.Label>Name:</Form.Label>
            <Form.Control data-testid="email-add-cn" name="cn" onChange={handleChange}/>
          </Form.Group>
          <Form.Group controlId="sn">
            <Form.Label>Surname:</Form.Label>
            <Form.Control data-testid="email-add-sn" name="sn" onChange={handleChange}/>
          </Form.Group>
          <Form.Group controlId="aliases">
            <Form.Label>Aliases:</Form.Label>
            <Form.Control data-testid="email-add-aliases" name="aliases" onChange={handleChange}/>
          </Form.Group>
          <input data-testid="email-add-org" name="org" type="hidden" value={props.org}/>
          <Button data-testid="email-add-submit" type="submit" className='my-3'>Create</Button>
        </Form>
        </React.Fragment>
  )
}

AppEmailAdd.propTypes = {
  org: PropTypes.string.isRequired
}

export default AppEmailAdd
