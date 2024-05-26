import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import PropTypes from 'prop-types'

function AppNginxAdd (props) {
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
      org: props.org,
      app: props.app,
      name: input.name,
      spec: {
        helm: {
          type: 'nginx'
        },
        config: {}
      }
    }
    if (input.gitrepo) {
      if (!values.spec.config.git) {
        values.spec.config.git = {}
      }
      values.spec.config.git.repo = input.gitrepo
      if (input.gitbranch) {
        values.spec.config.git.branch = input.gitbranch
      }
    }
    if (input.fqdn) {
      values.spec.config.hostnames = [input.fqdn]
    }
    const requestOptions = {
      url: window.API_URL + '/api/apps/v1/components/',
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
        console.log('error 3: submit error')
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
        <div data-testid='nginx-add-message'>{ message }</div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="nginx_name">
            <Form.Label>name:</Form.Label>
            <Form.Control data-testid="nginx-add-name" name="name" onChange={handleChange}/>
          </Form.Group>
          <Form.Group controlId="nginx_git_repo">
            <Form.Label>git repo:</Form.Label>
            <Form.Control data-testid="nginx-add-git-repo" name="gitrepo" onChange={handleChange}/>
          </Form.Group>
          <Form.Group controlId="nginx_git_branch">
            <Form.Label>git branch:</Form.Label>
            <Form.Control data-testid="nginx-add-git-branch" name="gitbranch" onChange={handleChange}/>
          </Form.Group>
          <Form.Group controlId="nginx_fqdn">
            <Form.Label>fqdn:</Form.Label>
            <Form.Control data-testid='nginx-add-git-fqdn' name="fqdn" onChange={handleChange}/>
          </Form.Group>
            <input data-testid="nginx-add-org" name="org" type="hidden" value={props.org}/>
            <Button data-testid="nginx-add-submit" type="submit" className='my-3'>Create</Button>
        </Form>
        </React.Fragment>
  )
}

AppNginxAdd.propTypes = {
  org: PropTypes.string.isRequired,
  onAddElement: PropTypes.func.isRequired,
  app: PropTypes.string.isRequired
}

export default AppNginxAdd
