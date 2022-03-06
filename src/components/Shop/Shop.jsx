import React from 'react'
import Product from './Product/Product'
import { Container, Row, Col } from 'react-bootstrap'

import { useStateContext } from '../../GlobalStateProvider'

import Signup from '../Auth/Signup'

function Shop() {
    const { products } = useStateContext()
    return (
        <main id="shop">
            <Container>
                <h1 className="shop-header">SHOP</h1>
                <Row xs={2} sm={2} md={2} lg={4}>
                    {products.map(product => <Col key={product.id}><Product product={product} /></Col>)}
                </Row>
            </Container>
        </main >
    )
}

export default Shop