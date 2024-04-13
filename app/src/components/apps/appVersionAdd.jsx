import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import PropTypes from 'prop-types'

function AppVersionAdd (props) {
  const [version, setVersion] = useState('')
  const [message, setMessage] = useState('')

  const handleVersionChange = (event) => {
    setVersion(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const requestOptions = {
      url: window.API_URL + '/api/apps/v1/versions/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      },
      data: {
        org: props.org,
        app: props.app,
        version
      },
      responseType: 'json'
    }
    try {
      await axios.request(requestOptions)
      setMessage('Version added')
    } catch (error) {
      console.error('Error adding version:', error)
      setMessage('Error adding version')
    }
  }

  return (
    <React.Fragment>
      <Form>
        <Form.Group controlId='version'>
          <Form.Label>Version</Form.Label>
          <Form.Control type='text' value={version} onChange={handleVersionChange} />
        </Form.Group>
        <Button onClick={handleSubmit}>Submit</Button>
        <p data-testid='version-add-message'>{message}</p>
      </Form>
    </React.Fragment>
  )
}

AppVersionAdd.propTypes = {
  app: PropTypes.string.isRequired,
  org: PropTypes.string.isRequired
}

export default AppVersionAdd
