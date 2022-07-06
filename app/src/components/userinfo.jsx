import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Dropdown } from 'react-bootstrap'

function UserInfo (props) {
  const groups = []
  if (props.user.groups) { props.user.groups.forEach((group) => groups.push(<option key={group} value={group}>{group}</option>)) }
  return (
    <React.Fragment>
      <Dropdown>
        <Dropdown.Toggle variant='dark' src="https://aa.png" id="dropdown-avatar">
          Avatar here
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <ul>
            <li>login: {props.user.login}</li>
            <li>sn: {props.user.sn}</li>
            <li>gn: {props.user.gn}</li>
            <li>email: {props.user.mail}</li>
          </ul>
          <Link to='/logout'>Logout</Link>
        </Dropdown.Menu>
      </Dropdown>
    </React.Fragment>
  )
}

UserInfo.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string,
    gn: PropTypes.string,
    sn: PropTypes.string,
    mail: PropTypes.string,
    groups: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
}

export default UserInfo
