import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


function NavBar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Call the logout endpoint using Axios
        axios.get('http://localhost:3001/api/v1/user/logout')
            .then(response => {
                if (response.status === 200) {
                    // Clear localStorage data upon successful logout
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('userType');
                    localStorage.removeItem('userName');
                    // Optionally, redirect to the login page or perform any other action
                    navigate("/");
                } else {
                    // Handle error if logout fails
                }
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };
  return (
    <div>
        <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
            <a className="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
            <i className="bx bx-menu bx-sm" />
            </a>
        </div>
        <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
            {/* Search */}
            <div className="navbar-nav align-items-center">
            </div>
            {/* /Search */}
            <ul className="navbar-nav flex-row align-items-center ms-auto">
            {/* Place this tag where you want the button to render. */}
            <li className="nav-item lh-1 me-3">
                <span />
            </li>
            {/* User */}
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
                <a className="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                <div className="avatar avatar-online">
                    <img src="../assets/img/avatars/1.png" alt className="w-px-40 h-auto rounded-circle" />
                </div>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                <li>
                    <a className="dropdown-item" onClick={handleLogout}>
                    <i className="bx bx-power-off me-2" />
                    <span className="align-middle">Log Out</span>
                    </a>
                </li>
                </ul>
            </li>
            {/*/ User */}
            </ul>
        </div>
        </nav>

    </div>
  )
}

export default NavBar