import { Link } from 'react-router-dom'
import React from 'react'

const Console = () => {
  return (
    <React.Fragment>
    <h1>Consoleeeee</h1>
    <h2>Apps</h2>
    <ul>
    <li><Link to='/console/apps/nginx'>Nginx</Link></li>
    </ul>
    </React.Fragment>
  )
}

export default Console
