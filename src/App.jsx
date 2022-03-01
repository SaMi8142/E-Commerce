import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "antd/dist/antd.css";

//ROUTING
import Index from './components/Routing/Index'
import ShopRouter from './components/Routing/ShopRouter'

//COMPONENTS
import NavbarComp from './components/NavbarComp/NavbarComp'
import Shop from './components/Shop/Shop'
import AddProduct from './components/Shop/Product/AddProduct'


import { useDispatchContext } from './GlobalStateProvider'
import { cartConstants } from './reducers/constants'

function App() {

    //FOR CART
    const { dispatchCart } = useDispatchContext()
    useEffect(() => {
        const localStorageCart = JSON.parse(localStorage.getItem('cart'))
        if (localStorageCart) dispatchCart({ type: cartConstants.ADD_TO_CART, payload: localStorageCart })
    }, [])


    return (
        <BrowserRouter>
            <NavbarComp />
            <Routes>
                <Route path="/" element={<Index />}>
                    <Route path="shop" element={<Shop />}>
                        {/* <Route path=":id" element={<Product />} /> */}
                    </Route>
                    <Route path="addproduct" element={<AddProduct />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App