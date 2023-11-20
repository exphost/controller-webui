import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import PropTypes from 'prop-types'

function AppNginxList (props) {
  const [apps, setApps] = useState(<tr><td>0</td><td span="2">Loading</td></tr>)

  function makeTable (content) {
    setApps(content.map((app, index) => (
      <tr key={index}>
        <td>{ index }</td>
        <td>{ app.name }</td>
        <td>{ app.org }</td>
        <td>
          { app.config?.fqdns
            ? <ul>
                { app.config.fqdns.map((fqdn, index) => <li key={index}> <a href={'https://' + fqdn} target="_blank" rel="noopener noreferrer">{ fqdn }</a></li>)}
              </ul>
            : '' }
        </td>
        <td>
          { app.config?.git ? app.config.git.repo + ' / ' + app.config.git.branch : '' }
        </td>
      </tr>
    )))
  }
  function loadAppsMock () {
    const apps = [
      {
        name: 'nginx1',
        org: 'org1',
        app: 'app1',
        config: {
          fqdns: ['fqdn1'],
          git: {
            repo: 'repo1',
            branch: 'branch1'
          }
        }
      },
      {
        name: 'nginx2',
        org: 'org1',
        app: 'app2',
        config: {
          fqdns: ['fqdn2'],
          git: {
            repo: 'repo2'
          }
        }
      }
    ]
    makeTable(apps)
  }
  function loadApps () {
    const requestOptions = {
      url: window.API_URL + '/api/apps/v1/nginx/?org=' + props.org + '&app=app1',
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
        makeTable(res.nginx)
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

  useEffect(() => {
    loadApps()
  }, [props.refreshList])

  return (
        <React.Fragment>
        <Table striped bordered hover>
          <thead><tr>
            <th>Id</th>
            <th>Name</th>
            <th>Org</th>
            <th>Fqdns</th>
            <th>Git</th>
          </tr></thead>
          <tbody>
          {apps}
          </tbody>
        </Table>
        </React.Fragment>
  )
}

AppNginxList.propTypes = {
  org: PropTypes.string.isRequired,
  refreshList: PropTypes.bool.isRequired
}

export default AppNginxList
