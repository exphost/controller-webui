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
      console.log(input[fields[i][0]])
      if (input[fields[i][0]] == null || input[fields[i][0]] === '') {
        // alert("Field "+fields[i][1]+" cannot be empty");
        setMessage('no field ' + fields[i][1])
        return 2
      }
    }
    const values = `name: "${input.name}",
              org: "${props.org}"`
    const query = JSON.stringify({
      query: `mutation {
                    domainRegister(${values})
                        {
                            domain {
                                name,
                                org,
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
        if (res.data.domainRegister.error &&
                   res.data.domainRegister.error.includes('already exists')) {
          setMessage('error 1: already exists')
          return 1
        }
        if (res.data.domainRegister.error) {
          setMessage('error 2: submit failed')
          return 2
        }
        setMessage('added')
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
  org: PropTypes.string.isRequired
}

export default AppDomainAdd
