import React from 'react'
import { Container } from 'react-bootstrap'
import AppNginxAdd from './appNginxAdd'
import AppNginxList from './appNginxList'
import PropTypes from 'prop-types'

function AppNginx (props) {
  return (
      <React.Fragment>
          <Container>
            <h1>Nginx</h1>
          </Container>
          <Container className='my-3'>
            <AppNginxAdd org={props.org} />
          </Container>
          <Container className='my-3'>
            <AppNginxList org={props.org} />
          </Container>
      </React.Fragment>
  )
}

AppNginx.propTypes = {
  org: PropTypes.string.isRequired
}

export default AppNginx
