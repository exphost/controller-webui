import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Userinfo from '../components/userinfo'

function TopNav (props) {
  return (
    <header>
<Navbar bg="primary" expand="sm" variant="dark">
  <Container fluid>
    <Link className='navbar-brand' to="/console">Exphost</Link>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Link className='nav-link' to="../">Home</Link>
      </Nav>
      <div>
        { props.user != null
          ? <Userinfo user={props.user}/>
          : null
        }
      </div>
    </Navbar.Collapse>
  </Container>
</Navbar>

    </header>
  )
}

TopNav.propTypes = {
  user: PropTypes.object
}

export default TopNav
