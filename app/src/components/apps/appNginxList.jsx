import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import PropTypes from 'prop-types'

function AppNginxList (props) {
  const [apps, setApps] = useState(<tr><td>0</td><td span="2">Loading</td></tr>)
  const [message, setMessage] = useState('')

  function makeTable (content) {
    setApps(Object.keys(content).map((key, index) => {
      return (
        <tr key={key}>
        <td>{index + 1}</td>
        <td>{key}</td>
        <td>{content[key].config?.hostnames ? content[key].config.hostnames.join(', ') : ''}</td>
        <td>{content[key].config?.git ? content[key].config.git.repo + ' / ' + content[key].config.git.branch : ''}</td>
        </tr>
      )
    }))
  }
  function loadAppsMock () {
    const apps = {
      n1: {
        config: {
          hostnames: ['fqdn1'],
          git: {
            repo: 'repo1',
            branch: 'branch1'
          }
        }
      },
      n2: {}
    }
    makeTable(apps)
  }
  function loadApps () {
    const requestOptions = {
      url: window.API_URL + '/api/apps/v1/components/?org=' + props.org + '&app=' + props.app + '&type=nginx',
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
        // console.log('submit failed', err, err.response)
        setMessage('Error submit failed', err.response)
        // alert("Submit failed")
      })
  }

  useEffect(() => {
    if (process.env.REACT_APP_TESTING) {
      loadAppsMock()
    } else {
      loadApps()
    }
  }, [props.org, props.app, props.refreshList])

  return (
        <React.Fragment>
        <Table striped bordered hover>
          <thead><tr>
            <th>Id</th>
            <th>Name</th>
            <th>Fqdns</th>
            <th>Git</th>
          </tr></thead>
          <tbody>
          {apps}
          </tbody>
        </Table>
        <p data-testid="message">{message}</p>
        </React.Fragment>
  )
}

AppNginxList.propTypes = {
  org: PropTypes.string.isRequired,
  refreshList: PropTypes.bool.isRequired,
  app: PropTypes.string.isRequired
}

export default AppNginxList
