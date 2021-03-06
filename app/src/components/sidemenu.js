import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Nav, Navbar, Dropdown } from 'react-bootstrap'
import './sidemenu.css'

function SideMenu (props) {
  const orgs = props.orgs.map(org => {
    const isActive = org === props.currentOrg
    if (isActive) {
      return <Dropdown.Item key={org} eventKey={org} active>{org}</Dropdown.Item>
    } else {
      return <Dropdown.Item key={org} eventKey={org}>{org}</Dropdown.Item>
    }
  }
  )

  return (
    <React.Fragment>
      <Navbar expand="sm" collapseOnSelect>
      <Navbar.Toggle aria-controls="sidemenu" />
      <Navbar.Collapse id="sidemenu">
        <Nav className="col-md-12 d-block bg-light sidebar pt-1">
          <Nav.Item>
          <Dropdown className="mx-2 my-2" onSelect={props.setOrg}>
            <Dropdown.Toggle id="dropdown-autoclose-true">
              {props.currentOrg}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {orgs}
            </Dropdown.Menu>
          </Dropdown>
          </Nav.Item>
          <hr/>
          <Nav.Item>
            <Nav.Link as={Link} to="/orgs" eventKey="orgs">Orgs</Nav.Link>
          </Nav.Item>
          <hr/>
          <Nav.Item>
            <Nav.Link as={Link} to="/apps/nginx" eventKey="nginx">Nginx</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/apps/wordpress" eventKey="wordpress">Wordpress</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  )
}

SideMenu.propTypes = {
  orgs: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentOrg: PropTypes.string.isRequired,
  setOrg: PropTypes.func.isRequired
}

export default SideMenu
