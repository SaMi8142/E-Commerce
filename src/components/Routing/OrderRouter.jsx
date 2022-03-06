import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function OrderRouter() {
    return (
        localStorage.getItem("auth") ? <Outlet /> : <Navigate to="/login" replace />
    )
}

export default OrderRouter