import React from 'react'
import Dashboard from '../../components/admin/Dashboard'
import NavBar from '../../components/admin/NavBar'
import SideBar from '../../components/admin/SideBar'

function DashboardPage() {
  return (
    <div className='layout-wrapper layout-content-navbar'>
        <div className="layout-container">
            <SideBar/>
            <div className='layout-page'>
                <NavBar/>
                <Dashboard/>
            </div>
        </div>
    </div>
  )
}

export default DashboardPage