import React from 'react'
import { Outlet, Navigate } from "react-router-dom";

function RestrictAuthRoutes() {
    return (
        !localStorage.getItem("auth") ? <Outlet /> : <Navigate to='/shop' replace />
    )
}

export default RestrictAuthRoutes