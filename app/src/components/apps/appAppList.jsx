import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import PropTypes from 'prop-types'

function AppAppList (props) {
  const [apps, setApps] = useState(<tr><td>0</td><td span="2">Loading</td></tr>)
  const [message, setMessage] = useState('')

  function makeTable (content) {
    setApps(content.map((app, index) => (
      <tr key={index}>
        <td>{ index }</td>
        <td>{ app }</td>
      </tr>
    )))
  }

  function loadApps () {
    const requestOptions = {
      url: window.API_URL + '/api/apps/v1/app/?org=' + props.org,
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
        setMessage('Error submit failed', err.response)
        // console.log('submit failed', err.response)
        // alert("Submit failed")
      })
  }

  useEffect(() => {
    loadApps()
  }, [props.org, props.refreshList])

  return (
        <React.Fragment>
        <Table striped bordered hover>
          <thead><tr>
            <th>Id</th>
            <th>Name</th>
          </tr></thead>
          <tbody>
          {apps}
          </tbody>
        </Table>
        <p data-testid="message">{message}</p>
        </React.Fragment>
  )
}

AppAppList.propTypes = {
  org: PropTypes.string.isRequired,
  refreshList: PropTypes.bool.isRequired
}

export default AppAppList
