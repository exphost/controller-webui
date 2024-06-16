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
      if (input[fields[i][0]] == null || input[fields[i][0]] === '') {
        // alert("Field "+fields[i][1]+" cannot be empty");
        setMessage('no field ' + fields[i][1])
        return 2
      }
    }
    const values = {
      mail: input.mail,
      cn: input.cn,
      sn: input.sn
    }
    const requestOptions = {
      url: window.API_URL + '/api/users/v1/emails/?org=' + props.org,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      },
      data: values,
      responseType: 'json'
    }
    axios
      .request(requestOptions)
      .then(function (response) {
        setMessage('added ' + response.data.password)
        props.onAddElement()
        return 0
      })
      .catch(function (err) {
        if (err.response) {
          if (err.response.status === 409) {
            setMessage('error 1: duplicate')
            return 1
            // alert("Duplicate entry")
          }
          setMessage('error 2: submit failed')
          return 2
        }
        // console.log('error 3: submit error')
        setMessage('error 3: s  ubmit error')
        return 3
        // alert("Submit faile  d")
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
  org: PropTypes.string.isRequired,
  onAddElement: PropTypes.func.isRequired
}

export default AppEmailAdd
