import React, { useReducer, useContext, useState } from 'react'
import { productsReducer } from './reducers/products'
import { cartReducer } from './reducers/cart'
import { tempProducts } from './tempData'

const StateContext = React.createContext()
const DispatchContext = React.createContext()

export const useStateContext = () => {
    return useContext(StateContext)
}
export const useDispatchContext = () => {
    return useContext(DispatchContext)
}

function GlobalStateProvider({ children }) {
    const [products, dispatchProduct] = useReducer(productsReducer, [])
    const [cart, dispatchCart] = useReducer(cartReducer, {})
    const [cartItemCount, setCartItemCount] = useState(0)
    const [cartSubtotal, setCartSubtotal] = useState(0)
    const [user, setUser] = useState({})
    const [orders, setOrders] = useState([])

    return (
        <StateContext.Provider value={{ products, cart, cartItemCount, cartSubtotal, user, orders }}>
            <DispatchContext.Provider value={{ dispatchProduct, dispatchCart, setCartItemCount, setCartSubtotal, setUser, setOrders }}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider >
    )
}

export default GlobalStateProvider