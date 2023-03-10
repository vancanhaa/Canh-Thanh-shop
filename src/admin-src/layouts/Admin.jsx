import React from 'react'
import { Outlet, Route, Routes } from "react-router-dom"
import Header from '../components/header/Header'
import "./admin.scss"


function Admin() {
  return (
    <div className='admin'>
      <div className="admin-container">
        <Header />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Admin