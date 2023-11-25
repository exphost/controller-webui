import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import AppAppAdd from './appAppAdd'
import AppAppList from './appAppList'
import PropTypes from 'prop-types'

function AppApp (props) {
  useEffect(() => {
    document.title = 'Exphost - Applications'
  }, [])

  return (
      <React.Fragment>
          <Container>
            <h1>Create application</h1>
          </Container>
          <Container className='my-3'>
            <AppAppAdd org={props.org} />
          </Container>
          <Container className='my-3'>
            <AppAppList org={props.org} />
          </Container>
      </React.Fragment>
  )
}

AppApp.propTypes = {
  org: PropTypes.string.isRequired
}

export default AppApp
