import React, { useState, useEffect } from 'react'
import { Image, Badge, Button } from 'antd';
import { MinusOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatchContext, useStateContext } from '../../../GlobalStateProvider'
import { cartConstants } from '../../../reducers/constants'

function ItemDrawer({ cartItemInfo }) {
    const [count, setCount] = useState(cartItemInfo.count)

    const { dispatchCart, setCartItemCount, setCartSubtotal } = useDispatchContext()
    const { cart } = useStateContext()
    const { product } = cartItemInfo

    const addItem = (e) => {
        let localStorageCart = JSON.parse(localStorage.getItem('cart'))
        let productsObj = { ...localStorageCart }
        productsObj[product.productName] = { product: product, count: productsObj[product.productName].count + 1 }
        productsObj['length'] = parseInt(productsObj['length']) + 1
        productsObj['subTotal'] = parseFloat(productsObj['subTotal']) + parseFloat(product.price)
        localStorage.setItem('cart', JSON.stringify(productsObj))
        setCartItemCount(productsObj.length)
        setCartSubtotal(productsObj.subTotal)
        dispatchCart({ type: cartConstants.ADD_TO_CART, payload: productsObj })
    }

    const removeItem = (e) => {
        let localStorageCart = JSON.parse(localStorage.getItem('cart'))
        let productsObj = { ...localStorageCart }
        productsObj[product.productName] = { product: product, count: productsObj[product.productName].count - 1 }
        productsObj['length'] = parseInt(productsObj['length']) - 1
        productsObj['subTotal'] = parseFloat(productsObj['subTotal']) - parseFloat(product.price)
        localStorage.setItem('cart', JSON.stringify(productsObj))
        setCartItemCount(parseInt(productsObj.length))
        setCartSubtotal(parseFloat(productsObj.subTotal))
        dispatchCart({ type: cartConstants.DELETE_ITEM, payload: productsObj })

    }

    const dropItems = (e) => {
        let localStorageCart = JSON.parse(localStorage.getItem('cart'))
        let productsObj = { ...localStorageCart }
        delete productsObj[product.productName]
        productsObj['length'] = parseInt(productsObj['length']) - count
        productsObj['subTotal'] = parseFloat(productsObj['subTotal']) - (parseFloat(product.price) * count)
        localStorage.setItem('cart', JSON.stringify(productsObj))
        setCartItemCount(parseInt(productsObj.length))
        setCartSubtotal(parseFloat(productsObj.subTotal))
        dispatchCart({ type: cartConstants.DROP_ITEMS, payload: productsObj })
    }

    useEffect(() => {
        setCount(cartItemInfo.count)
    }, [cartItemInfo])


    return (
        <div className="item-drawer">
            <div className="drawer-col-1">
                <Badge count={count}>
                    <Image
                        width={70}
                        src={product.image}
                    />
                </Badge>
            </div>
            <div className="drawer-col-2">
                <h6 id="productName">{product.productName}</h6>
                <div>
                    <Button icon={<MinusOutlined />} className="buttonDrawer" onClick={removeItem} disabled={count > 1 ? false : true} />
                    <Button icon={<PlusOutlined />} className="buttonDrawer" onClick={addItem} />
                </div>

            </div>
            <div className="drawer-col-3">
                <Button icon={<CloseOutlined />} onClick={dropItems} className="deleteItems" />
                <h5>${parseFloat(product.price * count).toFixed(2)}</h5>
            </div>
        </div>
    )
}

export default ItemDrawer