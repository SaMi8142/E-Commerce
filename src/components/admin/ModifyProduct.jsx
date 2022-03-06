import React, { useState, useEffect } from 'react'
import ProductForm from './ProductForm'
import ProductsTable from './ProductsTable'
import { Container } from 'react-bootstrap'
import { Row, Col } from 'antd'

import { useDispatchContext, useStateContext } from '../../GlobalStateProvider'

function AddProduct() {
    const { products } = useStateContext()
    const { dispatchProduct } = useDispatchContext()
    const [data, setData] = useState([])
    const [editCand, setEditCand] = useState('')


    useEffect(() => {
        for (let product of products) {
            const { id, productName, image, created_at, price } = product

            const item = {
                key: id,
                name: productName,
                price: price,
                image: image,
                date: created_at
            }

            setData(prevData => [...prevData, item])
        }

        return () => {
            setData([])
        }
    }, [products])


    return (
        <Container>
            <Row style={{ marginTop: '6rem' }} className="modifyProduct">
                <Col xs={24} sm={24} md={24} lg={7} xl={7} id="product-form">
                    <ProductForm setEditCand={setEditCand} editCand={editCand} dispatchProduct={dispatchProduct} />
                </Col>

                <Col xs={24} sm={24} md={24} lg={17} xl={17}>
                    <ProductsTable setEditCand={setEditCand} editCand={editCand} dispatchProduct={dispatchProduct} data={data} />
                </Col>
            </Row>
        </Container>
    )
}

export default AddProduct