import React from 'react'
import { Container } from 'react-bootstrap'
import AppDomainAdd from './appDomainAdd'
import AppDomainList from './appDomainList'
import PropTypes from 'prop-types'

function AppDomain (props) {
  return (
      <React.Fragment>
          <Container>
            <h1>Domain</h1>
          </Container>
          <Container className='my-3'>
            <AppDomainAdd org={props.org} />
          </Container>
          <Container className='my-3'>
            <AppDomainList org={props.org} />
          </Container>
      </React.Fragment>
  )
}

AppDomain.propTypes = {
  org: PropTypes.string.isRequired
}

export default AppDomain
