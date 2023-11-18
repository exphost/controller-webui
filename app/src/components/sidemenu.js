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
  })

  const app = props.apps.map(app => {
    const isActive = app === props.currentApp
    if (isActive) {
      return <Dropdown.Item key={app} eventKey={app} active>{app}</Dropdown.Item>
    } else {
      return <Dropdown.Item key={app} eventKey={app}>{app}</Dropdown.Item>
    }
  })

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
          <Nav.Item>
          <Dropdown className="mx-2 my-2" onSelect={props.setApp}>
            <Dropdown.Toggle id="dropdown-autoclose-true">
              {props.currentApp}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {app}
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to="/apps/app" eventKey="apps">create app</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </Nav.Item>
          <hr/>
          <Nav.Item>
            <Nav.Link as={Link} to="/orgs" eventKey="orgs">Orgs</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/apps/emails" eventKey="emails">Emails</Nav.Link>
          </Nav.Item>
          <hr/>
          <Nav.Item>
            <Nav.Link as={Link} to="/apps/domain">Domain</Nav.Link>
          </Nav.Item>
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
  setOrg: PropTypes.func.isRequired,
  apps: PropTypes.arrayOf(PropTypes.string).isRequired,
  setApp: PropTypes.func.isRequired,
  currentApp: PropTypes.string.isRequired
}

export default SideMenu
