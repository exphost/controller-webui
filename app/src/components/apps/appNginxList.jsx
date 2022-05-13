import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

function AppNginxList (props) {
  const [apps, setApps] = useState(<tr><td>0</td><td span="2">Loading</td></tr>)

  function loadApps () {
    const query = JSON.stringify({
      query: ` {
                        nginx(org: "${props.org}") {
                                    name,
                                    org,
                                    fqdn,
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

        setApps(res.data.nginx.map((app, index) => (
                <tr key={app.id}>
                    <td>{ index }</td>
                    <td>{ app.name }</td>
                    <td>{ app.org }</td>
                    <td>
                      { app.fqdn ? app.fqdn : '' }
                    </td>
                    <td>
                      { app.git ? app.git.repo + ' / ' + app.git.branch : '' }
                    </td>
                </tr>
        )))
        return 0
      })
      .catch(function (err) {
        console.log(err)
        // alert("Submit failed")
      })
  }

  useEffect(() => {
    loadApps()
  }, [props.org])

  return (
        <React.Fragment>
        <h1> nginx list </h1>
        <table>
          <thead><tr>
            <th>Id</th>
            <th>Name</th>
            <th>Org</th>
            <th>Fqdn</th>
            <th>Git</th>
          </tr></thead>
          <tbody>
          {apps}
          </tbody>
        </table>
        </React.Fragment>
  )
}

AppNginxList.propTypes = {
  org: PropTypes.string.isRequired
}

export default AppNginxList
