import React from 'react'

function SideBar() {
  return (
    <div>
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme" data-bg-class="bg-menu-theme" style={{ height: "100vh" }}>
        <div className="app-brand demo">
            <a href="#" className="app-brand-link">
            <span className="app-brand-text demo menu-text fw-bold ms-2">Swim Flow</span>
            </a>
            <a href="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto d-xl-none d-block">
            <i className="bx bx-chevron-left bx-sm align-middle" />
            </a>
        </div>
        <div className="menu-inner-shadow" />
        <ul className="menu-inner py-1 ps ps--active-y">
            {/* Dashboards */}
            <li className="menu-item open">
            <a href="/admin" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-home-circle" />
                <div data-i18n="Dashboards">Dashboards</div>
            </a>
            <ul className="menu-sub">
                <li className="menu-item">
                <a href="/admin/explorer" className="menu-link">
                    <div data-i18n="Explorer">Explorer Managment</div>
                </a>
                </li>
            </ul>
            </li>
            {/* <div className="ps__rail-x" style={{left: 0, bottom: 0}}><div className="ps__thumb-x" tabIndex={0} style={{left: 0, width: 0}} /></div><div className="ps__rail-y" style={{top: 0, height: 671, right: 4}}><div className="ps__thumb-y" tabIndex={0} style={{top: 0, height: 320}} /></div> */}
            </ul>
        </aside>

    </div>
  )
}

export default SideBar