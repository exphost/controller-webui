import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import AppInstanceAdd from './appInstanceAdd'
import AppInstanceList from './appInstanceList'
import PropTypes from 'prop-types'

function AppInstance (props) {
  const [refreshList, setRefreshList] = useState(false)
  const handleAddElement = () => {
    setRefreshList(!refreshList)
  }
  return (
      <React.Fragment>
          <Container>
            <h1>Create application</h1>
          </Container>
          <Container className='my-3'>
            <AppInstanceAdd org={props.org} app={props.app} onAddElement={handleAddElement} />
          </Container>
          <Container className='my-3'>
            <AppInstanceList org={props.org} app={props.app} refreshList={refreshList} />
          </Container>
      </React.Fragment>
  )
}

AppInstance.propTypes = {
  org: PropTypes.string.isRequired,
  app: PropTypes.string.isRequired
}

export default AppInstance
