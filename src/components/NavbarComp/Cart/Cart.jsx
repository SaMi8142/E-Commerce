import React, { useState } from 'react';
import { Drawer, Button, message } from 'antd';
import { BsFillBagDashFill } from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
import { useStateContext, useDispatchContext } from "../../../GlobalStateProvider"
import ItemDrawer from './ItemDrawer'
import { createOrder } from '../../../actions/orders'
import { cartConstants } from '../../../reducers/constants'


function Cart() {
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()
    const { cart, cartItemCount, cartSubtotal, user } = useStateContext()
    const { dispatchCart, setCartItemCount, setCartSubtotal, setOrders } = useDispatchContext()

    const showDrawer = () => {
        setVisible(true)
    };

    const onClose = () => {
        setVisible(false)
    };

    const handleCheckOut = async (e) => {
        if (!user.name) {
            message.error('You need to be logged in!')
            return navigate('/login')
        }

        if (!cartItemCount) {
            message.error('Add a product!')

        }

        const cartItems = localStorage.getItem('cart')
        console.log(typeof cartItems)
        if (cartItems) {
            const orders = {
                orders: cartItems,
                quantity: cartItemCount,
                subTotal: cartSubtotal
            }
            createOrder(orders)
                .then(data => {
                    message.success('Order Created')
                    dispatchCart({ type: cartConstants.DROP_ITEMS, payload: {} })
                    setCartItemCount(0)
                    setCartSubtotal(0)
                    console.log('Orders', data)
                    navigate("/orders")
                }).catch(err => message.error(err.response.data.message))
        }


        setVisible(false)
    }

    return (
        <>
            <span id="item-counter">
                {cartItemCount}
            </span>
            <button id="bag-icon" onClick={showDrawer}><BsFillBagDashFill /></button>
            <Drawer className="shoppingCart" title="SHOPPING CART" placement="right" onClose={onClose} visible={visible}>
                {Object.keys(cart).map((key, idx) => (key === 'length' || key === 'subTotal') ? '' : <ItemDrawer key={key} cartItemInfo={cart[key]} />)}
                <div className="checkoutAside">
                    <div className="priceAside">
                        <span id="priceHeader">SUBTOTAL = ${(parseFloat(cartSubtotal).toFixed(2))}</span>
                    </div>
                    <Button onClick={handleCheckOut} id="checkoutBtn">CHECKOUT</Button>
                </div>
            </Drawer>
        </>
    )
}

export default Cart