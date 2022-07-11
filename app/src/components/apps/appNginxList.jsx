import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

function AppNginxList (props) {
  const [apps, setApps] = useState(<tr><td>0</td><td span="2">Loading</td></tr>)

  function makeTable (content) {
    setApps(content.map((app, index) => (
      <tr key={index}>
        <td>{ index }</td>
        <td>{ app.name }</td>
        <td>{ app.org }</td>
        <td>
          { app.fqdns
            ? <ul>
                { app.fqdns.map((fqdn, index) => <li key={index}> <Link to={fqdn}>{fqdn}</Link></li>)}
              </ul>
            : '' }
        </td>
        <td>
          { app.git ? app.git.repo + ' / ' + app.git.branch : '' }
        </td>
      </tr>
    )))
  }
  function loadAppsMock () {
    const apps = [
      {
        name: 'app1',
        org: 'org1',
        fqdns: ['fqdn1'],
        git: {
          repo: 'repo1',
          branch: 'branch1'
        }
      },
      {
        name: 'app2',
        org: 'org1',
        fqdns: ['fqdn2'],
        git: {
          repo: 'repo2',
          branch: 'branch1'
        }
      },
      {
        name: 'app3',
        org: 'org1',
        fqdns: ['fqdn3'],
        git: {
          repo: 'repo3',
          branch: 'branch1'
        }
      }
    ]
    makeTable(apps)
  }
  function loadApps () {
    const query = JSON.stringify({
      query: ` {
                        nginx(org: "${props.org}") {
                                    name,
                                    org,
                                    fqdns,
                                    git {
                                        repo,
                                        branch
                                    }
                                },
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
        makeTable(res.data.nginx)
        return 0
      })
      .catch(function (err) {
        console.log(err)
        // alert("Submit failed")
      })
  }

  useEffect(() => {
    const debug = false
    if (debug) {
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
  org: PropTypes.string.isRequired
}

export default AppNginxList
