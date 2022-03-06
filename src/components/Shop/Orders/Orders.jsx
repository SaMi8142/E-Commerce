import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useStateContext } from '../../../GlobalStateProvider'
import { getAllMyOrders } from '../../../actions/orders'
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import OrdersTable, { expandedRowRender } from './OrdersTable'
import './orders.css'

import { Tabs } from 'antd';

const { TabPane } = Tabs;


function Orders() {
    const [orders, setOrders] = useState([])
    const [data, setData] = useState([]);



    useEffect(() => {
        const authInfo = JSON.parse(localStorage.getItem('auth'))
        if (authInfo) {
            getAllMyOrders(authInfo.user.id)
                .then(data => {
                    setOrders(data)
                    console.log('data', data)
                })
                .catch(err => console.log(err.response.data.message));
        }
    }, [])

    function setArrivalTime(orderedTime, minutes) {
        const newDate = new Date(orderedTime)
        newDate.setMinutes(newDate.getMinutes() + minutes)
        return newDate
    }

    useEffect(() => {
        for (let order of orders) {
            const { id, created_at, quantity, subTotal, orders: subOrders } = order
            const dateOrdered = new Date(created_at)
            const expectedArrival = setArrivalTime(created_at, 5)
            const isDelivered = Date.now() > expectedArrival

            const parsedSubOrders = JSON.parse(subOrders)
            const expandedRowData = []
            for (let key in parsedSubOrders) {
                if (key === 'length' || key === 'subTotal') continue
                const { product, count } = parsedSubOrders[key]
                const tempProduct = {
                    key: product.id,
                    image: product.image,
                    name: product.productName,
                    unitPrice: parseFloat(product.price),
                    qnty: count,
                    subTotal: (count * parseFloat(product.price))
                }
                expandedRowData.push(tempProduct)
            }
            console.log(expandedRowData, 'eyy')

            const tempOrder = {
                key: id,
                dateOrdered: dateOrdered,
                eat: expectedArrival,
                qnty: quantity,
                price: subTotal,
                status: isDelivered,
                data: expandedRowData
            }

            setData(prevData => [...prevData, tempOrder]);
        }

        return () => {
            setData([])
        }
    }, [orders])


    return (
        <Container style={{ marginTop: '6rem' }}>
            <div className="orders-container" style={{ marginTop: '3rem' }}>
                <OrdersTable data={data} orders={orders} />
            </div>
        </Container>
    )
}

export default Orders