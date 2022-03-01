import React from 'react'
import Product from './Product/Product'
import { Container, Row, Col } from 'react-bootstrap'

import { useStatetContext } from '../../GlobalStateProvider'

function Shop() {
    const { products } = useStatetContext()
    return (
        <main id="shop">
            <Container>
                <h1 id="shop-header">SHOP</h1>
                <Row xs={2} sm={2} md={2} lg={4}>
                    {products.map(product => <Col key={product.productId}><Product product={product} /></Col>)}
                </Row>
            </Container>
        </main>
    )
}

export default Shop