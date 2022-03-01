import React, { useEffect } from 'react'
import { useDispatchContext } from '../../../GlobalStateProvider'
import { cartConstants } from '../../../reducers/constants'

function Product({ product }) {
    const { dispatchCart } = useDispatchContext()

    function addToCart(e) {
        let localStorageCart = JSON.parse(localStorage.getItem('cart'))
        let productsArr;
        if (localStorageCart) {
            productsArr = JSON.stringify([...localStorageCart, JSON.stringify(product)])
            localStorage.setItem('cart', productsArr)
        } else {
            productsArr = JSON.stringify([JSON.stringify(product)])
            localStorage.setItem('cart', productsArr)
        }
        localStorageCart = JSON.parse(localStorage.getItem('cart'))
        console.log(localStorageCart)
        dispatchCart({ type: cartConstants.ADD_TO_CART, payload: localStorageCart })
    }


    return (
        <div className="product-container">
            <div className="image-container"><img className="image" src={product.image} alt="" /></div>
            <h6 className="product-meta">{product.productName}</h6>
            <h5 className="product-meta">${product.price.toString()}</h5>
            <button onClick={addToCart} className="product-meta">Add to cart</button>
        </div>
    )
}

export default Product