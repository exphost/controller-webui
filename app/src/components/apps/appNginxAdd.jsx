import React, { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

function AppNginxAdd (props) {
  const [input, setInputs] = useState({
    name: ''
  })
  const [message, setMessage] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    const fields = [['name', 'name']]
    for (let i = 0; i < fields.length; i++) {
      if (input[fields[i][0]] === '') {
        // alert("Field "+fields[i][1]+" cannot be empty");
        setMessage('no field ' + fields[i][1])
        return 2
      }
    }
    let values = `name: "${input.name}",
              org: "${props.org}"`
    if (input.gitrepo) {
      let valuesGit = `repo: "${input.gitrepo}"`
      if (input.gitbranch) {
        valuesGit += `,branch: "${input.gitbranch}"`
      }
      values += `,git: {${valuesGit}}`
    }
    if (input.fqdn) {
      values += `,fqdn: "${input.fqdn}"`
    }
    const query = JSON.stringify({
      query: `mutation {
                    appNginxCreate(${values})
                        {
                            nginx {
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
        if (res.data.appNginxCreate.error &&
                   res.data.appNginxCreate.error.includes('already exists')) {
          setMessage('error 1: already exists')
          return 1
        }
        if (res.data.appNginxCreate.error) {
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
        <h2>Nginx!!!</h2>
        <div data-testid='nginx-add-message'>{ message }</div>
        <form onSubmit={handleSubmit}>
            name: <input data-testid="nginx-add-name" name="name" onChange={handleChange}/><br/>
            git repo: <input data-testid="nginx-add-git-repo" name="gitrepo" onChange={handleChange}/><br/>
            git branch: <input data-testid="nginx-add-git-branch" name="gitbranch" onChange={handleChange}/><br/>
            fqdn: <input data-testid="nginx-add-git-branch" name="fqdn" onChange={handleChange}/><br/>
            <input data-testid="nginx-add-org" name="org" type="hidden" value={props.org}/>
            <button data-testid="nginx-add-submit" type="subbmit">Create</button>
        </form>
        </React.Fragment>
  )
}

AppNginxAdd.propTypes = {
  org: PropTypes.string.isRequired
}

export default AppNginxAdd
