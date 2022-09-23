import React from 'react'
import { Container } from 'react-bootstrap'
import AppEmailAdd from './appEmailAdd'
import AppEmailList from './appEmailList'
import PropTypes from 'prop-types'

function AppEmail (props) {
  return (
      <React.Fragment>
          <Container>
            <h1>Emails</h1>
          </Container>
          <Container className='my-3'>
            <AppEmailAdd org={props.org} />
          </Container>
          <Container className='my-3'>
            <AppEmailList org={props.org} />
          </Container>
      </React.Fragment>
  )
}

AppEmail.propTypes = {
  org: PropTypes.string.isRequired
}

export default AppEmail
