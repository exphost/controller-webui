import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import AppNginxAdd from './appNginxAdd'
import AppNginxList from './appNginxList'
import PropTypes from 'prop-types'

function AppNginx (props) {
  const [refreshList, setRefreshList] = useState(false)
  const handleChangeElement = () => {
    setRefreshList(!refreshList)
  }

  useEffect(() => {
    document.title = 'Exphost - Nginx'
  }, [])

  return (
      <React.Fragment>
          <Container>
            <h1>Nginx</h1>
          </Container>
          <Container className='my-3'>
            <AppNginxAdd org={props.org} onChangeElement={handleChangeElement} app={props.app} />
          </Container>
          <Container className='my-3'>
            <AppNginxList org={props.org} refreshList={refreshList} app={props.app} onChangeElement={handleChangeElement} />
          </Container>
      </React.Fragment>
  )
}

AppNginx.propTypes = {
  org: PropTypes.string.isRequired,
  app: PropTypes.string.isRequired
}

export default AppNginx
