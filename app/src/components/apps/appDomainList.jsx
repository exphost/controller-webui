import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import PropTypes from 'prop-types'

function AppDomainList (props) {
  const [apps, setApps] = useState(<tr><td>0</td><td span="2">Loading</td></tr>)

  function makeTable (content) {
    setApps(content.map((app, index) => (
      <tr key={index}>
        <td>{ index }</td>
        <td>{ app.name }</td>
        <td>{ app.org }</td>
      </tr>
    )))
  }
  function loadAppsMock () {
    const apps = [
      {
        name: 'mock-domain.com',
        org: 'org1'
      },
      {
        name: 'mock-domain2.com',
        org: 'org1'
      }
    ]
    makeTable(apps)
  }
  function loadApps () {
    const requestOptions = {
      url: window.API_URL + '/api/domains/v1/domains/',
      params: {
        org: props.org
      },
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
      },
      responseType: 'json'
    }
    axios
      .request(requestOptions)
      .then(function (response) {
        makeTable(response.data)
        return 0
      })
      .catch(function (err) {
        console.log('submit failed', err.response)
        // alert("Submit failed")
      })
  }

  useEffect(() => {
    if (process.env.REACT_APP_TESTING) {
      loadAppsMock()
    } else {
      loadApps()
    }
  }, [props.org])

  return (
        <React.Fragment>
        <Table striped bordered hover>
          <thead><tr>
            <th>Id</th>
            <th>Name</th>
            <th>Org</th>
          </tr></thead>
          <tbody>
          {apps}
          </tbody>
        </Table>
        </React.Fragment>
  )
}

AppDomainList.propTypes = {
  org: PropTypes.string.isRequired
}

export default AppDomainList
