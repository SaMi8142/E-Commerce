import React, { useReducer, useContext, useState } from 'react'
import { productsReducer } from './reducers/products'
import { cartReducer } from './reducers/cart'
import { tempProducts } from './tempData'

const StateContext = React.createContext()
const DispatchContext = React.createContext()

export const useStatetContext = () => {
    return useContext(StateContext)
}
export const useDispatchContext = () => {
    return useContext(DispatchContext)
}

function GlobalStateProvider({ children }) {
    const [products, dispatchProduct] = useReducer(productsReducer, tempProducts)
    const [cart, dispatchCart] = useReducer(cartReducer, [])

    return (
        <StateContext.Provider value={{ products, cart }}>
            <DispatchContext.Provider value={{ dispatchProduct, dispatchCart }}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider >
    )
}

export default GlobalStateProvider