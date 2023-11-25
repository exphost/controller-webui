import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import PropTypes from 'prop-types'

function AppEmailList (props) {
  const [emails, setEmails] = useState(<tr><td>0</td><td colSpan="4">Loading</td></tr>)

  function makeTable (content) {
    setEmails(content.map((email, index) => (
      <tr key={index}>
        <td>{ index }</td>
        <td>{ email.mail }</td>
        <td>{ email.cn }</td>
        <td>{ email.sn }</td>
        <td><ul>{ email.aliases.map(mail => (<li key={mail}>{mail}</li>)) } </ul></td>
      </tr>
    )))
  }
  function loadEmailsMock () {
    const emails = [
      {
        mail: 'aa@example.com',
        cn: 'Jan',
        sn: 'Barski',
        aliases: [
          'aa@example.com',
          'bb@example.com'
        ]
      },
      {
        mail: 'john@snow.com',
        cn: 'John',
        sn: 'Snow',
        aliases: [
          'john@snow.com',
          'winter@iscomming.com'
        ]
      }
    ]
    makeTable(emails)
  }
  function loadEmails () {
    const requestOptions = {
      url: window.API_URL + '/api/users/v1/emails/?org=' + props.org,
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
      loadEmailsMock()
    } else {
      loadEmails()
    }
  }, [props.org, props.refreshList])

  return (
        <React.Fragment>
        <Table striped bordered hover>
          <thead><tr>
            <th>Id</th>
            <th>Name</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Aliases</th>
          </tr></thead>
          <tbody>
          {emails}
          </tbody>
        </Table>
        </React.Fragment>
  )
}

AppEmailList.propTypes = {
  org: PropTypes.string.isRequired,
  refreshList: PropTypes.bool.isRequired
}

export default AppEmailList
