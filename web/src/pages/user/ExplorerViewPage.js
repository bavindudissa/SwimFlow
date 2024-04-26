import React from 'react'
import NavBar from '../../components/user/NavBar'
import ExplorerView from '../../components/user/ExplorerView'

function ExplorerViewPage() {
  return (
    <div className="layout-wrapper layout-content-navbar layout-without-menu">
    <div className="layout-container">
        <div className="layout-page">
            <NavBar/>
            <ExplorerView/>
        </div>
    </div>
</div>
  )
}

export default ExplorerViewPage