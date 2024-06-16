import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { getVersions } from './appVersionList'
// import React, { useState, useEffect } from 'react'
// import { Table } from 'react-bootstrap'
import axios from 'axios'
import PropTypes from 'prop-types'

function AppInstanceAdd (props) {
  const [message, setMessage] = useState('')
  const [input, setInputs] = useState({})
  const [versions, setVersions] = useState(['loading'])

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const versionsData = await getVersions(props)
        setVersions(versionsData)
      } catch (error) {
        console.error('Error fetching versions:', error)
      }
    }

    fetchVersions()
  }, [props.org, props.app])

  const handleSubmit = (event) => {
    event.preventDefault()
    const fields = [['name', 'name'], ['config', 'config']]
    for (let i = 0; i < fields.length; i++) {
      if (input[fields[i][0]] == null || input[fields[i][0]] === '') {
        // alert("Field "+fields[i][1]+" cannot be empty");
        setMessage('no field ' + fields[i][1])
        return 2
      }
    }

    // console.log('input:', input)
    // console.log('version:', input.version)
    const config = input.config ? { values: JSON.parse(input.config) } : { values: {} }
    if (!config.values) {
      config.values = {}
    }
    config.version = input.version
    // console.log('config:', config)
    const values = {
      org: props.org,
      app: props.app,
      name: input.name,
      config
    }
    const requestOptions = {
      url: window.API_URL + '/api/apps/v1/instances/',
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
        props.onAddElement()
        return 0
      })
      .catch(function (err) {
        if (err.response) {
          if (err.response.status === 409) {
            setMessage('error 1: already exists')
            return 1
          }
          setMessage('error 2: submit failed')
          return 2
        }
        // console.log('error 3: submit error')
        setMessage('error 3: submit error')
        return 3
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
        <div data-testid='instance-add-message'>{ message }</div>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="instance">
                <Form.Label>name:</Form.Label>
                <Form.Control data-testid="instance-add-name" name="name" onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="instance_config">
                <Form.Label>config:</Form.Label>
                <Form.Control data-testid="instance-add-config" name="config" onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="instance_version">
                <Form.Label>version:</Form.Label>
                <Form.Control data-testid="instance-add-version" name="version" as="select" onChange={handleChange}>
                    {versions.map((version, index) => (
                        <option key={index}>{version}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            <input data-testid="instance-add-org" name="org" type="hidden" value={props.org}/>
            <Button type="submit" data-testid="instance-add-submit" className='my-3'>Create</Button>
        </Form>
        </React.Fragment>
  )
}

AppInstanceAdd.propTypes = {
  org: PropTypes.string.isRequired,
  onAddElement: PropTypes.func.isRequired,
  app: PropTypes.string.isRequired
}

export default AppInstanceAdd
