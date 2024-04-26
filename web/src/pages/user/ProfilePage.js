import React from 'react'
import NavBar from '../../components/user/NavBar'
import Profile from '../../components/user/Profile'

function ProfilePage() {
  return (
    <div className="layout-wrapper layout-content-navbar layout-without-menu">
        <div className="layout-container">
            <div className="layout-page">
                <NavBar/>
                <Profile/>
            </div>
        </div>
    </div>
  )
}

export default ProfilePage
