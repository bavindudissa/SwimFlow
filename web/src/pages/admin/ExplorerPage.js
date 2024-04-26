import React from 'react'
import Explorer from '../../components/admin/Explorer'
import NavBar from '../../components/admin/NavBar'
import SideBar from '../../components/admin/SideBar'

function ExplorerPage() {
  return (
    <div className='layout-wrapper layout-content-navbar'>
    <div className="layout-container">
        <SideBar/>
        <div className='layout-page'>
            <NavBar/>
            <Explorer/>
        </div>
    </div>
</div>
  )
}

export default ExplorerPage