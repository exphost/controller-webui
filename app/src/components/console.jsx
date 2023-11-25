import React, { useEffect } from 'react'

const Console = () => {
  useEffect(() => {
    document.title = 'Exphost'
  }, [])

  return (
    <React.Fragment>
    <h1>Consoleeeee</h1>
    </React.Fragment>
  )
}

export default Console
