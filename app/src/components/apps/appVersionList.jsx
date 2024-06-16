import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import PropTypes from 'prop-types'

async function getVersions (props) {
  const requestOptions = {
    url: window.API_URL + '/api/apps/v1/versions/?org=' + props.org + '&app=' + props.app,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    },
    responseType: 'json'
  }
  return await axios
    .request(requestOptions)
    .then(response => {
      // console.log('Response:', response.data)
      return response.data.versions
    })
    .catch(error => {
      console.error('Error fetching versions:', error)
      return []
    })
}

function AppVersionList (props) {
  const [versions, setVersions] = useState([])

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const versionsData = await getVersions(props)
        setVersions(versionsData)
      } catch (error) {
        console.error('Error fetching versions:', error)
      }
    }

    fetchVersions()
  }, [props.org, props.app, props.refreshList])

  // console.log('Versions:', versions)

  return (
    <React.Fragment>
      <h1>Versions</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Version</th>
          </tr>
        </thead>
        <tbody>
          {versions.map((version, index) => (
            <tr key={index}>
              <td>{version}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </React.Fragment>
  )
}

AppVersionList.propTypes = {
  org: PropTypes.string.isRequired,
  app: PropTypes.string.isRequired,
  refreshList: PropTypes.bool.isRequired
}

export default AppVersionList
export { getVersions }
