import React, { useState, useEffect } from 'react'
import { Badge, Card, Form, Input, InputNumber, message } from 'antd'
import { Button } from 'react-bootstrap'
import { postProduct, editProduct } from "../../actions/products"
import { FileImageOutlined, TagOutlined } from '@ant-design/icons';


function ProductForm({ dispatchProduct, setEditCand, editCand }) {
    const [productName, setProductName] = useState("")
    const [image, setImage] = useState("")
    const [price, setPrice] = useState("")

    function handeleProductSubmit(e) {
        e.preventDefault()

        const product = {
            productName: productName,
            image: image,
            price: price,
        }

        if (!editCand) {
            postProduct(product)
                .then(returnedVal => {
                    dispatchProduct(returnedVal)
                    message.success('Product added successfully');
                })
                .catch(err => {
                    message.error(err.response.data.message)
                })
        } else {
            editProduct(product, editCand.key)
                .then(returnedVal => {
                    dispatchProduct(returnedVal)
                    message.success('Product edited')
                })
                .catch(err => {
                    message.error(err.response.data.message)
                })
            setEditCand('')
        }

        setProductName("")
        setImage("")
        setPrice("")

    }

    useEffect(() => {
        setProductName(editCand.name)
        setImage(editCand.image)
        setPrice(editCand.price)
    }, [editCand])

    return (
        <>
            <div style={{ width: "90%", margin: '2rem auto' }}>
                <Badge.Ribbon text={!editCand ? 'Add' : 'Edit'}>
                    <Card title={!editCand ? 'Add Product' : 'Edit Product'} size="small">
                        <form layout='vertical' onSubmit={handeleProductSubmit}>
                            <Form.Item>
                                <Input prefix={<TagOutlined />} value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Product name" />
                            </Form.Item>
                            <Form.Item>
                                <Input prefix={<FileImageOutlined />} value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image address" />
                            </Form.Item>
                            <Form.Item>
                                <InputNumber value={price} onChange={(val) => setPrice(val)} addonBefore="$" placeholder="0.00" style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item>
                                <Button style={{ width: "100%", fontSize: "small" }} type="submit">{!editCand ? 'Add' : 'Edit'}</Button>
                            </Form.Item>
                        </form>
                    </Card>
                </Badge.Ribbon>
            </div>
        </>
    )
}

export default ProductForm