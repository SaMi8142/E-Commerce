import React, { useState } from 'react'
import { useDispatchContext } from '../../../GlobalStateProvider'

import { Form, Button, Container } from 'react-bootstrap'

function AddProduct() {
    const { dispatchProduct } = useDispatchContext()
    const [product, setProduct] = useState({ productName: '', image: '', price: '', qty: '' })


    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(product)
        dispatchProduct({ type: 'addProduct', payload: product })
        setProduct({ productName: '', image: '', price: '', qty: '' })

    }

    return (
        <Container>
            <div id="add-product">
                <Form onSubmit={handleSubmit}>
                    <Form.Group md="4" controlId="validationCustom01">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            required
                            value={product.productName}
                            onChange={(event) => setProduct({ ...product, productName: event.target.value })}
                            type="text"
                            placeholder="Product Name"
                        />
                    </Form.Group>
                    <Form.Group md="5" controlId="validationCustom02">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            required
                            value={product.price}
                            onChange={(event) => setProduct({ ...product, price: event.target.value })}
                            type="number"
                            min={1}
                            placeholder="$0.00"
                        />
                    </Form.Group>
                    <Form.Group md="3" controlId="validationCustom04">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control value={product.qty}
                            onChange={(event) => setProduct({ ...product, qty: event.target.value })} type="number" placeholder="0" min={1} required />
                    </Form.Group>
                    <Form.Group md="4" controlId="validationCustom01">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            required
                            value={product.image}
                            onChange={(event) => setProduct({ ...product, image: event.target.value })}
                            type="text"
                            placeholder="Image address"
                        />
                    </Form.Group>
                    <Button style={{ marginTop: '1rem' }} type="submit">Add Product</Button>
                </Form>
            </div>
        </Container>
    )
}

export default AddProduct