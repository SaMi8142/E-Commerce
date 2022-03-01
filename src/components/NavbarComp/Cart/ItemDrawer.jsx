import React, { useState } from 'react'
import { Image, Badge, Button } from 'antd';
import { MinusOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';

function ItemDrawer({ product }) {
    const [count, setCount] = useState(1)

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
                <h6>{product.productName}</h6>
                <Button onClick={() => setCount(prevCount => prevCount - 1)}>
                    <MinusOutlined />
                </Button>
                <Button onClick={() => setCount(prevCount => prevCount + 1)}>
                    <PlusOutlined />
                </Button>
            </div>
            <div className="drawer-col-3">
                <CloseOutlined />
                <h5>${product.price}</h5>
            </div>

        </div>
    )
}

export default ItemDrawer