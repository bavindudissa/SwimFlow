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
        <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="javascript:void(0)">Home</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/user/explorer">Explorer</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/user/progress">Progress</a>
                    </li>
                </ul>
            </div>

            <ul className="navbar-nav flex-row align-items-center ms-auto">
            {/* Place this tag where you want the button to render. */}
            <li className="nav-item lh-1 me-3">
                <span />
            </li>
            {/* User */}
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
                <a className="nav-link dropdown-toggle hide-arrow show" href="javascript:void(0);" data-bs-toggle="dropdown" aria-expanded="true">
                <div className="avatar avatar-online">
                    <img src="../assets/img/avatars/1.png" alt className="w-px-40 h-auto rounded-circle" />
                </div>
                </a>
                <ul className="dropdown-menu dropdown-menu-end show" data-bs-popper="static">
                <li>
                    <a className="dropdown-item" href="#">
                    <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                        <div className="avatar avatar-online">
                            <img src="../assets/img/avatars/1.png" alt className="w-px-40 h-auto rounded-circle" />
                        </div>
                        </div>
                        <div className="flex-grow-1">
                        <span className="fw-medium d-block">John Doe</span>
                        </div>
                    </div>
                    </a>
                </li>
                <li>
                    <div className="dropdown-divider" />
                </li>
                <li>
                    <a className="dropdown-item" href="/user/profile">
                    <i className="bx bx-user me-2" />
                    <span className="align-middle">My Profile</span>
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                    <i className="bx bx-cog me-2" />
                    <span className="align-middle">Settings</span>
                    </a>
                </li>
                <li>
                    <div className="dropdown-divider" />
                </li>
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
