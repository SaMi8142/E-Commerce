import React, { useEffect } from 'react'
import axios from 'axios'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import "antd/dist/antd.css";

//ROUTING
import Index from './components/Routing/Index'
import RestrictAuthRoutes from './components/Routing/RestrictAuthRoutes'
import AdminRouter from './components/Routing/AdminRouter'
import OrderRouter from './components/Routing/OrderRouter'

//COMPONENTS
import NavbarComp from './components/NavbarComp/NavbarComp'
import Shop from './components/Shop/Shop'
import ModifyProduct from './components/admin/ModifyProduct'
import IndividualProduct from './components/Shop/Product/IndividualProduct'
import Orders from './components/Shop/Orders/Orders'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import HomePage from './components/Home/HomePage'

import { fetchAllProducts } from './actions/products'
import { getAllMyOrders } from './actions/orders'

import { useDispatchContext } from './GlobalStateProvider'
import { cartConstants } from './reducers/constants'

function App() {
    const { dispatchProduct, dispatchCart, setCartItemCount, setCartSubtotal, setUser, setOrders } = useDispatchContext()


    //RETRIEVE USER FROM LOCAL STORAGE
    useEffect(() => {
        const authInfo = JSON.parse(localStorage.getItem('auth'))
        console.log(authInfo?.user)
        if (authInfo) setUser(authInfo.user)
    }, [])

    //FETCH ALL PRODUCTS
    useEffect(() => {
        fetchAllProducts()
            .then(dispatchArg => dispatchProduct(dispatchArg))
            .catch(err => console.log(err))
    }, [])


    //RETRIEVE CART INFO FROM LOCAL STORAGE -> STATE
    useEffect(() => {
        const localStorageCart = JSON.parse(localStorage.getItem('cart'))
        if (localStorageCart) {
            console.log(localStorageCart)
            setCartItemCount(parseInt(localStorageCart.length))
            setCartSubtotal(parseFloat(localStorageCart.subTotal))
            dispatchCart({ type: cartConstants.ADD_TO_CART, payload: localStorageCart })
        }
    }, [])

    // useEffect(() => {
    //     const authInfo = JSON.parse(localStorage.getItem('auth'))
    //     if (authInfo) {
    //         getAllMyOrders(authInfo.user.id)
    //             .then(data => {
    //                 setOrders(data)
    //                 console.log('data', data)
    //             })
    //             .catch(err => console.log(err.response.data.message));
    //     }
    // }, [])

    return (
        <Router>
            <NavbarComp />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/" element={<Index />}>
                    <Route path="shop" element={<Shop />} />
                    <Route path="shop/:productName" element={<IndividualProduct />} />
                </Route>
                <Route path="/orders" element={<OrderRouter />}>
                    <Route index element={<Orders />} />
                </Route>
                <Route path="/admin" element={<AdminRouter />}>
                    <Route path="products" element={<ModifyProduct />} />
                </Route>
                <Route path="/" element={<RestrictAuthRoutes />}>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </Router >
    )
}

export default App