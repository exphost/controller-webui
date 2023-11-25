import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import AppDomainAdd from './appDomainAdd'
import AppDomainList from './appDomainList'
import PropTypes from 'prop-types'

function AppDomain (props) {
  const [refreshList, setRefreshList] = useState(false)
  const handleAddElement = () => {
    setRefreshList(!refreshList)
  }

  useEffect(() => {
    document.title = 'Exphost - Domains'
  }, [])

  return (
      <React.Fragment>
          <Container>
            <h1>Domain</h1>
          </Container>
          <Container className='my-3'>
            <AppDomainAdd org={props.org} onAddElement={handleAddElement} />
          </Container>
          <Container className='my-3'>
            <AppDomainList org={props.org} refreshList={refreshList} />
          </Container>
      </React.Fragment>
  )
}

AppDomain.propTypes = {
  org: PropTypes.string.isRequired
}

export default AppDomain
