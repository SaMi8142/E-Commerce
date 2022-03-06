import React from 'react'
import { Table, Tag, Image } from 'antd';
import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons';


const columns = [
    {
        title: 'Date Ordered',
        dataIndex: 'dateOrdered',
        key: 'dateOrdered',
        render: date => {
            const convertedDate = new Date(date).toDateString('en-GB', { timeZone: 'UTC' })
            const convertedTime = new Date(date).toTimeString().split(' ')[0]
            return <span>{convertedDate} {convertedTime}</span>
        }
    },
    Table.EXPAND_COLUMN,
    {
        title: 'Items',
        dataIndex: 'qnty',
        key: 'qnty'
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: price => <span>${price}</span>
    },
    {
        title: 'Expect Order By',
        dataIndex: 'eat',
        key: 'eat',
        render: date => {
            const convertedDate = new Date(date).toDateString('en-GB', { timeZone: 'UTC' })
            const convertedTime = new Date(date).toTimeString().split(' ')[0]
            return <span>{convertedDate} {convertedTime}</span>
        }
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: status => status ? <Tag className="fix-antDproblem" icon={<CheckCircleOutlined />} color="success" > Delivered</Tag> : <Tag className="fix-antDproblem" icon={<SyncOutlined spin />} color="processing">On Delivery</Tag>
    }
];



function OrdersTable({ orders, data }) {
    return (
        <Table
            columns={columns}
            expandable={{
                expandedRowRender: record => <ExpandedRowRender data={record.data} />,
            }}
            dataSource={data}
        />
    )
}

export function ExpandedRowRender({ data }) {
    const columns = [
        { title: 'Product Image', dataIndex: 'image', key: 'image', render: imageSrc => <Image width={50} src={imageSrc} />, },
        { title: 'Product Name', dataIndex: 'name', key: 'name' },
        { title: 'Unit Price', dataIndex: 'unitPrice', key: 'unitPrice', render: unitPrice => <p>${unitPrice.toFixed(2)}</p> },
        { title: 'Quantity', dataIndex: 'qnty', key: 'qnty' },
        { title: 'Subtotal', dataIndex: 'subTotal', key: 'subTotal', render: price => <p>${price.toFixed(2)}</p> },
    ];

    return <Table columns={columns} dataSource={data} />;
}



export default OrdersTable