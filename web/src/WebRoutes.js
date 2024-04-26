import React from 'react'
import { Routes, Route,  useLocation, useNavigate  } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import UDashboard from './pages/user/UDashboard'
import ProfilePage from './pages/user/ProfilePage'
import ResetPasswordPage from './pages/user/ResetPasswordPage'
import ProgressPage from './pages/user/ProgressPage'
import ExplorerViewPage from './pages/user/ExplorerViewPage'

import DashboardPage from './pages/admin/DashboardPage'
import ExplorerPage from './pages/admin/ExplorerPage'


function WebRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/' exact element={<Login/>} />
            <Route path='/register' exact element={<Register/>} />
            <Route path='/user' exact element={<UDashboard/>} />
            <Route path='/user/profile' exact element={<ProfilePage/>} />
            <Route path='/user/resetpassword' exact element={<ResetPasswordPage/>} />
            <Route path='/user/progress' exact element={<ProgressPage/>} />
            <Route path='/user/explorer' exact element={<ExplorerViewPage/>} />

            <Route path='/admin' exact element={<DashboardPage/>} />
            <Route path='/admin/explorer' exact element={<ExplorerPage/>} />
            
        </Routes>
    </div>
  )
}

export default WebRoutes
