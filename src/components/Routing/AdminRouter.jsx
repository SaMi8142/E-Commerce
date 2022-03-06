import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function AdminRouter() {
    const isAdmin = localStorage.getItem("auth") && JSON.parse(localStorage.getItem("auth")).user.email === 'iamanadmin@gmail.com'
    console.log(isAdmin)
    return (
        isAdmin ? <Outlet /> : <Navigate to='/shop' replace />
    )
}

export default AdminRouter