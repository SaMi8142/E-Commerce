import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container } from "react-bootstrap"
import { getOneProduct } from '../../../actions/products'
import { cartConstants } from '../../../reducers/constants'
import { Image } from 'antd'
import { useDispatchContext } from '../../../GlobalStateProvider'
import { Spin } from 'antd';


function IndividualProduct() {
    const { productName } = useParams()
    const [product, setProduct] = useState('')

    const { dispatchCart, setCartItemCount, setCartSubtotal } = useDispatchContext()

    useEffect(() => {
        const param = productName.split('-')
        getOneProduct(param[param.length - 1])
            .then((p) => setProduct(p))
            .catch(err => console.log(err))
    }, [])

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
        <Container>
            <div className="individual-container">

                {!product ? <Spin /> : (
                    <>
                        <div className="individual-image">
                            <Image className="image" src={product.image} width={250} alt="" />
                        </div>
                        <div className="individual-info">
                            <div className="individual-product" style={{ color: 'white' }}>{product.productName}</div>
                            <div>${product.price}</div>
                            <button onClick={addToCart} className="product-meta">Add to cart</button>
                        </div>
                    </>
                )}

            </div>
        </Container>
    )
}

export default IndividualProduct