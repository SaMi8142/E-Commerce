import React, { useEffect } from 'react'
import { useDispatchContext } from '../../../GlobalStateProvider'
import { cartConstants } from '../../../reducers/constants'
import { Link } from 'react-router-dom'

function Product({ product }) {
    const { dispatchCart, setCartItemCount, setCartSubtotal } = useDispatchContext()


    function addToCart(e) {
        let localStorageCart = JSON.parse(localStorage.getItem('cart'))
        let productsObj = { ...localStorageCart }
        if (localStorageCart && localStorageCart[product.productName]) {
            productsObj[product.productName] = { product: product, count: productsObj[product.productName].count + 1 }
        } else {
            productsObj[product.productName] = { product: product, count: 1 }
        }
        productsObj['length'] = (parseInt(productsObj['length']) || 0) + 1
        productsObj['subTotal'] = (parseFloat(productsObj['subTotal']) || 0) + parseFloat(product.price)
        localStorage.setItem('cart', JSON.stringify(productsObj))

        setCartItemCount(productsObj.length)
        setCartSubtotal(parseFloat(productsObj.subTotal))
        console.log(productsObj)

        dispatchCart({ type: cartConstants.ADD_TO_CART, payload: productsObj })
    }

    return (
        <div className="product-container">
            <Link to={`/shop/${product.productName.replace(/\s/g, '-')}-${product.id}`} className="image-container"><img className="image" src={product.image} alt="" /></Link>
            <h6 className="product-meta">{product.productName}</h6>
            <h5 className="product-meta">${parseFloat(product.price).toFixed(2)}</h5>
            <button onClick={addToCart} className="product-meta">Add to cart</button>
        </div>
    )
}

export default Product