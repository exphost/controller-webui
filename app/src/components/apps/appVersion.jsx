import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import AppVersionAdd from './appVersionAdd'
import AppVersionList from './appVersionList'
import PropTypes from 'prop-types'

function AppVersion (props) {
  const [refreshList, setRefreshList] = useState(false)
  const handleAddElement = () => {
    setRefreshList(!refreshList)
  }

  useEffect(() => {
    document.title = 'Exphost - Versions'
  }, [])

  return (
      <React.Fragment>
          <Container>
            <h1>Create version</h1>
          </Container>
          <Container className='my-3'>
            <AppVersionAdd org={props.org} app={props.app} onAddElement={handleAddElement} />
          </Container>
          <Container className='my-3'>
            <AppVersionList org={props.org} app={props.app} refreshList={refreshList} />
          </Container>
      </React.Fragment>
  )
}

AppVersion.propTypes = {
  org: PropTypes.string.isRequired,
  app: PropTypes.string.isRequired
}

export default AppVersion
