import React from 'react'
import NavBar from '../../components/user/NavBar'
import ResetPassword from '../../components/user/ResetPassword'

function ResetPasswordPage() {
  return (
    <div className="layout-wrapper layout-content-navbar layout-without-menu">
        <div className="layout-container">
            <div className="layout-page">
                <NavBar/>
                <ResetPassword/>
            </div>
        </div>
    </div>
  )
}

export default ResetPasswordPage