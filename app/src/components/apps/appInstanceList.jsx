import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import PropTypes from 'prop-types'

function AppInstanceList (props) {
  const [instances, setInstances] = useState(<tr><td>0</td><td span="2">Loading</td></tr>)
  function makeTable (content) {
    setInstances(Object.entries(content).map(([instanceName, instanceConfig], index) => (
      <tr key={index}>
        <td>{ index }</td>
        <td>{ instanceName }</td>
        <td>{ instanceConfig.version }</td>
      </tr>
    )))
  }
  function loadApps () {
    const requestOptions = {
      url: window.API_URL + '/api/apps/v1/instances/?org=' + props.org + '&app=' + props.app,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      },
      responseType: 'json'
    }
    axios
      .request(requestOptions)
      .then(function (response) {
        const res = response.data // Response received from the API
        makeTable(res)
        return 0
      })
      .catch(function (err) {
        console.log('submit failed', err.response)
        // alert("Submit failed")
      })
  }
  useEffect(() => {
    loadApps()
  }, [props.org, props.app, props.refreshList])

  return (
        <React.Fragment>
        <Table striped bordered hover>
          <thead><tr>
            <th>Id</th>
            <th>Name</th>
            <th>Version</th>
          </tr></thead>
          <tbody>
          {instances}
          </tbody>
        </Table>
        </React.Fragment>
  )
}

AppInstanceList.propTypes = {
  org: PropTypes.string.isRequired,
  refreshList: PropTypes.bool.isRequired,
  app: PropTypes.string.isRequired
}

export default AppInstanceList
