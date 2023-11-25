import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import AppEmailAdd from './appEmailAdd'
import AppEmailList from './appEmailList'
import PropTypes from 'prop-types'

function AppEmail (props) {
  const [refreshList, setRefreshList] = useState(false)
  const handleAddElement = () => {
    setRefreshList(!refreshList)
  }

  useEffect(() => {
    document.title = 'Exphost - Emails'
  }, [])

  return (
      <React.Fragment>
          <Container>
            <h1>Emails</h1>
          </Container>
          <Container className='my-3'>
            <AppEmailAdd org={props.org} onAddElement={handleAddElement} />
          </Container>
          <Container className='my-3'>
            <AppEmailList org={props.org} refreshList={refreshList} />
          </Container>
      </React.Fragment>
  )
}

AppEmail.propTypes = {
  org: PropTypes.string.isRequired
}

export default AppEmail
