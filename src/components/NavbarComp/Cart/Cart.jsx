import React, { useState } from 'react';
import { Drawer } from 'antd';
import { BsFillBagDashFill } from "react-icons/bs"
import { useStatetContext } from "../../../GlobalStateProvider"
import ItemDrawer from './ItemDrawer'

function Cart() {
    const [visible, setVisible] = useState(false)
    const { cart } = useStatetContext()

    const showDrawer = () => {
        setVisible(true)
    };

    const onClose = () => {
        setVisible(false)
    };

    return (
        <>
            <span id="item-counter">
                {cart?.length ? cart.length : 0}
            </span>
            <button id="bag-icon" onClick={showDrawer}><BsFillBagDashFill /></button>
            <Drawer title="CART" placement="right" onClose={onClose} visible={visible}>
                {cart.map((item, idx) => <ItemDrawer key={idx} product={JSON.parse(item)} />)}
            </Drawer>
        </>
    )
}

export default Cart