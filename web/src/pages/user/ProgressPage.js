import React from 'react'
import NavBar from '../../components/user/NavBar'
import Progress from '../../components/user/Progress'

function ProgressPage() {
  return (
    <div className="layout-wrapper layout-content-navbar layout-without-menu">
    <div className="layout-container">
        <div className="layout-page">
            <NavBar/>
            <Progress/>
        </div>
    </div>
</div>
  )
}

export default ProgressPage