import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import PropTypes from 'prop-types'

function AppDomainAdd (props) {
  const [input, setInputs] = useState({})
  const [message, setMessage] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    const fields = [['name', 'name']]
    for (let i = 0; i < fields.length; i++) {
      if (input[fields[i][0]] == null || input[fields[i][0]] === '') {
        // alert("Field "+fields[i][1]+" cannot be empty");
        setMessage('no field ' + fields[i][1])
        return 2
      }
    }
    const values = {
      name: input.name,
      org: props.org
    }
    const requestOptions = {
      url: window.API_URL + '/api/domains/v1/domains/',
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
        setMessage('added')
        props.onChangeElement()
        return 0
      })
      .catch(function (err) {
        if (err.response) {
          if (err.response.status === 409) {
            setMessage('error 1: already exists')
            return 1
          }
          // console.log('error 2: submit failed')
          setMessage('error 2: submit failed')
          return 2
        }
        // console.log('error 3: submit error')
        setMessage('error 3: submit error')
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
        <div data-testid='domain-add-message'>{ message }</div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="domain_name">
            <Form.Label>name:</Form.Label>
            <Form.Control data-testid="domain-add-name" name="name" onChange={handleChange}/>
          </Form.Group>
            <input data-testid="domain-add-org" name="org" type="hidden" value={props.org}/>
            <Button data-testid="domain-add-submit" type="submit" className='my-3'>Create</Button>
        </Form>
        </React.Fragment>
  )
}

AppDomainAdd.propTypes = {
  org: PropTypes.string.isRequired,
  onChangeElement: PropTypes.func.isRequired
}

export default AppDomainAdd
