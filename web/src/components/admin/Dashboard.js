import React from 'react'

function Dashboard() {
  return (
            <div className="content-wrapper">
            {/* Content */}
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                <div className="col-lg-8 mb-4 order-0">
                    <div className="card">
                    <div className="d-flex align-items-start row">
                        <div className="col-sm-7">
                        <div className="card-body">
                            <h5 className="card-title text-primary">Welcome back Admin</h5>
                        </div>
                        </div>
                        <div className="col-sm-5 text-center text-sm-left">
                        <div className="card-body pb-0 px-0 px-md-4">
                            <img src="../assets/img/illustrations/man-with-laptop-light.png" height={140} alt="View Badge User" data-app-dark-img="illustrations/man-with-laptop-dark.png" data-app-light-img="illustrations/man-with-laptop-light.png" />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                {/*/ Total Revenue */}
            </div>
            {/* / Content */}
            {/* Footer */}
            <footer className="content-footer footer bg-footer-theme">
                <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                <div className="mb-2 mb-md-0">
                    ©
                    2024
                    , made with ❤️ by
                    <a href="https://themeselection.com" target="_blank" className="footer-link fw-medium">ThemeSelection</a>
                </div>
                <div className="d-none d-lg-inline-block">
                    <a href="https://themeselection.com/license/" className="footer-link me-4" target="_blank">License</a>
                    <a href="https://themeselection.com/" target="_blank" className="footer-link me-4">More Themes</a>
                    <a href="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/documentation/" target="_blank" className="footer-link me-4">Documentation</a>
                    <a href="https://github.com/themeselection/sneat-html-admin-template-free/issues" target="_blank" className="footer-link">Support</a>
                </div>
                </div>
            </footer>
            {/* / Footer */}
            <div className="content-backdrop fade" />
            </div>

  )
}

export default Dashboard