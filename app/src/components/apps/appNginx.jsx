import React from 'react'
import AppNginxAdd from './appNginxAdd'
import AppNginxList from './appNginxList'
import PropTypes from 'prop-types'

function AppNginx (props) {
  return (
      <React.Fragment>
          <AppNginxAdd org={props.org} />
          <AppNginxList org={props.org} />
      </React.Fragment>
  )
}

AppNginx.propTypes = {
  org: PropTypes.string.isRequired
}

export default AppNginx
