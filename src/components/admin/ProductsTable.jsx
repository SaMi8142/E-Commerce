import React from 'react'
import { Table, Space, Image, Button, message, Popconfirm } from 'antd'

import { deleteProduct } from "../../actions/products"

function ProductsTable({ data, dispatchProduct, setEditCand }) {


    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: imageSrc => <Image width={50} src={imageSrc} />,
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: price => <a>${parseFloat(price).toFixed(2)}</a>,
        },
        {
            title: 'Date Posted',
            dataIndex: 'date',
            key: 'date',
            render: date => {
                const convertedDate = new Date(date).toDateString('en-GB', { timeZone: 'UTC' })
                return <a>{convertedDate}</a>
            },
        },
        {
            title: 'Modify',
            key: 'modify',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={(e) => setEditCand(text)} size='small'>Edit</Button>

                    <Popconfirm
                        title="Are you sure to delete this product?"
                        onConfirm={(e) => handleDelete(text.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="dashed" size='small' danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    function handleDelete(key) {
        deleteProduct(key)
            .then(readyToDispatch => {
                dispatchProduct(readyToDispatch)
                message.success({
                    content: 'Product successfully deleted.',
                    style: {
                        padding: '0 !important'
                    },
                });
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Table style={{ width: "90%", margin: '2rem auto' }} columns={columns} dataSource={data} />
        </>
    )
}

export default ProductsTable