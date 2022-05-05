import React from 'react'
import PropTypes from 'prop-types'

function UserInfo (props) {
  const groups = []
  if (props.user.groups) { props.user.groups.forEach((group) => groups.push(<option key={group} value={group}>{group}</option>)) }
  return (
        <React.Fragment>
        userinfo
        <ul>
            <li>login: {props.user.login}</li>
            <li>sn: {props.user.sn}</li>
            <li>gn: {props.user.gn}</li>
            <li>org: <select name='q'>
                {groups}
                </select>
        </li>
        </ul>
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
