import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import AppAppAdd from './appAppAdd'
import AppAppList from './appAppList'
import PropTypes from 'prop-types'

function AppApp (props) {
  useEffect(() => {
    document.title = 'Exphost - Applications'
  }, [])
  const [refreshList, setRefreshList] = useState(false)
  const handleChangeElement = () => {
    setRefreshList(!refreshList)
  }

  return (
      <React.Fragment>
          <Container>
            <h1>Create application</h1>
          </Container>
          <Container className='my-3'>
            <AppAppAdd org={props.org} onChangeElement={handleChangeElement} />
          </Container>
          <Container className='my-3'>
            <AppAppList org={props.org} refreshList={refreshList} onChangeElement={handleChangeElement} />
          </Container>
      </React.Fragment>
  )
}

AppApp.propTypes = {
  org: PropTypes.string.isRequired
}

export default AppApp
